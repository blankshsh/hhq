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
  }).catch((e) => {
    console.log(e)
  })
}
