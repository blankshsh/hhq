import axios from 'axios'
import { addClass, hasClass } from './hhq.js'
import { hhq } from './hhq.js'

export const pointData = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_mypoints/banner', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('pointData_ssuccess')
      if (res.status.succeed === 1) {
        that.headerData = res.data
      }
    })
  })
}

export const point_AvaData = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_list_enable', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('pointAvaData_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $hasMore = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $hasMore = true
        }
        var $count = $data.data.count + 20
        that.headerData = '合计：' + res.extra.total + ' 分'
        that.resData = $value
        that.hasMore = $hasMore
        that.count = $count
      }
    })
  })
}

export const point_luckPoint = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_list_lucky', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('point_luckPoint_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $hasMore = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $hasMore = true
        }
        var $count = $data.data.count + 20
        that.headerData = '合计：' + res.extra.get_total + ' 分'
        that.resData = $value
        that.hasMore = $hasMore
        that.count = $count
      }
    })
  })
}

export const point_invite = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_mypoints/Ttotal', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('point_invite_ssuccess')
      if (res.status.succeed === 1) {
        that.headerData = '合计：' + res.data.totalNum + ' 分'
      }
    })
  })
}

export const point_invite_active = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_list_recom', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('point_invite_active_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $hasMore = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $hasMore = true
        }
        var $count = $data.data.count + 20
        that.headerData = '合计：' + res.extra.total + ' 分'
        that.resData = $value
        that.hasMore = $hasMore
        that.count = $count
      }
    })
  })
}

export const point_invite_unactive = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_list_urecom', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('point_invite_active_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $hasMore = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $hasMore = true
        }
        var $count = $data.data.count + 20
        that.headerData = '合计：' + res.extra.total + ' 分'
        that.resData = $value
        that.hasMore = $hasMore
        that.count = $count
      }
    })
  })
}

export const point_pointin = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_list_gain', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('point_pointin_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $hasMore = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $hasMore = true
        }
        var $count = $data.data.count + 20
        that.headerData = '合计：' + res.extra.get_total + ' 分'
        that.resData = $value
        that.hasMore = $hasMore
        that.count = $count
      }
    })
  })
}

export const point_consumer = function(that, $value) {
  let $data = { url: '/wechat/points/wechat_list_cost', data: $value }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('point_consumer_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = $value.length
        var $hasMore = false
        if ($length === 0 || res.paginated.more === 0) {
          addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          $hasMore = true
        }
        var $count = $data.data.count + 20
        that.headerData = '合计：' + res.extra.get_total + ' 分'
        that.resData = $value
        that.hasMore = $hasMore
        that.count = $count
      }
    })
  })
}
