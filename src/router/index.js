import Vue from 'vue'
import Router from 'vue-router'

import User from 'components/user/user'

import LuckBean from 'components/user/luckBean/luckBean'

import Profit from 'components/user/profit/profit'

import Point from 'components/user/point/point'
import Point_available from 'components/user/point/available/available'
import Point_luckPoint from 'components/user/point/luckPoint/luckPoint'
import Point_invite from 'components/user/point/invitePoint/invitePoint'
import Point_invite_active from 'components/user/point/invitePoint/activated/activated'
import Point_invite_unactive from 'components/user/point/invitePoint/unactivated/unactivated'
import Point_pointit from 'components/user/point/pointin/pointin'
import Point_consumer from 'components/user/point/consumer/consumer'

import MyCustomer from 'components/user/myCustomer/myCustomer'
import MyCustomer_direct from 'components/user/myCustomer/direct/direct'
import MyCustomer_indirect from 'components/user/myCustomer/indirect/indirect'

import StoreApply from 'components/user/storeApply/storeApply'
import StoreApply_card from 'components/user/storeApply/card/card'
import StoreApply_profile from 'components/user/storeApply/profile/profile'
import StoreApply_storeData from 'components/user/storeApply/storeData/storeData'
import StoreApply_storeInfo from 'components/user/storeApply/storeInfo/storeInfo'

import MyAgent from 'components/user/myAgent/myAgent'
import AgentDetail from 'components/user/myAgent/agentDetail/agentDetail'

import MyAgentStore from 'components/user/myAgentStore/myAgentStore'
import MyAgentStore_direct from 'components/user/myAgentStore/direct/direct'
import MyAgentStore_indirect from 'components/user/myAgentStore/indirect/indirect'

import AgentQuota from 'components/user/agentQuota/agentQuota'
import AgentOpen from 'components/user/agentOpen/agentOpen'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/user'
  }, {
    path: '/user',
    component: User,
    children: [{
      path: 'luckBean',
      component: LuckBean
    }, {
      path: 'profit',
      component: Profit
    }, {
      path: 'point',
      component: Point,
      children: [{
        path: 'available',
        component: Point_available
      }, {
        path: 'luckPoint',
        component: Point_luckPoint
      }, {
        path: 'invitePoint',
        component: Point_invite,
        children: [{
          path: 'activated',
          component: Point_invite_active,
        }, {
          path: 'unactivated',
          component: Point_invite_unactive,
        }]
      }, {
        path: 'pointin',
        component: Point_pointit
      }, {
        path: 'consumer',
        component: Point_consumer
      }, ]
    }, {
      path: 'myCustomer',
      component: MyCustomer,
      children: [{
        path: 'direct',
        component: MyCustomer_direct
      }, {
        path: 'indirect',
        component: MyCustomer_indirect
      }]
    }, {
      path: 'storeApply',
      component: StoreApply,
      children: [{
        path: 'card',
        component: StoreApply_card
      }, {
        path: 'profile',
        component: StoreApply_profile
      }, {
        path: 'storeData',
        component: StoreApply_storeData
      }, {
        path: 'storeInfo',
        component: StoreApply_storeInfo
      }]
    }, {
      path: 'myAgent',
      component: MyAgent,
      children: [{
        path: 'agentDetail',
        component: AgentDetail
      }]
    }, {
      path: 'myAgentStore',
      component: MyAgentStore,
      children: [{
        path: 'direct',
        component: MyAgentStore_direct
      }, {
        path: 'indirect',
        component: MyAgentStore_indirect
      }]
    }, {
      path: 'agentQuota',
      component: AgentQuota
    }, {
      path: 'agentOpen',
      component: AgentOpen
    }]
  }]
})
