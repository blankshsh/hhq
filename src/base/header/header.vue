<template>
  <div class="header">
    <i class="cubeic-back" @click='back'></i>
    <p :title='title' class="title">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {}
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
    back: function() {
      this.$emit('back', 'back')
    }
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.header {
  .cubeic-back {
    font-size: 0.48rem;
    position: absolute;
    left: 0.2rem;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 100;
  }
  .title {
    width: 100%;
    font-size: 0.28rem;
    line-height: 1.2;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
