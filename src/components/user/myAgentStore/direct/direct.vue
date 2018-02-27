<template>
  <transition name="slide">
    <div class="graybox">
      <m-header :title="title" v-on:back="_back('user/myAgentStore')"></m-header>
      <div class="m-content">
        <point ref="pointbox" :resData="resData" :th="th" :headerData="headerData" :dataKey="dataKey" :hasMore="hasMore" v-on:scrollType="pullUp">
        </point>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { navBack, getTop, addClass, mobile, hhq } from 'api/hhq'
import { myAgentStore_direct } from 'api/myAgentStore'
import Point from 'base/point/point'
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '直接发展',
      th: ['时间', '商户账号'],
      resData: [],
      dataKey: ['times', 'user_name'],
      options: {},
      headerData: '合计：0 家',
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
      var data = {
        data: { page: 1, count: that.count },
        url: 'wechat/agent/mch_direct'
      }
      hhq(data).then(res => {
        console.log(res)
        if (res.status.succeed === 1) {
          var $value = res.data
          var $length = $value.length
          var $hasMore = false
          if ($length === 0 || res.paginated.more === 0) {
            addClass(document.querySelectorAll(".cube-pullup-wrapper")[0], 'hide')
          } else {
            $hasMore = true
          }
          for (var i = 0; i < $length; i++) {
            $value[i].user_name = mobile($value[i].user_name)
          }
          that.headerData = '合计：' + res.extra.total + '家'
          that.resData = $value
          that.hasMore = $hasMore
          that.count += that.count
          that.onloading = false
          that.$refs.pointbox.refresh()
        }
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
