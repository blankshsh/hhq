<template>
  <transition name="slide">
    <div class="whitebox storeDatabox">
      <m-header :title="title" v-on:back="_back('user/storeApply')"></m-header>
      <div class="m-content">
        <cube-scroll ref="profitScroll" style="height:100%;overflow:hidden">
          <div class="info">添加法人身份证正面照、法人身份证反面照、营业执照、其他经营许可证</div>
          <div class="imgbox">
            <div v-for="(item,index) in required" @click="requiredImg(index)">
              <img :src="item"></img>
            </div>
            <div v-for="(item,index) in otherImg" @click="otherImg(index)">
              <img :src="item"></img>
            </div>
          </div>
          <form id="storeDataform">
            <div class="inputbox row" v-for="item in inputList">
              <label>{{item.label}}</label>
              <input type="text" :name="item.name" :placeholder="item.placeholder" :value="item.value" :style="{'display: none' : item.display , 'display:block' : !item.display}" />
              <!-- <picker wx:if="{{item.name === 'tid'}}" bindchange="bindPickerChange" value="{{$index}}" range="{{typeList}}" range-key="business_name">
              <div class="picker hasSelect">
                {{typeList[$index]['business_name']}}
              </div>
            </picker> -->
            </div>
            <div class="submitbox" hover-class="submitbox_hover">
              <button formType="submit" class="submitbtn"></button>
              <div class="submit" bindtap="submit">立即保存</div>
            </div>
          </form>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'

export default {
  data() {
    return {
      title: '申请线下商户',
      templateData: null,
      position: 'http://out2ei6gm.bkt.clouddn.com/others_card.png',
      required: [
        'http://out2ei6gm.bkt.clouddn.com/id_card_pic.png',
        'http://out2ei6gm.bkt.clouddn.com/id_card_re_pic.png',
        'http://out2ei6gm.bkt.clouddn.com/certificate.png'
      ],
      requiredCheck: [0, 0, 0], //check必填图片是否填写
      otherImg: [
        'http://out2ei6gm.bkt.clouddn.com/others_card.png',
        'http://out2ei6gm.bkt.clouddn.com/others_card.png',
        'http://out2ei6gm.bkt.clouddn.com/others_card.png'
      ],
      inputList: [{
        label: '店铺名称',
        name: 'shop_cer_name',
        placeholder: '请填写店铺名称'
      }, {
        label: '法人姓名',
        name: 'lawer_name',
        placeholder: '请填写法人姓名'
      }, {
        label: '身份证号',
        name: 'lawer_id_no',
        placeholder: '请填写法人身份证信息'
      }, {
        label: '营业执照',
        name: 'num_certificate',
        placeholder: '请填写统一社会信用代码'
      }, {
        label: '商户类型',
        name: 'tid',
        display: true
      }],
      typeList: [],
      cateData: [],
      $index: 0,
      tid: ''
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
    requiredImg: function(index) {
      var that = this
      console.log(index)
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          console.log(res)
        }
      });
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.storeDatabox {
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
    padding: 20/@rem 30/@rem;
    box-sizing: border-box;
    font-size: 28/@rem;
  }
  .imgbox {
    display: flex;
    flex-wrap: wrap;
    border-top: 2/@rem solid #eee;
    div {
      width: 250/@rem;
      height: 250/@rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 2/@rem solid #eee;
      border-bottom: 2/@rem solid #eee;
      box-sizing: border-box;
      img {
        width: 200/@rem;
        height: 200/@rem;
      }
      &:nth-child(3n) {
        border-right: 0
      }
    }
  }
  form {
    .inputbox {
      box-sizing: border-box;
      border-bottom: 2/@rem solid #eee;
      line-height: 80/@rem;
      padding: 8/@rem 15/@rem;
      label {
        font-size: 32/@rem;
        display: block;
        min-width: 130/@rem;
        line-height: 80/@rem;
        padding: 0 30/@rem 0 10/@rem;
      }
      input {
        flex: 1;
        display: block;
        font-size: 32/@rem;
        height: 80/@rem;
        padding-right: 30/@rem;
      }
    }
  }
}

</style>
