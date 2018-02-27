<template>
  <div class="graybox agentDetailbox">
    <m-header :title="title" v-on:back="_back('user/myAgent')"></m-header>
    <div class="m-content">
      <point ref="pointbox" :resData="resData" :th="th" :headerData="headerData" :dataKey="dataKey" :hasMore="hasMore" v-on:scrollType="pullUp">
      </point>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'
import Point from 'base/point/point'
import { navBack, reSize } from 'api/hhq'
import { agentDetail } from 'api/myAgent'

export default {
  data() {
    return {
      title: ' ',
      type: '',
      count: 20,
      th: ['时间', '客户账号', '代理级别'],
      resData: [],
      dataKey: ['times', 'true_name', 'level'],
      options: {},
      headerData: '合计：0 家',
      hasMore: true,
      onloading: false,
      offsetTop: ''
    }
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
    console.log(this.$route)
    let type = this.$route.query.type
    this.type = type
    let $level = ''
    let $url = ''
    switch (type) {
      case 'direct_gold':
        $url = 'wechat/agent/direct_gold'
        $level = '金砖'
        break;
      case 'direct_silver':
        $url = 'wechat/agent/direct_silver'
        $level = '银元'
        break;
      case 'direct_copper':
        $url = 'wechat/agent/direct_copper'
        $level = '铜币'
        break;
      default:
        $url = 'wechat/agent/direct_gold'
        $level = '直接金砖'
    }
    this.level = $level
    this.title = '直接' + $level
    this.url = $url
    navBack(this)
  },
  methods: {
    // 函数
    getData: function() {
      var that = this
      let data = { count: that.count, page: 1 }
      console.log(data)
      agentDetail(this, data).then(() => {
        this.onloading = false
        this.$refs.pointbox.refresh()
      })
    },
    pullUp: function(data) {
      var that = this
      console.log('12')
      if (!that.hasMore || that.onloading) {
        that.$refs.pointbox.refresh()
        return
      }
      that.onloading = true
      setTimeout(function() {
        that.getData()
        console.log('12')
      }, 1000)
    }
  },
  components: {
    mHeader,
    Point
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
@import "~common/less/type_point.less";

</style>
