<template>
  <div class="whitebox agentOpenbox">
    <m-header :title="title" v-on:back="_back('user')"></m-header>
    <div class="m-content">
      <form class="form" v-on:submit.prevent="onSubmit">
        <div class="inputbox">
          <label for="mobile">开通账号</label>
          <input id="mobile" type="text" name="mobile" placeholder="请输入开通账号" v-model='formData.mobile' v-on:input="mobileInput" />
        </div>
        <div class="radiobox">
          <label @click="Select(index)" :class="{'active' : select === index}" :for="item.name" v-for="(item,index) in pointData">
            {{item.text}} 余{{quotaData[item.name]}}个
            <input :id="item.name" type="radio" name='type' :value="item.name" v-model='formData.type'>
            <i class="radioIcon iconfont" :class="{'icon-hhq_mashangshengji_w' : select !== index,'icon-hhq_mashangshengji_x' : select === index}"></i>
          </label>
        </div>
        <div class="submitbox" :class="{'disabledbox' : disabled} ">
          <input type="submit" value="确认开通" class="submitbtn" :disabled="disabled">
        </div>
        <!-- <div class="submitbox {{submitDisabled ? 'submitDisabled' : ' '}}" hover-class="submitbox_hover {{submitDisabled ? 'submitDisabled_hover' : ' '}}">
          <button formType="submit" class="submitbtn" disabled="{{submitDisabled}}"></button>
          <div class="submit" bindtap="submit">确认开通</div>
        </div> -->
      </form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'
import { navBack, hhq } from 'api/hhq'

export default {
  data() {
    return {
      title: '开通代理',
      pointData: [{
        text: '金砖',
        name: 'have_gold_num',
        checked: true
      }, {
        text: '银元',
        name: 'have_silver_num',
      }, {
        text: '铜币',
        name: 'have_copper_num',
      }],
      quotaData: {
        have_gold_num: 0,
        have_silver_num: 0,
        have_copper_num: 0
      },
      select: 0,
      formData: {
        type: 'have_gold_num'
      },
      disabled: true
    }
  },
  created() {
    // 创建实例
    navBack(this)
  },
  mounted: function() {
    // 进入挂在阶段 可以开始ajax
  },
  methods: {
    // 函数
    getData: function() {
      hhq({ url: 'wechat/agent/wechat_agent_all/count' })
        .then(res => {
          console.log(res)
          var $quotaData = this.quotaData
          for (var i in $quotaData) {
            $quotaData[i] = res.data[i]
          }
          this.quotaData = $quotaData
        })
    },
    mobileInput: function() {
      if (/^0?1[3|4|5|7|8]\d{9}$/.test(this.formData.mobile)) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    Select: function(index) {
      this.select = index
    },
    onSubmit: function(e) {
      console.log(this.formData)
      this._Toast('success', '开通成功-测试')
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.agentOpenbox {
  form {
    .inputbox {
      display: flex;
      align-items: center;
      padding: 0 30/@rem;
      border-bottom: 2/@rem solid #eee;
      height: 92/@rem;
      position: relative;
      label {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        font-size: 28/@rem;
        color: #333;
        line-height: 90/@rem;
        padding-left: 30/@rem;
        z-index: 9;
      }
      input {
        font-size: 28/@rem;
        width: 100%;
        height: 100%;
        line-height: 50/@rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 20/@rem;
        padding-left: 150/@rem;
        margin-left: 15/@rem;
      }
    }
    .radiobox {
      label {
        display: block;
        width: 100%;
        height: 92/@rem;
        border-bottom: 2/@rem solid #eee;
        position: relative;
        font-size: 28/@rem;
        padding-left: 30/@rem;
        line-height: 90/@rem;
        box-sizing: border-box;
        .radioIcon {
          color: #d4d4d4;
          font-size: 50/@rem;
          z-index: 8;
          position: absolute;
          right: 30/@rem;
          top: 50%;
          transform: translate(0, -50%)
        }
      }
      .active {
        .radioIcon {
          color: #0ac32b
        }
      }
    }
    .submitbox {
      margin-top: 50/@rem;
      .submitbtn {
        width: 5rem;
        height: 0.8rem;
        margin: 0 auto;
        background: #ffb80d;
        color: #fff;
        font-size: 0.36rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.16rem;
      }
    }
    .disabledbox .submitbtn {
      background: #d4d4d4
    }
  }
}

</style>
