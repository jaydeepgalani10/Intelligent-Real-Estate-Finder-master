exports.insertEstateType = function (client, prompt) {
  var inputFields = {
    properties: {
      estate_type: {
        message: 'Estate Type',
        required: true
      }
    }
  };
  prompt.start();
  prompt.get(inputFields, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      client.rpush("estate_types", res.estate_type, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Estate type " + res.estate_type + " is inserted!");
          process.exit(0);
        }
        client.end();
      });
    }
  });
}

exports.get_estate_types = function (client) {
  client.lrange("estate_types", 0, -1, function (err, list_array) {
    if (err) {
      console.log(err);
    } else {
      console.log('-------------Estate Types ------------');
      for (var i = 0; i < list_array.length; i++) {
        j = i + 1;
        console.log(j + ". " + list_array[i]);
      }
    }
    client.quit();
  });
}

exports.insert_priceTrend = function (client, prompt) {
  var inputFields = {
    properties: {
      Year: {
        message: 'Year',
        required: true
      }, Address_ID: {
        message: 'Address ID',
        required: true
      }, Unit_Price: {
        message: 'Unit Price',
        required: true
      }
    }
  };
  client.llen("estate_types", function (err, size) {
    if (err) {
        console.log(err);
    } else {
      prompt.start();
      prompt.get("estate_type_option", function (err, res) {
        if (err) {
          console.log(err);
        } else {
          if (res.estate_type_option < size + 1) {
            prompt.get(inputFields, function (err, reply) {
              client.hmset("price_trend:" + reply.Year + ":" + res.estate_type_option, reply.Address_ID, reply.Unit_Price, function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("price_trend:" + reply.Year + ":" + res.estate_type_option + " is inserted!");
                }
                client.quit();
              });
          });
          } else {
            console.log("Please enter valid option!");
          }
        }
      });
    }
  });
}


var getPriceTrend = function (estate_type_index, client) {
  client.keys("price_trend:*:" + estate_type_index, function (err, year_trend) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < year_trend.length; i++) {
        (function (j) {
          //client.hmget(year_trend[j], "address_id", "unit_price", function (err, listItems) {
          client.hgetall(year_trend[j], function (err, listItems) {
            if (err) {
              console.log(err);
            } else {
              console.log('---------------------------------------------');
              var year = year_trend[j].split(":");
              console.log("Year: " + year[1]);
              var sub_key = [];
              for (var i in listItems) {
                sub_key.push(JSON.stringify(i));
                sub_key.push(JSON.stringify(listItems[i]));
              }
              console.log("Address ID: " + sub_key[0].replace(/^"(.*)"$/, '$1'));
              console.log("Unit Price: " + sub_key[1].replace(/^"(.*)"$/, '$1'));
            }
            client.quit();
          });
        })(i);
      }
    }
  });
}

exports.readPriceTend = function (client, prompt) {
  client.llen("estate_types", function (err, size) {
    if (err) {
      console.log(err);
    } else {
      prompt.start();
      prompt.get("estate_type_option", function (err, res) {
        if (err) {
          console.log(err);
        } else {
          if (res.estate_type_option < size + 1) {
            getPriceTrend(res.estate_type_option, client);
          } else {
            console.log("Please enter valid option!");
          }
        }
      });
    }
  });
}
