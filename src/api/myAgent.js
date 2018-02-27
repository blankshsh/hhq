import axios from 'axios'
import { addClass, hasClass } from './hhq.js'
import { hhq } from './hhq.js'

export function myAgent(that) {
  let $data = { url: 'wechat/agent/agent_common/myagent' }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('myAgent_ssuccess')
      if (res.status.succeed === 1) {
        console.log(that)
        var $res = res.data
        var $tabBar = that.tabBar
        var $listData = that.listData
        $tabBar.forEach(function(item, index) {
          item.num = $res[item.name]
        })
        $listData.forEach(function(item, index) {
          item.forEach(function(inner, index) {
            inner.num = $res[inner.name]
          })
        })
        that.tabBar = $tabBar
        that.listData = $listData
      } else if (res.data.status.succeed === 0) {
        that._Toast('error', res.data.status.error_desc)
      } else {
        that._Toast('error', '网络错误')
      }
    })
  })
}

export function agentDetail(that, data) {
  let $data = { url: that.url, data: data }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('agentDetail_ssuccess')
      if (res.status.succeed === 1) {
        var $value = res.data
        var $length = res.data.length
        var $count = that.count
        if ($length === 0 || res.paginated.more === 0) {
          // addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
        } else {
          var $hasNext = true
        }
        for (var i = 0; i < $length; i++) {
          $value[i].level = that.level
        }
        $count += 20
        that.headerData = '合计：' + res.extra.total + ' 家'
        that.resData = $value
        that.hasMore = true
        that.count = $count
        console.log(that)
      } else if (res.status.succeed === 0) {
        app._Toast('error', res.status.error_desc)
      } else {
        app._Toast('error', '网络错误')
      }
    })
  })
}
