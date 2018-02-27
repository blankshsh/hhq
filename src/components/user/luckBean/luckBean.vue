<template>
  <transition name="slide">
    <div class="luckBean graybox">
      <m-header :title="title" v-on:back="_back('user')"></m-header>
      <div class="m-content">
        <div class="_header">
          <div class="item col">
            <i class="iconfont icon-hhq_wode_xingyundou" style="color:#42d0ff "></i>
            <div class="textbox">
              <p>当前幸运豆</p>
              <p>{{luckBean.current_beans}}</p>
            </div>
          </div>
          <div class="item col">
            <i class="iconfont icon-jifen" style="color:#ffb80d"></i>
            <div class="textbox">
              <p>已转幸运积分</p>
              <p>{{luckBean.trans_beans}}</p>
            </div>
          </div>
          <div class="item col">
            <i class="iconfont icon-hhq_wode_xingyundou" style="color:#42f559 "></i>
            <div class="textbox">
              <p>累计已得幸运豆</p>
              <p>{{luckBean.total_beans}}</p>
            </div>
          </div>
        </div>
        <div class="_tab">
          <div class="tabbtn" :class="{active : initialIndex === 0 }" data-id="0" @click="tabChange($event)">已得幸运豆</div>
          <div class="tabbtn" :class="{active : initialIndex === 1 }" data-id="1" @click="tabChange($event)">已转幸运积分</div>
        </div>
        <div class="slidebox" :style="slidebox" id="slidebox">
          <cube-slide @change="changePage" :initialIndex='initialIndex' :auto-play="false" :loop="false" style="width:100%;height:100%" ref="slide">
            <cube-slide-item class="cubwrp">
              <div class="scrollwrp">
                <div class="tablebox">
                  <div>时间</div>
                  <div>消费金额</div>
                  <div>幸运豆</div>
                </div>
                <cube-scroll :options="options" @pulling-up="scroll01PullingUp" ref="scroll01" class="item" style="height:100%;overflow:hidden">
                  <div v-for="item in onwalletData" class="tablebox">
                    <div>{{item.times}}</div>
                    <div>{{item.nickName}}</div>
                    <div>{{item.id}}</div>
                  </div>
                  <div class="tablebox" :class="{'hide' : onwalletHasMore}">
                    <div>没有更多数据了</div>
                  </div>
                </cube-scroll>
              </div>
            </cube-slide-item>
            <cube-slide-item class="cubwrp">
              <div class="scrollwrp">
                <div class="tablebox">
                  <div>时间</div>
                  <div>消费金额</div>
                  <div>幸运豆</div>
                </div>
                <cube-scroll :options="options" @pulling-up="scroll02PullingUp" ref="scroll02" class="item" style="height:100%;overflow:hidden">
                  <div v-for="item in usedData" class="tablebox">
                    <div>{{item.times}}</div>
                    <div>{{item.lucky_bean}}</div>
                    <div>+ {{item.lucky_bean}}</div>
                  </div>
                  <div class="tablebox" :class="{'hide' : onwalletHasMore}">
                    <div>没有更多数据了</div>
                  </div>
                </cube-scroll>
              </div>
            </cube-slide-item>
          </cube-slide>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { navBack, reSize } from 'api/hhq'
import { luckBeans, luckBeansUsed, luckBeansOnwallet } from 'api/luckBean'
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '幸运豆',
      luckBean: {
        trans_beans: '0.00',
        total_beans: '0.00',
        current_beans: '0.00'
      },
      initialIndex: 0,
      slideIndex: 0,
      slidebox: '',
      onwalletData: [],
      onwalletCount: 20,
      onwalletHasMore: false,
      usedData: [],
      usedCount: 20,
      usedHasMore: false,
      options: {
        pullUpLoad: {
          threshold: 0
        }
      },
      onloading: false
    }
  },
  created() {
    navBack(this)
  },
  mounted: function() {
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
    getTop: function() {
      var $el = document.querySelector('#slidebox')
      var $style = 'position: absolute;height: auto;bottom: 0;width: 7.5rem;top:' + $el.offsetTop + 'px'
      this.slidebox = $style
    },
    getData: function() {
      var that = this
      var $onWallet = {
        page: 1,
        count: that.onwalletCount
      }
      var $used = {
        page: 1,
        count: that.usedCount
      }
      Promise.all([luckBeans(that), luckBeansOnwallet(that, $onWallet), luckBeansUsed(that, $used)]).then(results => {
        console.log(results)
      }).catch((reason) => {
        console.log(reason)
      })
    },
    changePage: function(e) {
      this.initialIndex = e
    },
    tabChange: function(e) {
      var $id = parseInt(e.currentTarget.getAttribute('data-id')) || 0
      this.initialIndex = $id
    },
    scroll01PullingUp() {
      console.log('scroll01 down')
      var that = this
      if (!that.onwalletHasMore || that.onloading) {
        that.$refs.scroll01.forceUpdate()
        return
      }
      that.onloading = true
      setTimeout(function() {
        var $onWallet = {
          page: 1,
          count: that.onwalletCount
        }
        luckBeansOnwallet(that, $onWallet).then((res) => {
          that.$refs.scroll01.forceUpdate()
          that.onloading = false
        })
      }, 1000)
    },
    scroll02PullingUp: function() {
      var that = this
      if (!that.usedHasMore || that.onloading) {
        that.$refs.scroll02.forceUpdate()
        return
      }
      setTimeout(function() {
        var $used = {
          page: 1,
          count: that.usedCount
        }
        luckBeansUsed(that, $used).then((res) => {
          that.$refs.scroll02.forceUpdate()
        })
      }, 1000)
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";

.luckBean {
  .infobox {
    background: #fff;
    >div {
      height: 82/@rem;
      padding: 0 30/@rem;
      box-sizing: border-box;
      border-bottom: 2/@rem solid #eee;
      line-height: 80/@rem;
      font-size: 28/@rem;
      color: #333;
    }
  }

  ._header {
    height: 230/@rem;
    display: flex;
    background: #fff;
    .item {
      width: 100/3%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 60/@rem;
        margin-bottom: 10/@rem;
      }
      .textbox {
        p {
          display: block;
          text-align: center;
          font-size: 28/@rem;
          line-height: 1.5;
        }
      }
    }
  }

  ._tab {
    margin-top: 10/@rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    background: #fff;
    margin-bottom: 5/@rem;
    .tabbtn {
      height: 100/@rem;
      box-sizing: border-box;
      flex: 1;
      font-size: 32/@rem;
      text-align: center;
      line-height: 100/@rem;
      background: #fff;
    }
    .active {
      background: #ffb80d;
      border-bottom: #ffb80d;
      color: #fff;
    }
  }
  .tablebox {
    background: #fff;
    margin-bottom: 2/@rem;
    display: flex;
    height: 80/@rem;
    >div {
      font-size: 28/@rem;
      line-height: 80/@rem;
      box-sizing: border-box;
      flex: 1;
      text-align: center;
      &:nth-child(2) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
      }
    }
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

.scrollwrp {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0
}

.cube-slide-dots {
  display: none;
}

</style>
