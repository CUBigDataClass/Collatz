#!/bin/sh

kubectl apply -f docker-compose.yaml

kubectl apply -f rest/Hotels_Flights_CarRentals-deployment.yaml
kubectl apply -f rest/Hotels_Flights_CarRentals-service.yaml
