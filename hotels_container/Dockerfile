FROM python:3.8

# ADD rest-server.py /

RUN pip3 install --upgrade jsonpickle requests flask airportsdata pandas numpy geopy

CMD mkdir /app
WORKDIR /app

COPY . /app

EXPOSE 5000
CMD cd /app && python3 Hotels_Flights_CarRentals.py
