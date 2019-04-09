package dbfuncs

import (
	"database/sql"
	"time"

	uuid "github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3" // driver
)

var (
	db *sql.DB
)

// Start initializes the connection to the db file and stores it in the global db variable
func Start(filepath string) error {
	var err error
	db, err = sql.Open("sqlite3", filepath)
	if err != nil {
		return err
	}
	return nil
}

// GetAllTransactions returns the entire table
func GetAllTransactions() ([][]string, error) {
	var results [][]string

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resultPtrs := make([]interface{}, 6)
		result := make([]string, 6)
		for i := range result {
			resultPtrs[i] = &result[i]
		}
		err = rows.Scan(resultPtrs...)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	return results, nil
}

// GetAllDanglingTransactions gets all uncategorized transactions
func GetAllDanglingTransactions() ([][]string, error) {
	var results [][]string

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions WHERE category = 'uncategorized'")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resultPtrs := make([]interface{}, 6)
		result := make([]string, 6)
		for i := range result {
			resultPtrs[i] = &result[i]
		}
		err = rows.Scan(resultPtrs...)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	return results, nil
}

// GetAllCategoryTransactions gets all categorized transactions
func GetAllCategoryTransactions(category string) ([][]string, error) {
	var results [][]string

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions WHERE category = ?", category)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resultPtrs := make([]interface{}, 6)
		result := make([]string, 6)
		for i := range result {
			resultPtrs[i] = &result[i]
		}
		err = rows.Scan(resultPtrs...)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	return results, nil
}

// GetAllTransactionsBetween gets all transactions that occur between startTime and endTime
func GetAllTransactionsBetween(startTime time.Time, endTime time.Time) ([][]string, error) {
	var results [][]string

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions WHERE chargetime > ? AND chargetime <= ?", startTime, endTime)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resultPtrs := make([]interface{}, 6)
		result := make([]string, 6)
		for i := range result {
			resultPtrs[i] = &result[i]
		}
		err = rows.Scan(resultPtrs...)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	return results, nil
}

// AddTransaction inserts a new transaction into the table
func AddTransaction(id uuid.UUID, cardid string, chargeTime time.Time, vendor string, value float64, category string) error {
	statement, err := db.Prepare("INSERT INTO transactions (id, cardid, chargetime, vendor, value, category) VALUES (?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}

	_, err = statement.Exec(id, cardid, chargeTime, vendor, value, category)
	if err != nil {
		return err
	}
	return nil
}

// ModifyTransaction modifies an existing transaction in the table by uuid
func ModifyTransaction(id uuid.UUID, cardid string, chargeTime time.Time, vendor string, value float64, category string) error {
	statement, err := db.Prepare("UPDATE transactions SET cardid = ?, chargetime = ?, vendor = ?, value = ?, category = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = statement.Exec(cardid, chargeTime, vendor, value, category, id)
	if err != nil {
		return err
	}
	return nil
}

// GetAllBudgetCategories spits out the entire budget table
func GetAllBudgetCategories() ([][]string, error) {
	var results [][]string

	rows, err := db.Query("SELECT category, budgetlimit, timeframe FROM budgets")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resultPtrs := make([]interface{}, 3)
		result := make([]string, 3)
		for i := range result {
			resultPtrs[i] = &result[i]
		}
		err = rows.Scan(resultPtrs...)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	return results, nil
}

// AddBudgetCategory adds a new category into the budget table
func AddBudgetCategory(category string, limit float64, timeframe string) error {
	statement, err := db.Prepare("INSERT INTO budgets (category, budgetlimit, timeframe) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}

	_, err = statement.Exec(category, limit, timeframe)
	if err != nil {
		return err
	}
	return nil
}

// ModifyBudgetCategory modifies an existing budget category in the budget table by category
func ModifyBudgetCategory(category string, limit float64, timeframe string) error {
	statement, err := db.Prepare("UPDATE budgets SET budgetlimit = ?, timeframe = ? WHERE category = ?")
	if err != nil {
		return err
	}

	_, err = statement.Exec(limit, timeframe, category)
	if err != nil {
		return err
	}
	return nil
}
