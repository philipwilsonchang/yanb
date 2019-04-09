package main

import (
	"fmt"
	//"github.com/gin-gonic/gin"
	uuid "github.com/google/uuid"
	sql "github.com/philipwilsonchang/budgetapp/db"
	"net/http"
	"time"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world. %s", r.URL.Path[1:])
}

func dbtest(write bool) {
	// Setup db
	fmt.Println("Opening db file...")
	sql.Start("testdb/test.db")

	if write {
		fmt.Println("Adding transactions...")
		err := sql.AddTransaction(uuid.New(), "chase", time.Now(), "google", 16.05, "grocery")
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}

		err = sql.AddTransaction(uuid.New(), "discover", time.Now(), "wholefoods", 17.99, "food")
		if err != nil {
			fmt.Printf("Error: %+v\n", err)
		}
	}

	fmt.Println("Dumping tables...")
	results, err := sql.GetAllTransactions()
	if err != nil {
		fmt.Printf("Error: %+v\n", err)
	} else {
		fmt.Printf("Dump: %+v\n", results)
	}
}

func main() {
	dbtest(false)
	/*
		router := gin.Default()
		router.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})
		router.Run() // listen and serve on 0.0.0.0:8080
	*/
}
