package main

import (
	"fmt"
	//"github.com/gin-gonic/gin"
	sql "github.com/philipwilsonchang/budgetapp/db"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world. %s", r.URL.Path[1:])
}

func main() {
	sql.DBtest(false)
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
