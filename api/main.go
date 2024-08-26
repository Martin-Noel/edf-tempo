package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
err := godotenv.Load(".env")
if err != nil{
  log.Fatalf("Error loading .env file: %s", err)
 }


log.Fatal(http.ListenAndServe(":8019", nil))

}