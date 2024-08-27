package controllers

import (
	"fmt"
	"io"
	"log"
	"net/http"
)


const baseUrl = "https://www.api-couleur-tempo.fr/api"

func GetToday(w http.ResponseWriter, r *http.Request){

	url := baseUrl + "/jourTempo/today"

	res,err := http.Get(url)
	if err != nil {
		log.Fatalf("Error fetching API : %s", err)
	}
	defer res.Body.Close()

	resData,err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatalf("Error reading data :  %s", err)
	}

	fmt.Println(string(resData))
}