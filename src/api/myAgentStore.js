import axios from 'axios'
import { addClass, hasClass } from './hhq.js'
import { hhq } from './hhq.js'


export function myAgentStore() {
  let $data = { url: 'wechat/agent/agent_common/mymch' }
  return new Promise((resolve, reject) => {
    hhq($data).then((res) => {
      resolve(res)
    })
  })
}

export function myAgentStore_getdata(data) {
  return new Promise((resolve, reject) => {
    hhq(data).then((res) => {
      resolve(res)
    })
  })
}
