var redis = require('redis');
var client = redis.createClient();
var cli = redis.createClient();
var prompt = require('prompt');
var pr = require('prompt');
var ptm = require('./priceTrendModules');



console.log("---------------------- Price Trend Menu -------------------------");
console.log("1 - Insert Estate Type");
console.log("2 - Insert Price based on estate type");
console.log("3 - Read Price based on estate type");

prompt.start();

prompt.get("option", function (err, result) {
  if (err) {
    console.log(err);
  } else {
    switch (result.option) {
      case "1": ptm.insertEstateType(client, prompt);
      break;
      case "2": ptm.get_estate_types(cli);
      ptm.insert_priceTrend(client, prompt);
      break;
      case "3": ptm.get_estate_types(cli);
      ptm.readPriceTend(client, prompt);
      break;
      default: console.log("Please enter valid option!");
      client.quit();
      cli.quit();
    }
  }
});
