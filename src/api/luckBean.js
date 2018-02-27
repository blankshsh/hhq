import axios from 'axios'
import { addClass, hasClass } from './hhq.js'
import { hhq } from './hhq.js'

export function luckBeans(that) {
  let $data = { url: 'wechat/beans/wechat_mybeans' }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('luckBeans_ssuccess')
      if (res.status.succeed === 1) {
        that.luckBean = res.data
      }
    })
  })
}

export function luckBeansOnwallet(that, $value) {
  let $data = { url: 'wechat/beans/wechat_list_gain', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('luckBeansOnwallet_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $onwalletHasNext = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $onwalletHasNext = true
        }
        var $count = $data.data.count + 20
        that.onwalletData = $value
        that.onwalletHasMore = $onwalletHasNext
        that.onwalletCount = $count
        setTimeout(function() {
          that.$refs.scroll01.refresh()
        }, 20)
      }
    })
  })
}

export function luckBeansUsed(that, $value) {
  let $data = { url: 'wechat/beans/wechat_list_cost', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('luckBeansUsed_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $UsedHasNext = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[1], 'hide')
        } else {
          $UsedHasNext = true
        }
        var $count = $data.data.count + 20
        that.usedData = $value
        that.usedHasMore = $UsedHasNext
        that.usedCount = $count
        setTimeout(function() {
          that.$refs.scroll02.refresh()
        }, 20)
      }
    })
  })
}
