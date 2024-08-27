package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/martinNoel/edf-tempo/controllers"
)

func main() {
err := godotenv.Load(".env")
if err != nil{
  log.Fatalf("Error loading .env file: %s", err)
 }

http.HandleFunc("/today", controllers.GetToday)
http.HandleFunc("/tomorrow", controllers.GetTomorrow)


log.Fatal(http.ListenAndServe(":8019", nil))

}