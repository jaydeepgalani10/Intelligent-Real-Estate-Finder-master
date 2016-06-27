exports.create_crime_trend = function (zipcode, year, headline, client) {
  client.lpush("crime_trend:" + zipcode + ":" + year, headline, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("crime_trend:" + zipcode + ":" + year + " is inserted!");
    }
    client.quit();
  });
}

exports.read_crime_trend = function (zipcode, client) {
  client.keys("crime_trend:" + zipcode + ":*", function (err, keys_array) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < keys_array.length; i++) {
        (function (j) {
          client.lrange(keys_array[j], 0, -1, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log('-----------------------------------------');
                var year = keys_array[j].split(":");
                console.log("Year: " + year[2]);
                for (var k = 0; k < result.length; k++) {
                  console.log(JSON.stringify(result[k]).replace(/^"(.*)"$/, '$1'));
                }
              }
              client.quit();
          });
        })(i);

      }
    }
  });

}
