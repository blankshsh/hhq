<template>
  <transition name="slide">
    <div class="myCustomer_direct graybox">
      <m-header :title="title" v-on:back="_back('user/myCustomer')"></m-header>
      <div class="m-content">
        <div class="_tab">
          <div class="tabbtn" data-id="0" @click="tabChange($event)">已绑定手机客户</div>
          <div class="tabbtn" data-id="1" @click="tabChange($event)">未绑定手机客户</div>
          <div class="active" :style="active"></div>
        </div>
        <div class="slidebox" :style="slidebox" id="slidebox">
          <cube-slide @change="changePage" :initialIndex='initialIndex' :auto-play="false" :loop="false" style="width:100%;height:100%" ref="slide">
            <cube-slide-item class="cubwrp">
              <div class="scrollwrp">
                <div class="tablebox" id='table_header'>
                  <div>时间</div>
                  <div>账号</div>
                  <div>姓名</div>
                </div>
                <cube-scroll :options="options" @pulling-up="scroll01PullingUp" ref="scroll01" class="scroll_item" :style="scrollbox">
                  <div v-for="item in directData" class="tablebox">
                    <div>{{item.times}}</div>
                    <div>{{item.user_name}}</div>
                    <div v-if="item.true_name">{{item.true_name}}</div>
                    <div v-else>--</div>
                  </div>
                  <div class="tablebox" :class="{'hide' : directHasMore}">
                    <div>没有更多数据了</div>
                  </div>
                </cube-scroll>
              </div>
            </cube-slide-item>
            <cube-slide-item class="cubwrp">
              <div class="scrollwrp">
                <div class="tablebox hasPic">
                  <div>时间</div>
                  <div>账号</div>
                  <div>头像</div>
                </div>
                <cube-scroll :options="options" @pulling-up="scroll02PullingUp" ref="scroll02" class="scroll_item" :style="scrollbox">
                  <div v-for="item in unbindData" class="tablebox hasPic">
                    <div>{{item.times}}</div>
                    <div v-if="item.nickName">
                      <p>{{item.nickName}}</p>
                    </div>
                    <div v-else>--</div>
                    <div v-if="item.pic">
                      <img :src="item.pic" alt="">
                    </div>
                    <div v-else>--</div>
                  </div>
                  <div class="tablebox" :class="{'hide' : unbindHasMore}">
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
import { bind_direct, unbind } from 'api/myCustomer'
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '直接客户',
      initialIndex: 0,
      slideIndex: 0,
      slidebox: '',
      scrollbox: '',
      active: 'left:0%',
      directData: [],
      directCount: 20,
      directHasMore: false,

      unbindData: [],
      unbindCount: 20,
      unbindHasMore: false,
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
      console.log($el.offsetTop)
      var $style = 'position: absolute;height: auto;bottom: 0;width: 7.5rem;top:' + ($el.offsetTop + 4) + 'px'
      this.slidebox = $style
      this.getinnerTop()
    },
    getinnerTop: function() {
      var $el = document.querySelector('#table_header')
      console.log($el.offsetHeight)
      var $style = 'position: absolute;height: auto;bottom: 0;width: 7.5rem;top:' + ($el.offsetHeight + 2) + 'px'
      this.scrollbox = $style
    },
    getData: function() {
      var that = this
      var $direct = {
        page: 1,
        count: that.directCount
      }
      var $unbind = {
        page: 1,
        count: that.unbindCount
      }
      Promise.all([bind_direct(that, $direct), unbind(that, $unbind)]).then(results => {
        console.log(results)
      }).catch((reason) => {
        console.log(reason)
      })
    },
    changePage: function(e) {
      this.initialIndex = e
      this.active = 'left:' + e * 50 + '%'
    },
    tabChange: function(e) {
      var $id = parseInt(e.currentTarget.getAttribute('data-id')) || 0
      this.initialIndex = $id
      this.active = 'left:' + $id * 50 + '%'
    },
    scroll01PullingUp() {
      console.log('scroll01 down')
      var that = this
      if (!that.directHasMore || that.onloading) {
        that.$refs.scroll01.forceUpdate()
        return
      }
      that.onloading = true
      setTimeout(function() {
        var $direct = {
          page: 1,
          count: that.directCount
        }
        bind_direct(that, $direct).then((res) => {
          that.$refs.scroll01.forceUpdate()
          that.onloading = false
        })
      }, 1000)
    },
    scroll02PullingUp: function() {
      console.log('scroll02 down')
      var that = this
      if (!that.unbindHasMore || that.onloading) {
        that.$refs.scroll02.forceUpdate()
        return
      }
      setTimeout(function() {
        var $unbind = {
          page: 1,
          count: that.unbindCount
        }
        unbind(that, $unbind).then((res) => {
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

.myCustomer_direct {
  ._tab {
    display: flex;
    width: 100%;
    height: 90/@rem;
    background: #fff;
    position: relative;
    .tabbtn {
      width: 50%;
      font-size: 30/@rem;
      line-height: 1.2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      display: block;
      position: absolute;
      width: 50%;
      height: 6/@rem;
      bottom: 0;
      background: #ffb80d;
      transition: all .2s ease-in-out;
    }
  }

  .tablebox {
    background: #fff;
    margin-bottom: 2/@rem;
    display: flex;
    height: 80/@rem;
    >div {
      font-size: 28/@rem;
      line-height: 1.2;
      box-sizing: border-box;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10/@rem;
      &:nth-child(2) {
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis
        }
      }
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        background-size: 100% 100%
      }
    }
  }
  .hasPic {
    >div {
      width: 100/3%;
      &:nth-child(2) {
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis
        }
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
