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
    }, email: {
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
      message: 'Please enter correct email format',
      required: true
    },password: {
      hidden: true
    }
  }
};

prompt.start();
console.log('-------------------------- User Details -------------------------------');
console.log('');
prompt.get(inputFields, function (err, result) {
  var pwdHash = crypto.createHash('sha256').update(result.password).digest('base64');
  um.create_userLogin(result.username, result.email, pwdHash, client);
});
