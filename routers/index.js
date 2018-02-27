const axios = require('axios')

exports.hhq = function(req, res) {
  axios({
    url: 'https://blankshsh.herokuapp.com/api/hhq',
    method: 'POST',
    headers: {
      sign: req.get('sign'),
      time: req.get('time')
    },
    data: req.body
  }).then(response => {
    res.json(response.data)
  })
}


exports.login = function(req, res) {
  axios({
    url: 'https://blankshsh.herokuapp.com/api/login',
    method: 'POST',
    headers: {
      sign: req.get('sign'),
      time: req.get('time')
    },
    data: req.body
  }).then((response) => {
    res.json(response.data)
    userData.headers.session_id = response.data.data.session.sid
    userData.headers.user_id = response.data.data.session.uid
    userData.user_id = response.data.data.session.uid
    // userData.user_id = 12
    userData.user = response.data.data.user
  }).catch((e) => {
    console.log(e)
  })
}
