import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import {
  Style,
  Loading,
  Toast,
  Scroll,
  Slide
} from 'cube-ui'
import Util from './util.js'
import 'common/less/index.less'

Vue.use(Style)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Scroll)
Vue.use(Slide)

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
