var seatgeekClientId = '';
var emailToAlert = '';
var numberToAlert = ;

// List of event objects with id and max_price you are willing to pay
var events = [
  {
    // New York Giants at Dallas
    id: 5685502,
    maxPrice: 30
  },
  {
    // Washington Commanders at Dallas Cowboys
    id: 5685501,
    maxPrice: 25
  },
  {
    // Detroit Lions at Dallas Cowboys
    id: 5685504,
    maxPrice: 25
  },
  {
    // Chicago Bears at Dallas Cowboys
    id: 5685505,
    maxPrice: 25
  },
  {
    // Indianapolis Colts at Dallas Cowboys
    id: 5685506,
    maxPrice: 30
  },
  {
    // Houston Texans at Dallas Cowboys
    id: 5685503,
    maxPrice: 30
  },
  {
    // Philadelphia Eagles at Dallas Cowboys
    id: 5685507,
    maxPrice: 30
  },
  {
    // 87th Goodyear Cotton Bowl Classic
    id: 5648402,
    maxPrice: 55
  }
];

function checkPrices() {
  events.forEach(function(event) {
    var url = 'https://api.seatgeek.com/2/events/'
      + event.id.toString()
      + '?client_id=' + seatgeekClientId;
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    

    var eventDesc = data.title + ' (ID ' + event.id + ') at ' + data.venue.name + ' in ' + data.venue.city;

    if(Date.now() > Date.parse(data.visible_until_utc)) {
      // If you can no longer buy tickets, don't send any alerts...
      Logger.log(eventDesc + ' is in the past.');
      return;
    }

    var lowestPrice = data.stats.lowest_price;
    var alertText = 'Lowest price for ' + eventDesc + ': $' + lowestPrice;
    Logger.log(alertText);
    
    if (lowestPrice <= event.maxPrice && lowestPrice !== null) {
      MailApp.sendEmail(emailToAlert,
                        'Google Apps Script SeatGeek Alert',
                        alertText);
    }
  });
}
