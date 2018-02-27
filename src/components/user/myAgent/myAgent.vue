<template>
  <div class="whitebox myAgentbox">
    <m-header :title="title" v-on:back="_back('user')"></m-header>
    <div class="m-content">
      <div class="tabBar">
        <div class="btn" :class="{active : initialIndex === index}" v-for="(item, index) in tabBar" @click="tabChange(index)" :key='index'>
          <p>{{item.title}}</p>
          <p>{{item.num}}家</p>
        </div>
      </div>
      <div id="slidebox" class="slidebox" :style="slidebox">
        <cube-slide @change="changePage" :initialIndex='initialIndex' :auto-play="false" :loop="false" style="width:100%;height:100%" ref="slide">
          <cube-slide-item class="cubwrp" v-for="(item,index) in listData" :key='index'>
            <div class="item" :class="{hasnext : inneritem.hasnext}" v-for="inneritem in item" @click="nav(inneritem)">
              <p>{{inneritem.text}}：</p>
              <p>{{inneritem.num}} 家</p>
            </div>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'
import { navBack, reSize } from 'api/hhq'
import { myAgent } from 'api/myAgent'
export default {
  data() {
    return {
      title: '我的代理',
      initialIndex: 0,
      slidebox: '',
      tabIndex: 0,
      tabBar: [{
        title: '金砖',
        name: 'gold',
        num: '0'
      }, {
        title: '银元',
        name: 'silver',
        num: '0'
      }, {
        title: '铜币',
        name: 'copper',
        num: '0'
      }],
      listData: [
        [{
          text: '直接金砖',
          name: 'direct_gold',
          num: 0,
          hasnext: true
        }, {
          text: '间接金砖',
          num: 0,
          name: 'indirect_gold'
        }],
        [{
          text: '直接银元',
          name: 'direct_silver',
          num: 0,
          hasnext: true
        }, {
          text: '间接银元',
          num: 0,
          name: 'indirect_silver'
        }],
        [{
          text: '直接铜币',
          name: 'direct_copper',
          num: 0,
          hasnext: true
        }, {
          text: '间接铜币',
          num: 0,
          name: 'indirect_copper'
        }]
      ]
    }
  },
  created() {
    // 创建实例
    navBack(this)
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
    var that = this
    that.getTop()
    window.addEventListener('resize', function() {
      that.slidebox = ''
      setTimeout(() => {
        that.getTop()
        reSize(that)
      }, 100)
    })
  },
  methods: {
    // 函数
    getData: function() {
      myAgent(this)
    },
    tabChange: function(index) {
      console.log(index)
    },
    getTop: function() {
      var $el = document.querySelector('#slidebox')
      var $style = 'position: absolute;height: auto;bottom: 0;width: 7.5rem;top:' + ($el.offsetTop + 2) + 'px'
      this.slidebox = $style
    },
    changePage: function(e) {
      this.initialIndex = e
    },
    tabChange: function(e) {
      this.initialIndex = e
    },
    nav: function(item) {
      if (item.hasnext) {
        this.$router.push({ path: '/user/myAgent/agentDetail?type=' + item.name })
      }
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.myAgentbox {
  background: #eee;
  .tabBar {
    height: 120/@rem;
    display: flex;
    margin-bottom: 2/@rem;
    .btn {
      background: #fff;
      margin-right: 2/@rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:last-child {
        margin-right: 0
      }
      p {
        font-size: 30/@rem;
        line-height: 1.5;
        display: block;
        color: #333;
      }
    }
    .active {
      background: #ffb80d;
      p {
        color: #fff;
      }
    }
  }

  .slidebox .item {
    height: 80/@rem;
    margin-bottom: 2/@rem;
    background: #fff;
    padding: 0 30/@rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    p {
      font-size: 28/@rem;
      display: block;
      line-height: 1.5;
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
      transform: translate(0, -50%);
      color: #333;
      font-size: 28/@rem;
    }
  }

  .cube-slide-group {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
  }

  .cubwrp {
    position: relative;
  }
  .cube-slide-dots {
    display: none;
  }
}

</style>
