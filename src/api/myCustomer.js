import axios from 'axios'
import { addClass, hasClass } from './hhq.js'
import { hhq } from './hhq.js'

export function myCustomer(that) {
  let $data = { url: 'wechat/points/wechat_mycus' }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('myCustomer_ssuccess')
      if (res.status.succeed === 1) {
        that.resData = res.data
      }
    })
  })
}

export function bind_direct(that, $value) {
  let $data = { url: 'wechat/points/wechat_list_cus_active', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then(res => {
      // console.log(res)
      resolve('direct_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $directHasNext = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $directHasNext = true
        }
        if ($length > 0) {
          for (var i = 0; i < $length; i++) {
            if ($value[i].user_name) {
              var first = $value[i].user_name.substr(0, 3)
              var last = $value[i].user_name.substr(-4)
              $value[i].user_name = first + '****' + last
            }
          }
        }
        var $count = $data.data.count + 20
        that.directData = $value
        that.directHasMore = $directHasNext
        that.directCount = $count
        setTimeout(function() {
          that.$refs.scroll01.refresh()
        }, 20)
      }
    })
  })
}

export function unbind(that, $value) {
  let $data = { url: 'wechat/points/wechat_list_cus_common', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('unbind_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $unbindHasNext = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[1], 'hide')
        } else {
          $unbindHasNext = true
        }
        var $count = $data.data.count + 20
        that.unbindData = $value
        that.unbindHasMore = $unbindHasNext
        that.unbindCount = $count
        setTimeout(function() {
          that.$refs.scroll02.refresh()
        }, 20)
      }
    })
  })
}

export function bind_indirect(that, $value) {
  let $data = { url: 'wechat/points/wechat_list_cus_unactive', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('direct_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $directHasNext = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $directHasNext = true
        }
        var $count = $data.data.count + 20
        that.directData = $value
        that.directHasMore = $directHasNext
        that.directCount = $count
        setTimeout(function() {
          that.$refs.scroll01.refresh()
        }, 20)
      }
    })
  })
}
