const axios = require('axios')

exports.hhq = function(req, res) {
  axios({
    url: 'https://www.blankshsh.cn/api/hhq',
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
    url: 'http://193.112.105.192/api/login',
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
