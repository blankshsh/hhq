<template>
  <transition name="slide">
    <div class="pointwrp graybox">
      <m-header :title="title" v-on:back="_back('user')"></m-header>
      <div class="m-content">
        <div class="pointbox">
          <div>
            <i class="iconfont icon-keyongjifen" style="color: #5dc93b"></i>
            <p>可用积分</p>
            <p>{{headerData.lucky_points}}</p>
          </div>
          <div>
            <i class="iconfont icon-yixiaofeijifen" style="color: #ffb80d"></i>
            <p>已消费积分</p>
            <p>{{headerData.points_cost}}</p>
          </div>
          <div>
            <i class="iconfont icon-keyongjifen" style="color: #5e5e5e"></i>
            <p>未激活积分</p>
            <p>{{headerData.points_unactive}}</p>
          </div>
          <div>
            <i class="iconfont icon-heji" style="color: #ffa22a"></i>
            <p>合计</p>
            <p>{{headerData.points_total}}</p>
          </div>
        </div>
        <div class="pointList">
          <div @click="nav($event)" v-for="item in pointList" :data-id="'/user/point/'+item.url" class="list">
            <div class="item">
              <i class="iconfont" :class="'icon-'+item.class" :style="'color:'+item.color"></i>
              <p>{{item.title}}</p>
            </div>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { navBack } from 'api/hhq'
import { pointData } from 'api/point'
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '积分',
      headerData: {
        lucky_points: '0.00',
        points_cost: '0.00',
        points_unactive: '0.00',
        points_total: '0.00',
      },
      pointList: [{
        title: '可用积分',
        class: 'keyongjifen',
        color: '#5dc93b',
        url: 'available'
      }, {
        title: '幸运积分',
        class: 'xingyunjifen',
        color: '#ff1111',
        url: 'luckPoint'
      }, {
        title: '推荐积分',
        class: 'tuijianjifen',
        color: '#871251',
        url: 'invitePoint'
      }, {
        title: '受赠积分',
        class: 'shouzengjifen',
        color: '#f84701',
        url: 'pointin'
      }, {
        title: '已消费积分',
        color: '#ffb80d',
        class: 'yixiaofeijifen',
        url: 'consumer'
      }]
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
      var that = this
      pointData(that)
    },
    nav: function(event) {
      console.log(event.currentTarget.getAttribute('data-id'))
      var $id = event.currentTarget.getAttribute('data-id')
      if (!$id) {
        alert('开发中')
        return
      }
      this.$router.push({
        path: $id
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
.pointbox {
  display: flex;
  height: 180/@rem;
  background: #fff;
  >div {
    box-sizing: border-box;
    width: 100/4%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    i {
      font-size: 60/@rem;
      margin-bottom: 10/@rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      text-align: center;
      font-size: 26/@rem;
      line-height: 1.2;
      box-sizing: border-box;
      &:last-child {
        font-size: 24/@rem;
      }
    }
  }
}

.pointList {
  margin-top: 10/@rem;
  color: #333;
  .list {
    height: 90/@rem;
    padding: 0 30/@rem;
    box-sizing: border-box;
    margin-bottom: 10/@rem;
    position: relative;
    background: #fff;
    .item {
      width: 100%;
      height: 100%;
      padding-right: 150/@rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      icon {
        font-size: 40/@rem;
        display: flex;
        align-items: center;
      }
      p {
        margin-left: 20/@rem;
        display: block;
        font-size: 16*2/@rem;
        line-height: 1.5;
        color: #000;
      }
    }
    >i {
      font-size: 15*2/@rem;
      position: absolute;
      right: 20*2/@rem;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
    }
  }
}

</style>
