<template>
  <div class="wrapper">
    <!-- <div class="header">
      <mt-header title="提现">
        <router-link to="" slot="left">
          <mt-button @click="goBack" icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div> -->
    <!-- <div class="text-center">
        <div class="btn-group">
            <a href="javascript:;" class="with-draw-btn on">提现</a>
            <a href="#/cashlist" class="with-draw-detai-btn ">记录</a>
        </div>
    </div> -->
    <div>
      <div class="box">
        <div class="box-contain clearfix">
          <div class="account text-center">
            <!-- <p class="title">可提现金额（元）</p> -->
            <p class="title">{{ $t("cashText") }}</p>
            <p class="yellow number">
              {{ $moneyDot($store.state.userInfo.enableAmt) }}
            </p>
          </div>
        </div>
      </div>
      <div class="form-block page-part">
       <div class="sum-box">
         <div class="sum-wrapper">
          <label>Số tiền rút</label>
          <input
                  ref="chongref"
                  v-model="formattedInput"
                  placeholder="Vui lòng nhập số tiền rút"
                  class="btn-default"
                  type="text"
                  @input="handleInput"
                />
          <span @click="changeAllNumber" class="all-in">Tất cả</span>
         </div>
       </div>
       <!-- <mt-field
          label="Số tiền rút"
          :attr="{ pattern: '[0-9]*', focus: Focus1 }"
          ref="chongref"
          placeholder="Vui lòng nhập số tiền rút"
          type="text"
          v-model="number"
          @input="handleInput"
        >
          <span @click="changeAllNumber">
            Tất cả
          </span>
        </mt-field> -->
      </div>

      <div class="btnbox">
        <span class="text-center btnok" @click="toSure">
          <!-- 确定 -->
          {{ $t("config") }}
        </span>
      </div>
      <!-- <div v-if="!$store.state.bankInfo.bankNo" class="addcard back text-center">
      没有银行卡？<a href="#/addCard">点击添加</a> -->
      <!-- </div> -->
      <div class="attention" style="margin-bottom:10px;">
        <!-- <p>注意: 提现默认提取沪深账户中的可用资金。</p> -->
        <p>{{ $t("cashText7") }}</p>
      </div>
      <div class="attention">
        <p>
          <!-- 1.当前有持仓订单不能出金 。 -->
          {{ $t("cashText3") }}
        </p>
        <p>
          <!-- 2.出金请先在官网通过实名认证和绑定银行卡 。 -->
          {{ $t("cashText4") }}
        </p>
        <p>
          {{ $t("cashText5") }}
        </p>
        <p>
          <span class="yellow">
            <!-- 出金时段内出金一般2小时到账，出金时间受银行间清算时间影响，各家银行到账时间不同，最迟T+1次日24点前到账 -->
            {{ $t("cashText6") }}
          </span>
        </p>
      </div>
      <!-- <div @click="toCashList">
          查看提现记录
      </div> -->
    </div>
  </div>
</template>

<script>
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'

