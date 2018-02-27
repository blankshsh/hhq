<template>
  <transition name="slide">
    <div class="wrp">
      <!-- 导航栏 -->
      <div class="header">
        <!-- <i class="iconfont icon-shezhi setting" id="setting"></i>
        <div>
          <div class="iconfont icon-xinxi setting message" id="msg">
            <i>{{msgData.sum}}</i>
          </div>
          <div class="iconfont icon-hhq_wode_kefu setting" id='kefu'></div>
        </div> -->
        <div class="text">吃喝玩乐能省钱</div>
      </div>
      <div class="content">
        <cube-scroll ref="scroll" :options="options" @pulling-down="_login()" style="height: 100%;overflow: hidden;">
          <!-- 用户信息 -->
          <div class="userinfo">
            <img class="useravatar" :src="data.userInfo.avatarUrl"></img>
            <div class="usertext">
              <p class="username" v-text='data.userInfo.nickName'></p>
              <div class="userlevel" id="level" bindtap='nav'>
                <p style="color:#1989fa">级别：</p>
                <p v-text="user.user.rank_name"></p>
              </div>
            </div>
            <div class="uplevel">
              <i class="iconfont icon-hhq_wode_huojian uplevelicon"></i>
              <p>马上升级</p>
            </div>
            <!-- <picker bindchange="upGrade" value="{{uplevelIndex}}" range="{{uplevel}}" range-key="text">
          <p>{{uplevelIndex}}</p>
        </picker> -->
          </div>
          <div class="levelInfo">
            <div class="item" bindtap="userLevel" id="user">
              <div>
                <p style="color:#1989fa">客户星级：</p>
                <i class="iconfont" v-for="(item,index) in [1,2,3]" :class="{'icon-xianshixingji' : (user.user.user_rank >= item),'icon-weixianshixingji' : (user.user.user_rank < item)}"></i>
              </div>
              <p>当日可用：{{levelData.UserCost}}</p>
            </div>
            <div class="item" id="seller">
              <div>
                <p style="color:#1989fa">商户星级：</p>
                <i class="iconfont" v-for="(item,index) in [1,2,3,4,5]" :class="{'icon-xianshixingji' : (user.user.is_seller >= item),'icon-weixianshixingji' : (user.user.is_seller < item)}"></i>
              </div>
              <p>当日可收：{{levelData.sellerCost}}</p>
            </div>
          </div>
          <!-- 主模块 -->
          <div class="category">
            <div @click="nav(item)" :data-id="item.url" :data-type="item.type" class="item" v-for="(item, index) in data.category">
              <i class="iconfont" :class="item.class" :style="{color:item.color}"></i>
              <p v-text="item.text"></p>
              <p v-if="item.point" v-text="item.point"></p>
            </div>
          </div>
          <!-- 商户功能 -->
          <div class="blockbox myitems">
            <div class="title">
              <p>商户功能</p>
            </div>
            <div class="items">
              <div @click="nav(item)" class="item" v-for="item in data.storeItems" :data-id="item.url" :data-type="item.type">
                <i class="iconfont" :class="item.class" :style="{color:item.color}"></i>
                <div class="textbox">
                  <p>{{item.text}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 代理功能 -->
          <div class="blockbox myitems">
            <div class="title">
              <p>代理/渠道商功能</p>
            </div>
            <div class="items">
              <div @click="nav(item)" class="item" v-for="item in data.agentItems" :data-id="item.url" :data-type="item.type">
                <i class="iconfont" :class="item.class" :style="{color:item.color}"></i>
                <div class="textbox">
                  <p>{{item.text}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>深圳会花钱科技有限公司</p>
          </div>
        </cube-scroll>
      </div>
      <div class="popup" v-if="data.singup">
        <div class="mask"></div>
        <div class="popup_content">
          <div class="popup_header">
            <img src="http://out2ei6gm.bkt.clouddn.com/popup_header.png"></img>
          </div>
          <div class="infobox">
            <div class="text">恭喜您获得10积分注册奖励，积分可以立即当现金按1:1等值消费</div>
          </div>
          <div class="popup_footer">
            <div class="navbtn" bindtap="popup_close">确认</div>
          </div>
          <icon class="popup_close" bindtap="popup_close"></icon>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
import userData from './userData'
import { login, mobile, sdxiu } from 'api/hhq'
import { getlevel, getMsg, getAuthor, getPoint, getAgentPrice, reSize } from 'api/user'

export default {
  data() {
    return {
      hasMsg: 0,
      data: userData,
      user: {
        user: {
          user_rank: 0,
          is_seller: 0
        }
      },
      levelData: {
        UserCost: '0.00',
        sellerCost: '0.00'
      },
      msgData: {
        sum: 0
      },
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40
        }
      }
    }
  },
  created() {
    this._login()
    var that = this
  },
  activated: function() {
    // 只对vue-router的路由生效
  },
  mounted() {},
  methods: {
    _login: function() {
      console.log('do logoin')
      var that = this
      console.log(this)
      that._loading('数据加载中', that)
      login().then((res) => {
        console.log(res)
        that.user = res.data
        if (that.user.user.headimg) {
          that.data.userInfo.avatarUrl = 'https://hhq.91coolpay.com/' + that.user.user.headimg
        }
        that.data.userInfo.nickName = mobile(that.user.user.name)
        that.$store.commit('setData', res.data)
        that.$store.commit('onload', true)
        Promise.all([getlevel(that), getMsg(that), getAuthor(that), getPoint(that), getAgentPrice(that)]).then(results => {
          console.log(results)
          that._setData()
          that.$refs.scroll.refresh()
          that.$refs.scroll.forceUpdate()
          that._hide()
          // that._Modal(that,'加载完毕')
        }).catch((reason) => {
          console.log(reason)
        })
      })
    },
    _showData: function() {
      console.log(userData)
    },
    _setData() {
      var that = this
      var $data = that.data
      $data.category[0].point = that.user.user.lucky_bean
      $data.category[1].point = that.user.user.lucky_points
      that.data = $data
    },
    nav: function(item) {
      var that = this
      var $id = item.url
      if (!$id) {
        that._Toast('loading', '开发中')
        return
      }
      if ($id === 'QRcode') {
        var $type = item.type
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx734c6c44a547bc95&redirect_uri=https://fenxiao.91coolpay.com/applet.php&response_type=code&scope=snsapi_base&state=' + that.user.user.name + $type + '#wechat_redirect'
        return
      }
      this.$router.push({ path: '/user/' + $id })
    }
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";

.footer {
  text-align: center;
  p {
    font-size: 28/@rem;
    color: #b3b2b2;
    line-height: 100/@rem;
  }
}

@headerbg: #ffb80d;
@headercolor: #fff;
@bodybg: #efeff4;
@divbg: #fff;
@uplevelbg: #fd3132;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 750/@rem;
  height: 88/@rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20/@rem;
  background: @headerbg;
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  z-index: 9;
  .iconfont {
    z-index: 99;
  }
  >div {
    display: flex;
    align-items: center;
    z-index: 99;
  }
  .setting {
    font-size: 28*2/@rem;
  }
  .message {
    font-size: 24*2/@rem;
    margin-top: 6/@rem;
    position: relative;
    margin-right: 20/@rem;
    i {
      background: red;
      color: #fff;
      font-size: 12px;
      line-height: 1.2;
      padding: 4/@rem 8/@rem;
      position: absolute;
      border-radius: 50%; // right: -6/@rem;
      right: 6/@rem;
      top: -8/@rem;
      transform: translate(50%, 0);
    }
  }
  .text {
    position: absolute;
    justify-content: center;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    line-height: 1.5;
    font-size: 28/@rem;
    z-index: 1;
  }
}

.colorbg {
  background: @headerbg;
  width: 100%;
  height: 100+88/@rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.content {
  position: absolute;
  top: 88/@rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 750/@rem;
  margin: 0 auto;
  overflow: hidden;
  .userinfo {
    background: @divbg;
    padding: 20/@rem 0 10/@rem 30/@rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    .useravatar {
      width: 130/@rem;
      height: 130/@rem;
      border-radius: 50%;
      background-size: 100% 100%;
    }
    .usertext {
      display: flex;
      flex-direction: column;
      color: #666;
      font-size: 36/@rem;
      margin-left: 20/@rem;
      width: 300/@rem;
      .username {
        margin-bottom: 20/@rem;
        font-size: 28/@rem;
        line-height: 40/@rem;
      }
      .userlevel {
        height: 50/@rem;
        display: flex;
        align-items: center;
        width: 100%;
        i {
          margin-right: 10/@rem;
          font-size: 30/@rem;
          width: 35/@rem;
          height: 40/@rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffb80d;
        }
        p {
          font-size: 28/@rem;
          line-height: 40/@rem;
        }
      }
    }
    .uplevel {
      height: 56/@rem;
      width: 170/@rem;
      background: @uplevelbg;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      color: #fff;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      border-top-left-radius: 24/@rem;
      border-bottom-left-radius: 24/@rem;
      .uplevelicon {
        font-size: 22*2/@rem;
        transform: rotate(-45deg);
      }
      p {
        display: block;
        font-size: 13*2/@rem;
        line-height: 1.5;
      }
    }
    picker {
      height: 56/@rem;
      width: 170/@rem;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 9999;
      opacity: 0;
      background: transparent;
      p {
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .levelInfo {
    background: #fff;
    padding: 0 15/@rem 10/@rem 30/@rem;
    div {
      display: flex;
      align-items: center;
      min-width: 350/@rem;
    }
    .item {
      height: 50/@rem;
      display: flex;
      align-items: center;
      width: 100%;
      i {
        // margin-right: 5/@rem;
        font-size: 30/@rem;
        width: 35/@rem;
        height: 40/@rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffb80d;
      }
      p {
        font-size: 28/@rem;
        line-height: 40/@rem;
      }
    }
  }
  .category {
    display: flex;
    flex-wrap: wrap;
    background: @divbg;
    border-top: 2/@rem solid #ddd;
    border-bottom: 2/@rem solid #ddd; //padding: 15/@rem 0 10/@rem; // border-top: 2/@rem solid #d4d4d4;
    .item {
      height: 180/@rem;
      width: 100/3%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-top: 2/@rem solid #ddd;
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        border-top: 0;
      }
      &:nth-child(3n-1),
      &:nth-child(3n-2) {
        border-right: 2/@rem solid #ddd;
      }
      .iconfont {
        font-size: 60/@rem;
      }
      p {
        font-size: 12*2/@rem;
        color: #333;
        margin-top: 6/@rem;
        height: 30/@rem;
        line-height: 30/@rem;
      }
    }
  }
  .blockbox {
    margin-top: 20/@rem;
    box-sizing: border-box;
    background: @divbg;
    .title {
      box-sizing: border-box;
      padding: 12*2/@rem 15*2/@rem;
      display: flex;
      justify-content: space-between;
      algin-items: center;
      font-size: 14*2/@rem;
      border-bottom: 2/@rem solid #ddd;
      >p {
        color: #000;
      }
      .allorder {
        color: #999;
        display: flex;
        &:after {
          content: '>';
          display: block;
          margin-left: 10/@rem;
        }
      }
    }
  }
  .myitems {
    .items {
      display: flex;
      flex-wrap: wrap; // border-bottom: 2/@rem solid #ddd;
      .item {
        position: relative;
        height: 180/@rem;
        width: 100/3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 2/@rem solid #ddd;
        box-sizing: border-box; // border-top: 2/@rem solid #ddd;
        border-bottom: 2/@rem solid #ddd;
        &:nth-child(3n) {
          border-right: 0
        } // &:last-child {
        //   border-top: 0
        // }
        i {
          font-size: 60/@rem;
        }
        p {
          font-size: 12*2/@rem;
          color: #333;
          margin-top: 6/@rem;
        }
      }
    }
  }
  .myset {
    .item {
      border-top: 2/@rem solid #ddd;
      margin-top: -2/@rem;
    }
  }
}

.sellerApply {
  height: 100/@rem;
  background: #fff;
  margin-top: 20/@rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30/@rem;
}

.popup {
  position: fixed;
  z-index: 99999;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .popup_content {
    width: 470/@rem;
    position: relative;
    .popup_header {
      width: 100%;
      height: 215/@rem;
      border-top-left-radius: 16/@rem;
      border-top-right-radius: 16/@rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .infobox {
      padding: 40/@rem;
      box-sizing: border-box;
      background: #fff;
      .text {
        font-size: 24/@rem;
        color: #666;
        line-height: 1.3; // display: flex;
        p {
          color: #f16359
        }
      }
    }
    .popup_footer {
      background: #eee;
      padding-top: 2/@rem;
      display: flex;
      border-bottom-left-radius: 16/@rem;
      border-bottom-right-radius: 16/@rem;
      overflow: hidden;
      >div {
        flex: 1;
        margin-right: 2/@rem;
        height: 85/@rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32/@rem;
        background: #fff;
        &:last-child {
          margin-right: 0;
        }
      }
      .navbtn {
        color: #333;
      }
      .footer_close {
        color: #999;
      }
    }
    .popup_close {
      display: block;
      position: absolute;
      width: 50/@rem;
      height: 50/@rem;
      background: url('http://out2ei6gm.bkt.clouddn.com/lamp.png') 100% 100% no-repeat;
      background-size: 100% 100%;
      top: -10/@rem;
      right: -10/@rem;
    }
  }
}

</style>
