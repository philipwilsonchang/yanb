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

// Transaction ...
type Transaction struct {
	ID           uuid.UUID `json:"id"`
	CardID       string    `json:"cardID"`
	ChargeTime   time.Time `json:"chargeTime"`
	Vendor       string    `json:"vendor"`
	Value        float32   `json:"value"`
	CategoryName string    `json:"categoryName"`
}

// BudgetCategory ...
type BudgetCategory struct {
	Name      string  `json:"name"`
	Limit     float32 `json:"limit"`
	Timeframe string  `json:"timeFrame"`
}

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
func GetAllTransactions() ([]Transaction, error) {
	var results []Transaction

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		r := Transaction{}
		err = rows.Scan(
			&r.ID,
			&r.CardID,
			&r.ChargeTime,
			&r.Vendor,
			&r.Value,
			&r.CategoryName,
		)
		if err != nil {
			return nil, err
		}
		results = append(results, r)
	}

	return results, nil
}

// GetAllDanglingTransactions gets all uncategorized transactions
func GetAllDanglingTransactions() ([]Transaction, error) {
	var results []Transaction

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions WHERE category = 'uncategorized'")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		r := Transaction{}
		err = rows.Scan(
			&r.ID,
			&r.CardID,
			&r.ChargeTime,
			&r.Vendor,
			&r.Value,
			&r.CategoryName,
		)
		if err != nil {
			return nil, err
		}
		results = append(results, r)
	}

	return results, nil
}

// GetAllCategoryTransactions gets all categorized transactions
func GetAllCategoryTransactions(category string) ([]Transaction, error) {
	var results []Transaction

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions WHERE category = ?", category)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		r := Transaction{}
		err = rows.Scan(
			&r.ID,
			&r.CardID,
			&r.ChargeTime,
			&r.Vendor,
			&r.Value,
			&r.CategoryName,
		)
		if err != nil {
			return nil, err
		}
		results = append(results, r)
	}

	return results, nil
}

// GetAllTransactionsBetween gets all transactions that occur between startTime and endTime
func GetAllTransactionsBetween(startTime time.Time, endTime time.Time) ([]Transaction, error) {
	var results []Transaction

	rows, err := db.Query("SELECT id, cardid, chargetime, vendor, value, category FROM transactions WHERE chargetime > ? AND chargetime <= ?", startTime, endTime)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		r := Transaction{}
		err = rows.Scan(
			&r.ID,
			&r.CardID,
			&r.ChargeTime,
			&r.Vendor,
			&r.Value,
			&r.CategoryName,
		)
		if err != nil {
			return nil, err
		}
		results = append(results, r)
	}

	return results, nil
}

// AddTransaction inserts a new transaction into the table
func AddTransaction(t *Transaction) error {
	statement, err := db.Prepare("INSERT INTO transactions (id, cardid, chargetime, vendor, value, category) VALUES (?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}

	_, err = statement.Exec(t.ID, t.CardID, t.ChargeTime, t.Vendor, t.Value, t.CategoryName)
	if err != nil {
		return err
	}
	return nil
}

// ModifyTransaction modifies an existing transaction in the table by uuid
func ModifyTransaction(t *Transaction) error {
	statement, err := db.Prepare("UPDATE transactions SET cardid = ?, chargetime = ?, vendor = ?, value = ?, category = ? WHERE id = ?")
	if err != nil {
		return err
	}

	_, err = statement.Exec(t.CardID, t.ChargeTime, t.Vendor, t.Value, t.CategoryName, t.ID)
	if err != nil {
		return err
	}
	return nil
}

// AddVendorCategory adds a vendor/category pairing to the table
func AddVendorCategory(vendor string, category string) error {
	statement, err := db.Prepare("INSERT INTO vendortocategories(vendor, category) VALUES (?, ?)")
	if err != nil {
		return err
	}

	_, err = statement.Exec(vendor, category)
	if err != nil {
		return err
	}
	return nil
}

// CheckVendorCategory sees if a vendor has been categorized before in the table
func CheckVendorCategory(vendor string) (string, error) {
	var category string

	row := db.QueryRow("SELECT category FROM vendortocategories WHERE vendor = ?", vendor)
	err := row.Scan(&category)
	if err != nil {
		return "", err
	}

	return category, nil
}

// GetAllBudgetCategories spits out the entire budget table
func GetAllBudgetCategories() ([]BudgetCategory, error) {
	var results []BudgetCategory

	rows, err := db.Query("SELECT category, budgetlimit, timeframe FROM budgets")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		b := BudgetCategory{}
		err = rows.Scan(
			&b.Name,
			&b.Limit,
			&b.Timeframe)
		if err != nil {
			return nil, err
		}
		results = append(results, b)
	}

	return results, nil
}

// AddBudgetCategory adds a new category into the budget table
func AddBudgetCategory(b *BudgetCategory) error {
	statement, err := db.Prepare("INSERT INTO budgets (category, budgetlimit, timeframe) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}

	_, err = statement.Exec(b.Name, b.Limit, b.Timeframe)
	if err != nil {
		return err
	}
	return nil
}

// ModifyBudgetCategory modifies an existing budget category in the budget table by category
func ModifyBudgetCategory(b *BudgetCategory) error {
	statement, err := db.Prepare("UPDATE budgets SET budgetlimit = ?, timeframe = ? WHERE category = ?")
	if err != nil {
		return err
	}

	_, err = statement.Exec(b.Limit, b.Timeframe, b.Name)
	if err != nil {
		return err
	}
	return nil
}
