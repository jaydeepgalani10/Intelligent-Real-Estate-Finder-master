var redis = require('redis');
var client = redis.createClient();
var prompt = require('prompt');
var usm = require('./userSubscriptionModules');

console.log("Press 1 to Subscribe");
console.log("Press 0 to Unsubscribe");

prompt.start();

prompt.get("option", function (err, result) {
  if (err) {
    console.log(err);
  } else {
    switch (result.option) {
      case "1": usm.create_subscription("US0001", client);
      break;
      case "0": usm.delete_subscription("US0006", client);
      break;
      default: console.log("Please enter valid option!");
    }
  }
  usm.read_subscription_list(client);
});
