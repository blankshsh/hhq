<template>
  <div>
    <div class="sum">
      <p :headerData='headerData'>{{headerData}}</p>
    </div>
    <div class="table">
      <div class="tr">
        <div class="th" v-for="item in th">{{item}}</div>
      </div>
      <div id="scrollwrp" :style='offsetTop'>
        <cube-scroll :options="options" @pulling-up="pullUp" ref="pointScroll" class="item" style="height:100%;overflow:hidden">
          <div class="tr" v-for="item in resData">
            <div class="td">{{item[dataKey[0]]}}</div>
            <div class="td">{{item[dataKey[1]]}}</div>
            <div class="td" v-if='item[dataKey[2]]'>{{item[dataKey[2]]}}</div>
            <div class="td" v-if='item[dataKey[3]]'>{{item[dataKey[3]]}}</div>
          </div>
          <div class="tr" :class="{'hasMore' : hasMore}">
            <div class="td">没有更多数据了</div>
          </div>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getTop, reSize } from 'api/hhq'

export default {
  props: {
    headerData: {
      type: String,
      default: ''
    },
    th: {
      type: Array,
      default: []
    },
    resData: {
      type: Array,
      default: ''
    },
    dataKey: {
      type: Array,
      default: ''
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
  },
  data() {
    return {
      offsetTop: '',
      onloading: false
    }
  },
  created() {
    // 创建实例
    this.options = this.$store.state.options
    this.onloading = this.$props.onloading
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
    var that = this
    getTop(that, '#scrollwrp')
    window.addEventListener('resize', function() {
      that.offsetTop = ''
      setTimeout(() => {
        getTop(that, '#scrollwrp')
        reSize(that)
      }, 200)
    })
  },
  methods: {
    // 函数
    pullUp: function() {
      this.$emit('scrollType', 'pullUp')
    },
    refresh() {
      this.$refs.pointScroll.refresh()
      this.$refs.pointScroll.forceUpdate()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
        this.onloading = this.$props.onloading
      }, this.refreshDelay)
    }
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";

</style>
