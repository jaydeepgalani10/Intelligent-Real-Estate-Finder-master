var redis = require('redis');
var client = redis.createClient();
var prompt = require('prompt');
var  ctm = require("./crimeTrendModules");

var inputFields = {
  properties: {
    Zipcode: {
      message: 'Zipcode',
      required: true
    }, Year: {
      message: 'Year',
      required: true
    }, Headline: {
      message: 'Headline',
      required: true
    }
  }
};

var postalcode = {
  properties: {
    zipcode: {
      message: 'Zipcode',
      required: true
    }
  }
};

console.log("---------------------- Crime Trend Menu -------------------------");
console.log("1 - Insert Crime Trend");
console.log("2 - Read Crime Trend");

prompt.start();

prompt.get("option", function (err, reply) {
  if (err) {
    console.log(err);
  } else {
    switch (reply.option) {
      case "1":
      prompt.get(inputFields, function (err, res) {
        ctm.create_crime_trend(res.Zipcode, res.Year, res.Headline, client);
      })
      break;
      case "2":
      prompt.get(postalcode, function (err, rep) {
        ctm.read_crime_trend(rep.zipcode, client);
      })
      break;
      default: console.log("Please enter valid option!");
    }
  }
});
