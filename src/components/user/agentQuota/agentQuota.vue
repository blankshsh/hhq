<template>
  <div class="whitebox agentQuotabox">
    <m-header :title="title" v-on:back="_back('user')"></m-header>
    <div class="m-content">
      <div class="tr">
        <div class="th" v-for="item in th">{{item}}</div>
      </div>
      <label :for="item.name" v-for="item in listData">
        <p v-text='item.text'></p>
        <div>
          <input type="text" :id="item.name" :name="item.name" v-on:input="price">
        </div>
        <p v-text='item.price'></p>
      </label>
      <div class="tr">
        <p>可用积分</p>
        <p> </p>
        <p>{{lucky_points}}</p>
      </div>
      <div class="submit">
        <div @click="buy">确认购买</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import mHeader from 'base/header/header'
import { navBack, hhq } from 'api/hhq'

export default {
  data() {
    return {
      title: '购买代理名额',
      th: ['级别', '数量', '应付积分'],
      lucky_points: '0.00',
      listData: [{
        text: '金砖',
        name: 'gold',
        price: '',
        fee: 0
      }, {
        text: '银元',
        name: 'silver',
        price: '',
        fee: 0
      }, {
        text: '铜币',
        name: 'copper',
        price: '',
        fee: 0
      }],
      key: { gold: 0, silver: 1, copper: 2 }
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
    price: function(e) {
      var that = this
      var $value = e.target.value
      var $name = e.target.name
      console.log($value, $name)
      if (!$value) {
        that.listData[that.key[$name]].price = ''
        return
      }
      if (!/[^\d]/g.test($value)) {
        that.listData[that.key[$name]].price = parseInt($value) * parseInt(that.listData[that.key[$name]].fee)
      }
    },
    getData: function() {
      this.lucky_points = this.$store.state.userData.user.lucky_points
      var data = { url: 'wechat/agent/wechat_agent_all/daili_potins' }
      hhq(data).then(res => {
        var $listData = this.listData
        $listData.forEach((item, index) => {
          Object.assign(item, res.data[item.name])
        })
        this.listData = $listData
        console.log(this.listData)
      })
    },
    buy: function() {
      var that = this
      var $value = that.listData
      var $price = 0
      $value.forEach((item, index) => {
        if (item.price) {
          $price = $price + item.price
        }
      })
      console.log($price)
      if ($price === 0) {
        this._Toast('error', '无购买内容')
        return
      }
      this._Modal('消费 ' + $price + ' 积分（测试）')
    }
  },
  components: {
    mHeader
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.agentQuotabox {
  .tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2/@rem solid #eee;
    .th,
    >p {
      width: 100/3%;
      height: 80/@rem;
      font-size: 28/@rem;
      line-height: 1.5;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      background: #fff
    }
  }
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2/@rem solid #eee;
    height: 100/@rem;
    p,
    input {
      width: 100/3%;
      height: 80/@rem;
      font-size: 28/@rem;
      line-height: 1.5;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input {
      border-radius: 8/@rem;
      border: 2/@rem solid #eee;
      height: 70/@rem;
      padding: 0 15/@rem;
      box-sizing: border-box;
      width: 140/@rem;
      text-align: center;
    }
  }
  .submit {
    margin-top: 50/@rem;
    div {
      width: 500/@rem;
      height: 80/@rem;
      margin: 0 auto;
      background: #ffb80d;
      color: #fff;
      font-size: 36/@rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16/@rem;
    }
  }
}

</style>
