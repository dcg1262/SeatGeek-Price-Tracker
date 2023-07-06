# This file is the python equivalent code

import requests
import config

seatgeekClientId = config.api_key
eventID = 5964238  # Dallas Cowboys vs New York Jets ID
url = (
    "https://api.seatgeek.com/2/events/"
    + str(eventID)
    + "?client_id="
    + str(seatgeekClientId)
)
response = requests.get(url)

data = response.json()
eventDesc = (
    data["title"]
    + " (ID "
    + str(eventID)
    + ") at "
    + data["venue"]["name"]
    + " in "
    + data["venue"]["city"]
)
print(eventDesc)
