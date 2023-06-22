# This file is the python equivalent code

import requests
import config

seatgeekClientId = config.api_key
events = [
    {
        # Stadium of Fire - Journey
        id: 5992341,
        maxPrice: 100,
    }
]
for event in events:
    url = (
        "https://api.seatgeek.com/2/events/"
        + event.id.toString()
        + "?client_id="
        + seatgeekClientId
    )
