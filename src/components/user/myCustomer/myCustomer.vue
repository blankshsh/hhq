<template>
  <transition name="slide">
    <div class="myCustomer graybox">
      <m-header :title="title" v-on:back="_back('user')"></m-header>
      <div class="m-content">
        <div @click='nav("direct")' class="item hasnext" hover-class="item_hover">直接客户：{{resData.direct}}</div>
        <div @click='nav("indirect")' class="item hasnext" hover-class="item_hover">间接客户：{{resData.indirect}}</div>
        <div class="item">合计客户：{{resData.all_total}}</div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'
import { navBack } from 'api/hhq'
import { myCustomer } from 'api/myCustomer'

export default {
  data() {
    return {
      title: '我的客户',
      resData: {}
    }
  },
  created() {
    navBack(this)
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
    getData: function() {
      myCustomer(this)
    },
    nav: function(url) {
      this.$router.push({
        path: '/user/myCustomer/' + url
      })
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.myCustomer {
  .item {
    background: #fff;
    margin-bottom: 2/@rem;
    height: 80/@rem;
    display: flex;
    align-items: center;
    font-size: 32/@rem;
    color: #333;
    padding: 0 30/@rem;
    box-sizing: border-box;
  }
  .hasnext {
    position: relative;
    &:after {
      font-family: 'iconfont' !important;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      content: "\e60f";
      display: block;
      position: absolute;
      font-size: 24/@rem;
      right: 25/@rem;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  .item_hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

</style>
