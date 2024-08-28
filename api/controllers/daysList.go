package controllers

import (
	"io"
	"log"
	"net/http"
)


func GetAllDays(w http.ResponseWriter, r *http.Request){

	EnableCors(&w)

	url := baseUrl + "/joursTempo"

	res,err := http.Get(url)
	if err != nil {
		log.Fatalf("Error fetching API : %s", err)
	}
	defer res.Body.Close()

	resData,err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatalf("Error reading data :  %s", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resData)

	}