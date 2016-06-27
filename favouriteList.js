var redis = require('redis');
var client =  redis.createClient();
var timestamp = require('console-timestamp');
var prompt = require('prompt');
var flm = require('./favoriteListModules');

var ts = timestamp('DD.MM.YYYY:hh:mm:ss');
var key_counter = timestamp('DDMMYYYYhhmmss');

console.log("----------------------Favourite List Menu-------------------------");
console.log("1 - Mark Favourite Item");
console.log("2 - Show Favourite List");
console.log("3 - Delete Favourite List Item");
console.log("4 - Delete Favourite Complete List");

prompt.start();

prompt.get("option", function (err, result) {
  if (err) {
    console.log(err);
  } else {
    switch (result.option) {
      case "1": flm.create_favoriteList("US0002", key_counter, "ES002", ts, 49.4040995, 8.68697580000002, 40.0540984, 7.5974980290087, client);
      break;
      case "2": flm.read_favoriteList("US0001", client);
      break;
      case "3": flm.delete_favoriteListItem("US0005", 2, client);
      break;
      case "4": flm.delete_favoriteList("US0005", client);
      break;
      default: console.log("Please enter valid option!");
    }
  }
});