export default {
  components: {},
  props: {},
  data () {
    return {
      number: '',
      card: '',
      phone: '',
      settingInfo: {
        withMinAmt: 1000,
        withTimeBegin: 13, // 提现开始时间
        withTimeEnd: 15, // 提现结束时间
        withFeeSingle: 3, // 提现单笔手续费
        withFeePercent: 0.008 // 提现单笔手续费
      },
      Focus1: false,
      formattedInput: ''
    }
  },
  watch: {},
  computed: {
    selectStr () {
      return this.$moneyDot(this.number)
    }
  },
  created () {},
  beforeDestroy () {
    if (this.$state.theme == 'red') {
      document.body.classList.remove('red-bg')
      document.body.classList.add('black-bg')
    }
  },
  mounted () {
    if (this.$state.theme == 'red') {
      document.body.classList.remove('black-bg')
      document.body.classList.add('red-bg')
    }
    this.getSettingInfo()
  },
  methods: {
    handleInput (eventOrValue) {
      let input = ''
      if (typeof eventOrValue === 'string' || typeof eventOrValue === 'number') {
        input = String(eventOrValue)
      } else if (eventOrValue.target && eventOrValue.target.value) {
        input = eventOrValue.target.value
      }
      const filteredValue = input.replace(/\D/g, '') // 过滤非数字字符
      const parsedValue = parseInt(filteredValue)

      if (!isNaN(parsedValue)) { // 检查输入是否为有效的数字
        this.number = parsedValue
        this.formattedInput = parsedValue.toLocaleString()
      } else {
        this.formattedInput = '' // 清空格式化的值
      }
    },
    changeAllNumber () {
      this.number = this.$store.state.userInfo.enableAmt||''
      this.handleInput(this.number)
    },
    async getSettingInfo () {
      let data = await api.getSetting()
      if (data.status === 0) {
        // 成功
        this.settingInfo = data.data
      } else {
        Toast(data.msg)
      }
    },
    async toSure () {
      // 确定提现
      //   未实名认证和添加银行卡不能提现
      if (!this.$store.state.userInfo.idCard) {
        // Toast('请先实名认证')
        Toast('Vui lòng xác minh tên thật của bạn trước')
        this.$router.push('/authentication')
      }
      if (!this.$store.state.bankInfo.bankNo) {
        // Toast('请先绑定银行卡')
        Toast('Vui lòng liên kết thẻ ngân hàng trước')
        this.$router.push('/addCard')
      }
      if (!this.number || this.number <= 0) {
        // Toast('请输入正确的提现金额')
      } else if (this.number - this.settingInfo.withMinAmt < 0) {
        // Toast('提现金额不得小于' + this.settingInfo.withMinAmt)
        Toast('Số tiền rút không được nhỏ hơn' + this.settingInfo.withMinAmt)
      } else {
        let opts = {
          amt: this.number
        }
        let data = await api.outMoney(opts)
        if (data.status === 0) {
          // 成功
          // Toast('申请成功，请等待审核!')
          Toast('Ứng dụng đã thành công, vui lòng chờ xem xét!')
          this.$router.push('/cashlist')
        } else {
          // Toast(data.msg ? data.msg : '提现失败,请重新提现或者联系管理员')
          Toast(
            data.msg
              ? data.msg
              : 'Rút tiền không thành công, vui lòng rút lại hoặc liên hệ với quản trị viên'
          )
        }
      }
    },
    toCashList () {
      // 查看提现记录
      this.$router.push('/cashlist')
    },
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.btn-group {
  // background: #f4f4f4;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 0.5rem;

  a {
    display: inline-block;
    text-align: center;
    font-size: 0.29rem;
    height: 0.7rem;
    line-height: 0.6rem;
    width: 1.44rem;
    margin: 0;
    margin-top: 0;
    padding: 0;
    border: 2px solid rgb(182, 12, 13);
    color: rgb(182, 12, 13);
  }

  .with-draw-btn {
    position: relative;
    right: -10px;
    width: 1.51rem;
    border-top-left-radius: 0.695rem;
    border-bottom-left-radius: 0.695rem;
  }

  .with-draw-detai-btn {
    border-top-right-radius: 0.695rem;
    border-bottom-right-radius: 0.695rem;
  }

  .on {
    background: rgb(182, 12, 13);
    color: #fff;
  }
}

.account {
  padding-bottom: 0.2rem;

  .title {
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 0.29rem;
    // color: rgb(51, 51, 51);
    text-align: center;
    // font-weight: 700;
  }

  .number {
    font-size: 0.566rem;
    font-weight: 600;
  }
}

.addcard {
  height: 0.834rem;
  line-height: 0.834rem;
  font-size: 0.29rem;
  color: rgb(187, 187, 187);

  a {
    color: #177be1;
  }
}

.attention {
  // height: 0.417rem;
  line-height: 0.417rem;
  padding: 0.347rem;
}
.wrapper {
  /deep/.mint-field {
    // background: #3b3a3f;
  }
}
.sum-box{
  width: 100%;

  padding: 0 .33rem;
  background-color: #21252A;
  height: 1rem;
  line-height: 1rem;

  .sum-wrapper{
    border-bottom: .01rem solid hsla(252, 5%, 79%, .5);
    display: flex;
  justify-content: space-between;
  align-items: center;
  height:100%;
    label{
      width:30%;
      text-align: center;
      font-size: .29rem;
      color: white;
    }
    .btn-default{
      flex: 1;
      padding-left: .2rem;
      color: #CAD0D1;
      background-color: transparent;
    }
    .all-in{

    }
  }

}
</style>
