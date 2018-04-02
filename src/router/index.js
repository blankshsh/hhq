import Vue from 'vue'
import Router from 'vue-router'

const User = () =>
  import ('components/user/user')

const LuckBean = () =>
  import ('components/user/luckBean/luckBean')

const Profit = () =>
  import ('components/user/profit/profit')

const Point = () =>
  import ('components/user/point/point')
const Point_available = () =>
  import ('components/user/point/available/available')
const Point_luckPoint = () =>
  import ('components/user/point/luckPoint/luckPoint')
const Point_invite = () =>
  import ('components/user/point/invitePoint/invitePoint')
const Point_invite_active = () =>
  import ('components/user/point/invitePoint/activated/activated')
const Point_invite_unactive = () =>
  import ('components/user/point/invitePoint/unactivated/unactivated')
const Point_pointit = () =>
  import ('components/user/point/pointin/pointin')
const Point_consumer = () =>
  import ('components/user/point/consumer/consumer')

const MyCustomer = () =>
  import ('components/user/myCustomer/myCustomer')
const MyCustomer_direct = () =>
  import ('components/user/myCustomer/direct/direct')
const MyCustomer_indirect = () =>
  import ('components/user/myCustomer/indirect/indirect')

const StoreApply = () =>
  import ('components/user/storeApply/storeApply')
const StoreApply_card = () =>
  import ('components/user/storeApply/card/card')
const StoreApply_profile = () =>
  import ('components/user/storeApply/profile/profile')
const StoreApply_storeData = () =>
  import ('components/user/storeApply/storeData/storeData')
const StoreApply_storeInfo = () =>
  import ('components/user/storeApply/storeInfo/storeInfo')

const MyAgent = () =>
  import ('components/user/myAgent/myAgent')
const AgentDetail = () =>
  import ('components/user/myAgent/agentDetail/agentDetail')

const MyAgentStore = () =>
  import ('components/user/myAgentStore/myAgentStore')
const MyAgentStore_direct = () =>
  import ('components/user/myAgentStore/direct/direct')
const MyAgentStore_indirect = () =>
  import ('components/user/myAgentStore/indirect/indirect')

const AgentQuota = () =>
  import ('components/user/agentQuota/agentQuota')
const AgentOpen = () =>
  import ('components/user/agentOpen/agentOpen')

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
