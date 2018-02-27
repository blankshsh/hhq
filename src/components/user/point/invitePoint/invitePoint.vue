<template>
  <transition name="slide">
    <div class="graybox invitePointbox">
      <m-header :title="title" v-on:back="_back('user/point')"></m-header>
      <div class="m-content">
        <ul style="background:#fff">
          <li>
            <p>推荐积分</p>
            <span>{{headerData}}</span>
          </li>
          <li class="hasNext" @click="nav($event)" v-for="item in navData" :data-url="'/user/point/invitePoint/'+item.url">
            <p>{{item.text}}</p>
          </li>
          <div class="info">
            <p>说明：被推荐客户累计消费满500元，推荐奖励50积分被激活，可用于消费。未激活积分不能用于消费。</p>
          </div>
          <router-view></router-view>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { navBack } from 'api/hhq'
import { point_invite } from 'api/point'
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '推荐积分',
      navData: [{
        text: '已激活积分',
        url: 'activated'
      }, {
        text: '未激活积分',
        url: 'unactivated'
      }],
      headerData: '合计：0.00 分'
    }
  },
  created() {
    // 创建实例
    navBack(this)
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
    getData: function() {
      var that = this
      var $data = { page: 1, count: that.count }
      point_invite(that, $data)
    },
    nav: function(e) {
      console.log(e.currentTarget.getAttribute('data-url'))
      var $url = e.currentTarget.getAttribute('data-url')
      if (!$url) {
        return
      }
      this.$router.push({
        path: $url
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
.invitePointbox {
  ul {
    li {
      height: 100/@rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30/@rem;
      box-sizing: border-box;
      border-bottom: 2/@rem solid #eee;
      p,
      span {
        font-size: 32/@rem;
        color: #333;
        line-height: 1.5;
        display: block;
      }
    }
    .hasNext {
      position: relative;
      &:after {
        content: "\e60f";
        display: block;
        font-family: "iconfont" !important;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        font-size: 30/@rem;
        right: 40/@rem;
        top: 50%;
        transform: translate(0, -50%);
        display: flex;
        align-items: center;
        color: #333;
      }
    }
  }


  .info {
    position: fixed;
    width: 100%;
    padding: 20/@rem 30/@rem;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #ffb80d;
    p {
      color: #fff;
      display: block;
      box-sizing: border-box;
      font-size: 13*2/@rem;
      line-height: 1.5;
    }
  }
}

</style>
