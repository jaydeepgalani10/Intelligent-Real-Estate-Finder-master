exports.check_userLogin = function(username, password, client, prompt, crypto){
  client.hget("users", username, function (err, user_id) {
    if (err) {
      console.log(err);
    }
    if (user_id === null) {
      console.log("User with username '"+ username + "' does not exist!");
    } else {
      console.log("-----------------------------------------------");
      console.log('Found User ID: ' + user_id);
      client.hmget("users:" + user_id, "email", "password",function (err, user_array) {
          console.log("-----------------------------------------------");
          if (err) {
            console.log("Error: " + err);
          } else {
            console.log("Email: " + user_array[0]);
            if (password === user_array[1]) {
              console.log(username + " successfully logged in!");
              console.log('');
              userUpdatePassword(user_id, client, prompt, crypto);
            } else {
              console.log("username or password is incorrect!");
              client.quit();
            }
          }
      });
    }
  });
}

var createUserId = function (num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

exports.create_userLogin = function (username, email, password, client) {
  client.hkeys("users", function (err, keys) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log('---------------------------------------------------------------');
      var user_id = "US" + createUserId(keys.length + 1, 4);
      client.hset("users", username, user_id, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(username + " with User ID " + user_id + " is created!");
        }
      });
      client.hmset("users:" + user_id, "username", username, "email", email, "password", password, "auth", "", function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(username + " is registered!");
        }
      });
    }
    client.quit();
  });
}

var userUpdatePassword = function (user_id, client, prompt, crypto) {
  var inputFields = {
    properties: {
      old_password: {
        hidden: true
      }, new_password: {
        hidden: true
      }
    }
  };
  console.log("Press 1 to Update the Password");

  prompt.get("option", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      switch (result.option) {
        case "1":
        console.log('-------------------------- User Password Details ------------------------------');
        console.log('');
        prompt.get(inputFields, function (err, result) {

          client.hget("users:" + user_id, "password", function (err, oldPwdHash) {
            if (err) {
              console.log(err);
            } else {
              console.log('----------------------------------------------------------------------');
              var oldHash = crypto.createHash('sha256').update(result.old_password).digest('base64');
              if (oldPwdHash === oldHash) {
                var newHashPwd = crypto.createHash('sha256').update(result.new_password).digest('base64');
                client.hset("users:" + user_id, "password", newHashPwd, function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Password successfully changed!");
                  }
                  client.quit();
                });
              } else {
                console.log("Entered old password is wrong!");
                process.exit(0);
              }
            }
          });
        });
        break;
        default:
        process.exit(0);
      }
    }
  });
}
