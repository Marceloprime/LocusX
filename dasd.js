const axios = require('axios');

let access_token = '0ae50feeb1c8e3112cb48ff5fd7058ebdb6aea51'
axios.get('http://127.0.0.1:8000/api/users/myprofile/', {
  headers: {
    'Authorization': `token ${access_token}`
  }
})
.then((res) => {
  console.log(res.data)
})
.catch((error) => {
  console.error(error)
})
