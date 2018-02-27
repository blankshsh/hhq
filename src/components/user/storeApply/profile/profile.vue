<template>
  <transition name="slide">
    <div class="graybox profitbox">
      <m-header :title="title" v-on:back="_back('user/storeApply')"></m-header>
      <div class="m-content">
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: ' ',
    }
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";

</style>
