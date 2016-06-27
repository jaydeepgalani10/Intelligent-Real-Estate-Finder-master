var redis = require('redis');
var client = redis.createClient();
var time_stamp = require('console-timestamp');

var ts = time_stamp('DD.MM.YYYY:hh:mm:ss');
var key_counter = time_stamp('DDMMYYYYhhmmss');

var mark_searchHistory = function (user_id, counter, search_key, timestamp, user_latitude, user_longitude,interest_status) {
    client.hmset("search_history:" + user_id + ":" + counter, "search_key", search_key, "timestamp", timestamp,
     "user_latitude", user_latitude, "user_longitude", user_longitude, "interest_status", interest_status,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("search_history:" + user_id + ":" + key_counter + " is inserted!");
        }
        client.quit();
      });
}

mark_searchHistory("US0003", key_counter, "2 BHK in Aachen semi-furnished", ts, "504,883,920", "657,040,549,999,120", 1);
