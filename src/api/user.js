import axios from 'axios'
import { addClass, hasClass } from './hhq.js'
import { hhq } from './hhq.js'

export function getlevel(that) {
  let $data = {
    url: 'wechat/user_info/consume'
  }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      if (res.status.succeed === 1) {
        that.levelData = res.data
      }
      resolve('getlevel_success')
    })
  })
}

export function getMsg(that) {
  let $data = {
    url: 'wechat/message/msg/count'
  }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      if (res.status.succeed === 1) {
        that.msgData = res.data
      }
      resolve('getMsg_success')
    })
  })
}

export function getAuthor(that) {
  let $data = {
    url: 'wechat/user_info/bankinfo/is_check_author'
  }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('getAuthor_success')
      if (res.status.succeed === 1) {
        that.authorData = res.data
      }
    })
  })
}

export function getPoint(that) {
  // 判断能否分销
  let $data = {
    url: 'wechat/mallmark/wechat_mymallmark/checkPoints'
  }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('getPoint_success')
      if (res.status.succeed === 1) {
        that.pointData = res.data
      }
    })
  })
}

export function getAgentPrice(that) {
  let $data = {
    url: 'wechat/agent/wechat_agent_all/daili_potins'
  }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      console.log(res)
      resolve('getAgentPrice_success')
      if (res.status.succeed === 1) {
        that.agentPriceData = res.data
      }
    })
  })
}
