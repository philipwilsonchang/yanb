package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/philipwilsonchang/budgetapp/db"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world. %s", r.URL.Path[1:])
}

func main() {
	dbfuncs.Start("testdb/test.db")
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	transactions := router.Group("/transactions")
	{
		transactions.GET("/", getAllTransactionsHandler)
		transactions.GET("/uncategorized", getAllUncategorizedTransactionsHandler)
		transactions.GET("/category/:category", getAllTransactionsInCategoryHandler)
		transactions.GET("/timestamp/:timestamp", getAllTransactionsAfterDateTimeHandler)
		transactions.POST("/:chargeid", postNewTransactionHandler)
		transactions.PUT("/:chargeid", modifyTransactionHandler)
	}
	budget := router.Group("/budget")
	{
		budget.GET("/", getAllBudgetCategoriesHandler)
		budget.POST("/:category", insertNewCategoryHandler)
		budget.PUT("/:category", modifyCategoryHandler)
	}
	router.Run() // listen and serve on 0.0.0.0:8080
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
	// category := c.Param("category")
}

func getAllTransactionsAfterDateTimeHandler(c *gin.Context) {

}

func postNewTransactionHandler(c *gin.Context) {

}

func modifyTransactionHandler(c *gin.Context) {

}

func getAllBudgetCategoriesHandler(c *gin.Context) {

}

func insertNewCategoryHandler(c *gin.Context) {

}

func modifyCategoryHandler(c *gin.Context) {

}
