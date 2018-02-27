<template>
  <transition name="slide">
    <div class="graybox">
      <m-header :title="title" v-on:back="_back('user/point/invitePoint')"></m-header>
      <div class="m-content">
        <point ref="pointbox" :resData="resData" :th="th" :headerData="headerData" :dataKey="dataKey" :hasMore="hasMore" v-on:scrollType="pullUp">
        </point>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { navBack, getTop } from 'api/hhq'
import { point_invite_active } from 'api/point'
import Point from 'base/point/point'
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '已激活积分',
      th: ['账号', '积分', '时间'],
      resData: [],
      dataKey: ['user_name', 'user_points', 'times'],
      options: {},
      headerData: '合计：0.00 分',
      count: 20,
      hasMore: true,
      onloading: false,
      offsetTop: ''
    }
  },
  created() {
    navBack(this)
  },
  mounted: function() {},
  methods: {
    // 函数
    getData: function() {
      var that = this
      var $data = { page: 1, count: that.count }
      point_invite_active(that, $data).then((res) => {
        that.onloading = false
        that.$refs.pointbox.refresh()
      })
    },
    pullUp: function(data) {
      var that = this
      if (!that.hasMore || that.onloading) {
        that.$refs.pointbox.refresh()
        return
      }
      that.onloading = true
      setTimeout(function() {
        that.getData()
      }, 1000)
    }
  },
  components: {
    Point,
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
@import "~common/less/type_point.less";

</style>
