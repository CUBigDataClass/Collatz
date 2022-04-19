from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'
  
# Pure data
airports = airportsdata.load()

# Processed Data
airports_df = pd.DataFrame(columns=["code", "lat", "long"])

for key in airports.keys():
    if ("international" in airports[key]["name"].lower()) or ("intl" in airports[key]["name"].lower()):
        if airports[key]["iata"] is not "":
            # print(airports[key])
            temp_df = pd.DataFrame([[airports[key]["iata"], airports[key]["lat"], airports[key]["lon"]]],
                                   columns=["code", "lat", "long"])
            airports_df = airports_df.append(temp_df, ignore_index=True)

starting_loc = "Boulder"
destination = "San Francisco"
start_date = "2022-06-10"
end_date = "2022-06-17"
adult_count = 1
child_count = 0

  
# start flask app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
