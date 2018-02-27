<template>
  <div class="whitebox profitbox">
    <m-header :title="title" v-on:back="_back('user')"></m-header>
    <div class="m-content">
      <cube-scroll ref="profitScroll" class="item" style="height:100%;overflow:hidden">
        <div class="logo">
          <img :src="logoimg"></img>
        </div>
        <div class="info">
          <p class="title">花钱哥温馨提示：</p>
          <p style="text-align: left;">“可提现收益”须在会花钱APP中查看，如果还没下载，请退出小程序，去关注“会花钱Coolpay”公众号，公众号中可以下载“会花钱APP”。</p>
          <p style="text-align: left;">也可以按以下流程关注“会花钱Coolpay”公众号。</p>
        </div>
        <div class="stepbox">
          <div class="text">1.点击“立即复制”按钮，自动复制“会花钱Coolpay”</div>
          <button class="btn" id="copyBtn" @click="_copy" data-clipboard-text="会花钱Coolpay">立即复制</button>
        </div>
        <div class="stepbox" v-for="item in imageList">
          <div class="text" v-for="title in item.title">{{title}}</div>
          <img class="profitImg" :src="item.image"></img>
          <i :class="{'hasDown' : item.hasDown}"></i>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Clipboard from 'clipboard';
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '可提现收益',
      logoimg: 'http://out2ei6gm.bkt.clouddn.com/coolPay.jpg',
      QRcode: 'http://out2ei6gm.bkt.clouddn.com/download1023.png',
      images: [],
      imageList: [{
        title: [
          '2.打开微信-通讯录-右上角添加-添加公众号',
          '长按搜索框，粘贴,点击进入“会花钱Coolpay”公众号'
        ],
        image: 'http://out2ei6gm.bkt.clouddn.com/step102418_02.jpg',
        hasDown: true
      }, {
        image: 'http://out2ei6gm.bkt.clouddn.com/step102418_03.jpg',
        hasDown: true
      }, {
        image: 'http://out2ei6gm.bkt.clouddn.com/step102418_04.jpg',
        hasDown: true
      }, {
        image: 'http://out2ei6gm.bkt.clouddn.com/step102418_05.jpg'
      }, {
        title: ['3.关注公众号,点击我的/APP,下载会花钱APP'],
        image: 'http://out2ei6gm.bkt.clouddn.com/step102418_06.jpg',
        hasDown: true
      }, {
        image: 'http://out2ei6gm.bkt.clouddn.com/step110109_07.jpg'
      }]
    }
  },
  created() {
    // 创建实例
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
    var that = this
    let imgs = document.querySelectorAll('.profitImg')
    imgs.forEach(function(item, index) {
      item.onload = function() {
        item.style = 'display:block;width:' + (item.width / 100) + 'rem;height:auto'
        that.$refs.profitScroll.refresh()
      }
    })
  },
  computed: {},
  methods: {
    // 函数
    _copy: function() {
      var that = this
      var clipboard = new Clipboard('#copyBtn');
      clipboard.on('success', function(e) {
        that._Toast('success', '复制成功!')
        e.clearSelection();
      });
      clipboard.on('error', function(e) {
        that._Toast('error', '请选择“拷贝”进行复制!')
      });
    },
    _imgonload: function(e) {
      console.log(e)
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.profitbox {
  .m-content {
    position: absolute;
    top: 0.88rem;
    width: 100%;
    height: auto;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 0;
  }
  .info {
    width: 100%;
    padding: 0 70/@rem;
    box-sizing: border-box;
    margin-bottom: 50/@rem;
    p {
      display: block;
      font-size: 24/@rem;
      line-height: 1.5;
      text-align: center;
    }
    .title {
      font-size: 28/@rem
    }
  }
  .logo img {
    width: 500/@rem;
    height: 350/@rem;
    margin: 20/@rem auto;
  }
  .btn {
    border: 0;
    width: 500/@rem;
    height: 75/@rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32/@rem;
    line-height: 1.5;
    margin: 50/@rem auto;
    background: #ffb80d;
    border-radius: 16/@rem;
    color: #fff
  }
  .stepbox {
    width: 100%;
    padding: 0 70/@rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &:last-child {
      padding-bottom: 60/@rem;
    }
    .text {
      width: 100%;
      font-size: 24/@rem;
      line-height: 1.5;
      text-align: center
    }
    img {
      margin: 30/@rem auto;
    }
    .hasDown {
      width: 46/@rem;
      height: 33/@rem;
      margin: 0 auto;
      background: url('http://out2ei6gm.bkt.clouddn.com/orange_down1024.png') 100% 100% no-repeat;
      background-size: 100% 100%
    }
  }
}

</style>
