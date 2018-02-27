<template>
  <div class="graybox myAgentStorebox">
    <m-header :title="title" v-on:back="_back('user')"></m-header>
    <div class="m-content">
      <div class="ul">
        <div class="li">
          <p>合计：{{sum}} 家</p>
        </div>
        <div @click="nav(item)" class="li hasnext" v-for="item in listData">
          <p>{{item.text}}</p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'
import { navBack } from 'api/hhq'
import { myAgentStore } from 'api/myAgentStore'

export default {
  data() {
    return {
      title: '我的代理商户',
      sum: '0',
      listData: [{
        text: '直接发展',
        url: 'direct'
      }, {
        text: '间接发展',
        url: 'indirect'
      }],
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
    getData: function() {
      myAgentStore().then(res => {
        console.log(res)
        if (res.status.succeed === 1) {
          this.sum = res.data.total
        }
      })
    },
    nav: function(item) {
      this.$router.push({ path: '/user/myAgentStore/' + item.url })
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.myAgentStorebox {
  .li {
    height: 80/@rem;
    background: #fff;
    padding: 0 30/@rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 2/@rem solid #eee;
    p {
      font-size: 28/@rem;
      display: block;
      line-height: 1.5
    }
  }

  .hasnext {
    position: relative;
    &:after {
      content: "\e60f";
      display: block;
      font-family: iconfont!important;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      right: 25/@rem;
      top: 50%;
      -webkit-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      transform: translate(0, -50%);
      color: #333;
      font-size: 28/@rem
    }
  }
}

</style>
