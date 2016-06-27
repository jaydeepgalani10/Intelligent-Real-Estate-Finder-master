exports.create_subscription = function (user_id, client) {
  client.sadd("subscription_list", user_id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(user_id + " added in subscription list");
    }
    client.quit();
  });
}

exports.delete_subscription = function (user_id, client) {
  client.srem("subscription_list", user_id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(user_id + " removed from subscription list");
    }
    client.quit();
  });
}

exports.read_subscription_list = function (client) {
  client.smembers("subscription_list", function (err, user_ids) {
    if (err) {
      console.log(err);
    } else {
      console.log("----------------------------------------");
      for (var i = 0; i < user_ids.length; i++) {
        console.log(user_ids[i]);
      }
      console.log("----------------------------------------");
    }
    client.quit();
  });
}
