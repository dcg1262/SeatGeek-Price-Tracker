# This file is the python equivalent code

import requests
import config

seatgeekClientId = config.api_key
eventID = 5964238  # Dallas Cowboys vs New York Jets ID
maxPrice = 100
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

lowestPrice = data["stats"]["lowest_price"]

alertText = "Lowest price for " + eventDesc + ": $" + str(lowestPrice)
alertText = alertText.replace(
    "&", "%26"
)  # & Messes with requests api, %26 is equivalent to &
print(alertText)

if lowestPrice <= maxPrice and lowestPrice != None:
    url = f"https://api.telegram.org/bot{config.TOKEN}/sendMessage?chat_id={config.chat_id}&text={alertText}"
    print(requests.get(url).json())  # this sends the message
