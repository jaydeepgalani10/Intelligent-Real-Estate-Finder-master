var redis = require('redis');
var client = redis.createClient();
var timestamp = require('console-timestamp');

var date = timestamp('DD.MM.YYYY');

var mark_application_status = function (estate_id, visit_date, ip_addr) {
  client.lpush("application_status:" + estate_id, visit_date + ":" + ip_addr, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("application_status:" + estate_id + " is inserted!");
    }
    client.quit();
  });
}

mark_application_status("ES001", date, "123.41.120.22");
