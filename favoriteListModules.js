exports.create_favoriteList = function (user_id, counter, estate_id, time_stamp, estate_latitude, estate_longitude, user_latitude, user_longitude, client) {
      client.hmset("favourite_list:" + user_id +":" + counter, "estate_id", estate_id, "time_stamp", time_stamp, "estate_latitude", estate_latitude,
        "estate_longitude", estate_longitude, "user_latitude", user_latitude, "user_longitude", user_longitude, function (err) {
           if (err) {
             console.log(err);
           } else {
             console.log("favourite_list:" + user_id +":" + counter + " is created!");
           }
           client.quit();
        });
}

exports.read_favoriteList = function (user_id, client) {
  client.keys("favourite_list:" + user_id +":*", function (err, keys_array) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < keys_array.length; i++) {
        client.hmget(keys_array[i], "estate_id", "time_stamp", "estate_latitude", "estate_longitude", "user_latitude", "user_longitude", function (err, favourite_arr) {
          if (err) {
            console.log(err);
          } else {
            console.log('----------------------------------------------------');
            console.log("User Id: " + user_id);
            console.log("Estate ID: " + favourite_arr[0]);
            console.log("Time Stamp: " + favourite_arr[1]);
            console.log("Estate Latitude: " + favourite_arr[2]);
            console.log("Estate Longitude: " + favourite_arr[3]);
            console.log("User Latitude: " + favourite_arr[4]);
            console.log("User Longitude: " + favourite_arr[5]);
          }
          client.quit();
        });
      }
    }
  });
}

exports.delete_favoriteList = function (user_id, client) {
  client.keys("favourite_list:" + user_id +":*", function (err, list_array) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < list_array.length; i++) {
        client.del(list_array[i], function (err) {
          if (err) {
            console.log(err);
          } else {
            //console.log("Favourite List of user with ID " + user_id + " deleted!");
          }
        });
      }
      console.log("Favourite List of user with ID " + user_id + " deleted!");
    }
    client.quit();
  });
}


exports.delete_favoriteListItem = function (user_id, item_no, client) {
  client.del("favourite_list:" + user_id +":" + item_no, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Favourite List Item " + item_no +" of user with ID " + user_id + " deleted!");
    }
    client.quit();
  });
}
