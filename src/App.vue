<template>
  <div id="app" @touchmove.prevent>
    <router-view></router-view>
  </div>
</template>
<script>
import User from 'components/user/user'
export default {
  components: {
    User
  },
  created() {},
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/flex";
.hide {
  display: none !important;
}

input[type="radio"] {
  width: 0;
  height: 0;
  background: transparent;
  opacity: 0
}

</style>
