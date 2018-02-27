import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import Cube from 'cube-ui'
import Util from './util.js'
import 'common/less/index.less'

Vue.use(Cube)
fastclick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Util)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
