var prompt = require('prompt');
var redis = require('redis');
var client = redis.createClient();
var crypto = require('crypto');
var um = require('./usersModule');

var inputFields = {
  properties: {
    old_password: {
      hidden: true
    }, new_password: {
      hidden: true
    }
  }
};

prompt.start();

prompt.get(inputFields, function (err, result) {

  client.hget("users:US0005", "password", function (err, oldPwdHash) {
    if (err) {
      console.log(err);
    } else {
      console.log('----------------------------------------------------------------------');
      var oldHash = crypto.createHash('sha256').update(result.old_password).digest('base64');
      if (oldPwdHash === oldHash) {
        var newHashPwd = crypto.createHash('sha256').update(result.new_password).digest('base64');
        client.hset("users:US0005", "password", newHashPwd, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Password successfully changed!");
          }
        });
      } else {
        console.log("Entered old password is wrong!");
      }
    }
    client.quit();
  });
});
