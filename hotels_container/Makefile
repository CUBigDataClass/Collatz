VERSION=v4
DOCKERUSER=sushravya724

build:
	docker build -f Dockerfile-rest -t hotels_flights_carrentals-rest.

push:
	docker tag hotels_flights_carrentals-rest $(DOCKERUSER)/hotels_flights_carrentals-rest:$(VERSION)
	docker push $(DOCKERUSER)/hotels_flights_carrentals-rest:$(VERSION)
	docker tag hotels_flights_carrentals-rest $(DOCKERUSER)/hotels_flights_carrentals-rest:latest
	docker push $(DOCKERUSER)/hotels_flights_carrentals-rest:latest
