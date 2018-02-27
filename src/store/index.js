import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 存储状态值
  state: {
    userData: {},
    onload: false,
    options: {
      pullUpLoad: {
        threshold: 0
      }
    },
    access_token: null
  },
  mutations: {
    setData(state, data) {
      state.userData = data
    },
    onload(state, data) {
      state.onload = data
    },
    access_token(state, data) {
      state.access_token = data
    },
  },
  // actions用于处理异步事件，最后还是需要提交mutations来改变state
  actions: {
    // 这里使用context来提交mutations
    setData(context, n) {
      context.commit('setData', n)
    },
    onload(context, n) {
      context.commit('onload', n)
    },
    access_token(context, n) {
      context.commit('access_token', n)
    }
  },
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {
    getUserData(state) {
      return state.userData
    },
    getOptions(state) {
      return state.options
    }
  }
})

export default store
