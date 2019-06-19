package dbfuncs

import (
	"fmt"
	uuid "github.com/google/uuid"
	"time"
)

// DBtest tests dbfuncs
func DBtest(write bool) {
	// Setup db
	fmt.Println("Opening db file...")
	Start("testdb/test.db")

	if write {
		fmt.Println("Adding transactions...")
		err := AddTransaction(&Transaction{uuid.New(), "chase", time.Now(), "google", 16.05, "grocery"})
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}

		err = AddTransaction(&Transaction{uuid.New(), "discover", time.Now(), "wholefoods", 17.99, "food"})
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}

		err = AddTransaction(&Transaction{uuid.New(), "chase", time.Now(), "toysrus", 1.05, "uncategorized"})
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}

		err = AddTransaction(&Transaction{uuid.New(), "discover", time.Now(), "lego", 7.99, "food"})
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}

		err = AddTransaction(&Transaction{uuid.New(), "chase", time.Now(), "jennis", 6.08, "toys"})
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}

		err = AddTransaction(&Transaction{uuid.New(), "discover", time.Now(), "harristeeter", 13.49, "taxes"})
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}
	}

	fmt.Println("Dumping transactions...")
	results, err := GetAllTransactions()
	if err != nil {
		fmt.Printf("Error: %+v\n", err)
	} else {
		fmt.Printf("Dump: %+v\n", results)
	}

	fmt.Println("Dumping dangling transactions...")
	results, err = GetAllDanglingTransactions()
	if err != nil {
		fmt.Printf("Error: %+v\n", err)
	} else {
		fmt.Printf("Dump: %+v\n", results)
	}

	fmt.Println("Dumping food transactions...")
	results, err = GetAllCategoryTransactions("food")
	if err != nil {
		fmt.Printf("Error: %+v\n", err)
	} else {
		fmt.Printf("Dump: %+v\n", results)
	}

	fmt.Println("Dumping all transactions made today...")
	results, err = GetAllTransactionsBetween(time.Now().Add(-24*time.Hour), time.Now())
	if err != nil {
		fmt.Printf("Error: %+v\n", err)
	} else {
		fmt.Printf("Dump: %+v\n", results)
	}
}
