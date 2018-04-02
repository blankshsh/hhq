import axios from 'axios'
import md5 from 'md5'

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function mobile(phone) {
  let first = phone.toString().substr(0, 3)
  let last = phone.toString().substr(-4)
  let $phone = first + '****' + last
  return $phone
}

export function reSize(that) {
  // console.log(that.$refs)
  if (that.$refs) {
    var $data = that.$refs
    for (var k in $data) {
      if (!hasClass($data[k].$el, 'cube-scroll-wrapper')) {
        $data[k].refresh()
      } else {
        setTimeout(function() {
          $data[k].refresh()
        }, 100)
      }
    }
  }
}

export function getTop(that, id) {
  var $el = document.querySelector(id)
  var $style = 'position: absolute;height: auto;bottom: 0;width: 7.5rem;margin:0 auto;top:' + $el.offsetTop + 'px'
  that.offsetTop = $style
}

export function navBack(that) {
  if (that.$store.state.onload) {
    that.getData()
  } else {
    that.$router.push({
      path: '/user'
    })
  }
}

function password() {
  let $timestamp = new Date().getTime().toString()
  let $combine = md5('blankshsh' + $timestamp).substring(16)
  return { time: $timestamp, sign: $combine }
}


export function login() {
  const url = 'https://api.blankshsh.cn/api/login'
  return axios({
    url: url,
    method: 'POST',
    headers: password()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function hhq($data) {
  return axios({
    url: 'https://api.blankshsh.cn/api/hhq',
    method: 'POST',
    data: $data,
    headers: password()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function sdxiu(type) {
  let data = { type: type }
  return axios({
    url: '/api/sdxiu',
    method: 'GET',
    params: data
  }).then(res => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}

export function mysql() {
  return axios({
    url: '/api/getData',
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
