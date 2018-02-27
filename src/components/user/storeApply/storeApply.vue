<template>
  <transition name="slide">
    <div class="graybox storeApplybox">
      <m-header :title="title" v-on:back="_back('user')"></m-header>
      <div class="m-content">
        <div @click="nav(item)" v-for="item in trItems" class="item hasNext" hover-class="item_hover" v-text="item.title"></div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '线下商户入驻',
      trItems: [{
        title: '资质认证',
        url: 'storeData'
      }, {
        title: '收款信息',
        url: 'card'
      }, {
        title: '商户信息',
        url: 'storeInfo'
      }, {
        title: '商户简介',
        url: 'profile'
      }]
    }
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
    nav: function(item) {
      this.$router.push({
        path: '/user/storeApply/' + item.url
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
.storeApplybox {
  .item {
    height: 80/@rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin-bottom: 2/@rem;
    padding: 0 50/@rem 0 30/@rem;
  }
  .hasNext {
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
      right: 30/@rem;
      top: 50%;
      transform: translate(0, -50%);
      color: #333;
    }
  }
}

</style>
