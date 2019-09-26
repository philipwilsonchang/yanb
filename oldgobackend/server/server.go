package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/philipwilsonchang/budgetapp/db"
	"github.com/philipwilsonchang/budgetapp/gmail"
	"net/http"
	"time"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world. %s", r.URL.Path[1:])
}

func main() {
	// Start gmail service
	go run gmail.startService()
	
	// dbfuncs.Start("testdb/test.db")
	// // dbfuncs.DBtest(true)
	// router := gin.Default()
	// router.GET("/ping", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message": "pong",
	// 	})
	// })
	// transactions := router.Group("/transactions")
	// {
	// 	transactions.GET("/", getAllTransactionsHandler)
	// 	transactions.GET("/uncategorized", getAllUncategorizedTransactionsHandler)
	// 	transactions.GET("/category/:category", getAllTransactionsInCategoryHandler)
	// 	transactions.GET("/timestamp/:starttime/:endtime", getAllTransactionsAfterDateTimeHandler)
	// 	transactions.POST("/:chargeid", postNewTransactionHandler)
	// 	transactions.PUT("/:chargeid", modifyTransactionHandler)
	// }
	// budget := router.Group("/budget")
	// {
	// 	budget.GET("/", getAllBudgetCategoriesHandler)
	// 	budget.POST("/:category", insertNewCategoryHandler)
	// 	budget.PUT("/:category", modifyCategoryHandler)
	// }
	// router.POST("/category/:catname/:vendorname", newCategoryVendorHandler)
	// router.Run() // listen and serve on 0.0.0.0:8080
}

func getAllTransactionsHandler(c *gin.Context) {
	transactions, err := dbfuncs.GetAllTransactions()
	if err != nil {
		fmt.Printf("Error getting all transactions: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, transactions)
}

func getAllUncategorizedTransactionsHandler(c *gin.Context) {
	transactions, err := dbfuncs.GetAllDanglingTransactions()
	if err != nil {
		fmt.Printf("Error getting uncategorized transactions: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, transactions)
}

func getAllTransactionsInCategoryHandler(c *gin.Context) {
	category := c.Param("category")
	transactions, err := dbfuncs.GetAllCategoryTransactions(category)
	if err != nil {
		fmt.Printf("Error getting transactions in category %s: %+v\n", category, err)
		c.JSON(500, err)
	}
	c.JSON(200, transactions)
}

func getAllTransactionsAfterDateTimeHandler(c *gin.Context) {
	startTime, err := time.Parse(time.RFC3339, c.Param("starttime"))
	if err != nil {
		fmt.Printf("Error parsing start time: %+v\n", err)
		c.JSON(500, err)
	}

	endTime, err := time.Parse(time.RFC3339, c.Param("endtime"))
	if err != nil {
		fmt.Printf("Error parsing end time: %+v\n", err)
		c.JSON(500, err)
	}

	transactions, err := dbfuncs.GetAllTransactionsBetween(startTime, endTime)
	if err != nil {
		fmt.Printf("Error getting transactions between %+v and %+v: %+v\n", startTime, endTime, err)
		c.JSON(500, err)
	}
	c.JSON(200, transactions)
}

func postNewTransactionHandler(c *gin.Context) {
	transaction := dbfuncs.Transaction{}
	err := json.NewDecoder(c.Request.Body).Decode(&transaction)
	if err != nil {
		fmt.Printf("Error parsing new transaction: %+v\n", err)
		c.JSON(500, err)
	}

	checkCat, err := dbfuncs.CheckVendorCategory(transaction.Vendor)
	if err != nil {
		fmt.Printf("Error checking transaction category or uncategorized: %+v\n", err)
		transaction.CategoryName = "uncategorized"
	} else {
		transaction.CategoryName = checkCat
	}

	err = dbfuncs.AddTransaction(&transaction)
	if err != nil {
		fmt.Printf("Error adding new transaction: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, transaction)
}

func modifyTransactionHandler(c *gin.Context) {
	transaction := dbfuncs.Transaction{}
	err := json.NewDecoder(c.Request.Body).Decode(&transaction)
	if err != nil {
		fmt.Printf("Error parsing transaction for update: %+v\n", err)
		c.JSON(500, err)
	}

	err = dbfuncs.ModifyTransaction(&transaction)
	if err != nil {
		fmt.Printf("Error updating transaction: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, transaction)
}

func getAllBudgetCategoriesHandler(c *gin.Context) {
	categories, err := dbfuncs.GetAllBudgetCategories()
	if err != nil {
		fmt.Printf("Error getting all budget categories: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, categories)
}

func insertNewCategoryHandler(c *gin.Context) {
	budgetCategory := dbfuncs.BudgetCategory{}
	err := json.NewDecoder(c.Request.Body).Decode(&budgetCategory)
	if err != nil {
		fmt.Printf("Error parsing budget category for adding: %+v\n", err)
		c.JSON(500, err)
	}

	err = dbfuncs.AddBudgetCategory(&budgetCategory)
	if err != nil {
		fmt.Printf("Error adding new budget category: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, budgetCategory)
}

func modifyCategoryHandler(c *gin.Context) {
	budgetCategory := dbfuncs.BudgetCategory{}
	err := json.NewDecoder(c.Request.Body).Decode(&budgetCategory)
	if err != nil {
		fmt.Printf("Error parsing budget category for update: %+v\n", err)
		c.JSON(500, err)
	}

	err = dbfuncs.ModifyBudgetCategory(&budgetCategory)
	if err != nil {
		fmt.Printf("Error updating budget category: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, budgetCategory)
}

func newCategoryVendorHandler(c *gin.Context) {
	category := c.Param("catname")
	vendor := c.Param("vendorname")

	err := dbfuncs.AddVendorCategory(vendor, category)
	if err != nil {
		fmt.Printf("Error adding vendor/category pair: %+v\n", err)
		c.JSON(500, err)
	}
	c.JSON(200, "")
}
