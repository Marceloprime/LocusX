var request = require('request');

request({
  method: 'POST',
  url: 'http://class-path-auth.herokuapp.com/',
  headers: {
    'Authorization': 'Token b51628593bf8e9d34ebf3af883f757b2dd7eab21'
  },
  body: `{
    "name": "Unesp",
    "Description": "Teste",
}`
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});