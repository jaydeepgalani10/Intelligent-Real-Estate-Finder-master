var prompt = require('prompt');
var redis = require('redis');
var client = redis.createClient();
var crypto = require('crypto');
var um = require('./usersModule');

var inputFields = {
  properties: {
    username: {
      pattern: /^[a-z0-9\-\_]+$/i,
      message: 'Username must be only letters, underscores, or dashes',
      required: true
    }, password: {
      hidden: true
    }
  }
};

prompt.start();
console.log('--------------------------- User Login Details --------------------------------');
console.log('');

prompt.get(inputFields, function (err, result) {
  var pwdHash = crypto.createHash('sha256').update(result.password).digest('base64');
  um.check_userLogin(result.username, pwdHash, client, prompt, crypto);
});
