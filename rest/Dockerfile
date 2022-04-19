FROM python:3.8

# ADD Hotels_Flights_CarRentals_server.py /

RUN pip3 install --upgrade flask 

CMD mkdir /app
WORKDIR /app

COPY . /app

EXPOSE 5000
CMD cd /app && python3 Hotels_Flights_CarRentals_server.py
