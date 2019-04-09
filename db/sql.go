package main

import (
	"database/sql"
	"time"

	uuid "github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
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
	var (
		results [][]string
		//id         uuid.UUID
		//cardid     string
		//chargeTime time.Time
		//vendor     string
		//value      float64
		//category   string
	)
	rows, err := db.Query("SELECT * FROM transactions")
	if err != nil {
		return nil, err
	}

	rawResult := make([]string, 6)

	for rows.Next() {
		err = rows.Scan(rawResult)
		if err != nil {
			return nil, err
		}
		results = append(results, rawResult)
	}
	return results, nil
}

// GetAllDanglingTransactions gets all uncategorized transactions
func GetAllDanglingTransactions() ([][]string, error) {
	return nil, nil
}

// GetAllCategoryTransactions gets all categorized transactions
func GetAllCategoryTransactions(category string) ([][]string, error) {
	return nil, nil
}

// GetAllTransactionsBetween gets all transactions that occur between startTime and endTime
func GetAllTransactionsBetween(startTime time.Time, endTime time.Time) ([][]string, error) {
	return nil, nil
}

// AddTransaction inserts a new transaction into the table
func AddTransaction(id uuid.UUID, cardid string, chargeTime time.Time, vendor string, value float64, category string) error {
	return nil
}

// ModifyTransaction modifies an existing transaction in the table by uuid
func ModifyTransaction(id uuid.UUID, cardid string, chargeTime time.Time, vendor string, value float64, category string) error {
	return nil
}

// GetAllBudgetCategories spits out the entire budget table
func GetAllBudgetCategories() ([][]string, error) {
	return nil, nil
}

// AddBudgetCategory adds a new category into the budget table
func AddBudgetCategory(category string, limit float64, timeframe string) error {
	return nil
}

// ModifyBudgetCategory modifies an existing budget category in the budget table by category
func ModifyBudgetCategory(category string, limit float64, timeframe string) error {
	return nil
}
