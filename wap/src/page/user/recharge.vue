<template>
  <div class="wrapper">
    <form
      id="pay_form"
      action="https://zf.flyotcpay.com/payment/"
      method="post"
    >
      <input type="hidden" name="merchantid" v-model="formDate.merchantid" />
      <input type="hidden" name="orderno" v-model="formDate.orderno" />
      <input type="hidden" name="orderamount" v-model="formDate.orderamount" />
      <input type="hidden" name="paytype" v-model="formDate.paytype" />
      <input
        type="hidden"
        name="ordercurrency"
        v-model="formDate.ordercurrency"
      />
      <input
        type="hidden"
        name="serverbackurl"
        v-model="formDate.serverbackurl"
      />
      <input type="hidden" name="callbackurl" v-model="formDate.callbackurl" />
      <input type="hidden" name="signtype" v-model="formDate.signtype" />
      <input type="hidden" name="sign" v-model="formDate.sign" />
    </form>
    <!-- <div class="header">
      <mt-header title="充值">
        <router-link to="/user" slot="left">
          <mt-button icon="back">我的</mt-button>
        </router-link>
      </mt-header>
    </div> -->
    <div class="box">
      <div class="box-contain clearfix">
        <div class="account text-center">
          <p class="title">
            <!-- 当前可用余额（元） -->
            Số dư khả dụng hiện tại（VND）
          </p>
          <p class="yellow number">
            {{ $moneyDot($store.state.userInfo.enableAmt) }}
          </p>
        </div>
      </div>
    </div>
    <div class=" page-part transaction">
      <div class="box-contain clearfix">
        <div class="back-info">
          <!-- 银行卡信息 -->
          <p class="title">
            <!-- 选择面额(元) -->
            Chọn mệnh giá(VND)
          </p>
          <div class="box-tab">
            <div class="box-tab-input-box">
              <input
                ref="chongref"
                v-model="formattedInput"
                class="btn-default"
                type="text"
                @input="handleInput"
              />
            </div>
            <div class="tab-con">
              <ul class="radio-group clearfix">
                <li
                  v-for="item in numberList"
                  :key="item.key"
                  @click="selectTypeFun(item.value)"
                >
                  <div :class="selectNumber == item.value ? 'on' : ''">
                    {{ item.label }}
                  </div>
                </li>
                <!-- <li v-for="item in numberList" :key="item.key" @click="selectTypeFun(item.value)">
                    <div :class="selectNumber == item.value?'on':''">
                        {{item.label}}
                    </div>
                </li> -->
              </ul>
            </div>
            <p style="padding-bottom:0.3rem">
              <!-- 最小充值金额为 -->
              Số tiền nạp tối thiểu là
              {{ $moneyDot(settingInfo.chargeMinAmt) }}
              <!-- 元 -->
              VND
            </p>
          </div>
        </div>
        <div class="back-info">
          <!-- 银行卡信息 -->
          <p class="title">
            <!-- 充值方式 -->
            Phương thức nạp tiền
          </p>
          <div class="box-tab">
            <div v-for="i in optionsPay" :key="i.key" class="pay-radio">
              <!-- 1 ==> 支付宝 2 ==> 微信 3 ==> 对公转账-->
              <div
                @click="changeType(i)"
                :class="i.id == id ? 'pay-list on' : 'pay-list'"
                style="display: flex;"
              >
                <span class="pay-icon">
                  <!-- <img class="pay-miniimg" :src="i.channelImg" > -->
                  <i
                    v-if="i.ctype == 0"
                    style="color:#1296db;"
                    class="iconfont icon-zhifubao"
                  ></i>
                  <i
                    v-else-if="i.ctype == 1"
                    style="color:#36ae55;"
                    class="iconfont icon-yinlian"
                  ></i>
                  <i
                    v-else
                    style="color:#009688;"
                    class="iconfont icon-chongzhi"
                  ></i>
                  <!-- <i v-if="i.value == 3" style="color:#009688;" class="iconfont icon-weixin"></i> -->
                  {{ i.channelType }}
                </span>
                <span>
                  <i
                    :class="
                      id == i.id
                        ? 'icon-on iconfont icon-xuanzhong'
                        : 'iconfont icon-weixuanze'
                    "
                  ></i>
                </span>
              </div>
            </div>
            <!-- <div class="pay-radio">
                  <div @click="changeType('juhe1')" :class="'juhe1' == type?'pay-list on':'pay-list'">
                    <span class="col-md-4 pay-icon">
                       <i style="color:#009688;" class="iconfont icon-chongzhi"></i>
                       支付宝扫码
                    </span>
                    <span class="col-md-4 pull-right">
                        <i :class="type == 'juhe1'?'icon-on iconfont icon-xuanzhong':'iconfont icon-weixuanze'"></i>
                    </span>
                  </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="btnbox">
        <span v-if="!dialogShow" class="text-center btnok" @click="toSure">
          <!-- 立即充值 -->
          Nạp tiền ngay bây giờ
          <i
            v-show="isloading"
            style="color:#fff;"
            class="iconfont icon-jiazaizhong"
          ></i>
          <i v-show="isloading"></i>
        </span>
        <div v-if="dialogShow" class="text-center btnok">
          <form
            method="get"
            ref="formDate"
            :action="formDate.postUrl"
            enctype="multipart/form-data"
          >
            <!--<input type="hidden" name="pay_amount" v-model="selectNumber"/>-->
            <!--<input type="hidden" name="pay_applydate" v-model="formDate.pay_applydate"/>-->
            <!--<input type="hidden" name="pay_bankcode" v-model="formDate.pay_bankcode"/>-->
            <!--<input type="hidden" name="pay_callbackurl" v-model="formDate.pay_callbackurl"/>-->
            <!--<input type="hidden" name="pay_md5sign" v-model="formDate.pay_md5sign"/>-->
            <!--<input type="hidden" name="pay_memberid" v-model="formDate.pay_memberid"/>-->
            <!--<input type="hidden" name="pay_notifyurl" v-model="formDate.pay_notifyurl"/>-->
            <!--<input type="hidden" name="pay_orderid" v-model="formDate.pay_orderid"/>-->
            <!--<input type="hidden" name="pay_productdesc" v-model="formDate.pay_productdesc"/>-->
            <!--<input type="hidden" name="pay_productname" v-model="formDate.pay_productname"/>-->
            <!--<input type="hidden" name="pay_productnum" v-model="formDate.pay_productnum"/>-->
            <!--<input type="hidden" name="pay_producturl" v-model="formDate.pay_producturl"/>-->
          </form>
          <button class="submitBtn" type="submit" @click="onsubmit()">
            <!-- 立即充值 -->
            Nạp tiền ngay bây giờ
          </button>
        </div>
      </div>
      <div class="attention">
        <p>
          <!-- 注意:注意不要重复历史转账，三方银行监管账号随时更换，请务必关注账号变化！大额充值请联系在线客服受理 -->
          Lưu ý: Hãy cẩn thận để không lặp lại các lần chuyển tiền trước đây.
          Tài khoản giám sát ngân hàng của bên thứ ba có thể được thay đổi bất
          cứ lúc nào. Hãy nhớ chú ý đến các thay đổi của tài khoản! Vui lòng
          liên hệ với dịch vụ CSKH trực tuyến để nạp tiền
        </p>
      </div>
    </div>

    <!-- 倒计时弹框 -->
    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade"
      :closeOnClickModal="false"
      class="mint-popup-white"
    >
      <div class="clearfix">
        <a @click="closePopup" class="pull-right"
          ><i class="iconfont icon-weitongguo"></i
        ></a>
      </div>
      <div class="box-block">
        <p class="text-center">
          <i v-if="formCode == 1" class="iconfont icon-umidd17"></i>
          <i v-if="formCode == 3" class="iconfont icon-02"></i>
        </p>
        <div class="prompt-box text-center">
          <!-- 扫码后请输入以下金额支付 -->
          Sau khi quét mã, vui lòng nhập số tiền sau để thanh toán
        </div>
        <p class="text-center money">
          <span class="number">{{ selectNumber }}VND</span>
        </p>
        <div class="qrCode">
          <!-- <img src="../../assets/img/timg.jpg" alt="二维码"> -->
          <div id="qrcode" ref="qrcode"></div>
          <div v-if="stopTime" class="alert-box">
            <i class="iconfont icon-jinggao2"></i>
            <!-- 支付已过期 -->
            Thanh toán đã hết hạn
          </div>
        </div>
        <div class="timer-box">{{ time.minutes }}:{{ time.seconds }}</div>
        <div class="scan">
          <span v-if="formCode == 1">
            <!-- 打开支付宝扫一扫 -->
            Mở Alipay và quét
          </span>
          <span v-if="formCode == 3">
            <!-- 打开微信扫一扫 -->
            Mở WeChat và quét
          </span>
        </div>
      </div>
    </mt-popup>
    <!-- <mt-popup  pop-transition='popup-fade' :closeOnClickModal="false"  class="mint-popup-white">
      <div class="clearfix">
          <a @click="closePopup" class="pull-right"><i class="iconfont icon-weitongguo"></i></a>
      </div>
    </mt-popup> -->
  </div>
</template>

<script>
import * as api from '@/axios/api'
import QRCode from 'qrcodejs2'
import { Toast } from 'mint-ui'

export default {
  components: {},
  props: {},
  data () {
    return {
      isloading: false,
      dialogShow: false, // 扫码支付
      numberList: [
        // {label:'10000',value:10000},
        { label: '20,000,000', value: 20000000 },
        { label: '50,000,000', value: 50000000 },
        { label: '200,000,000', value: 200000000 },
        { label: '500,000,000', value: 500000000 }
      ],
      selectNumber: 50000,
      type: '', // 选择的渠道类型
      optionsPay: [
        {
          // label: '支付宝',
          label: 'alipay',
          value: '1'
        },
        {
          // label: '对公转账',
          label: 'chuyển nhượng công ty',
          value: '3'
        },
        {
          // label: '微信',
          label: 'Wechat',
          value: '2'
        }
      ],
      popupVisible: false, // 二维码倒计时
      minutes: 10,
      seconds: 0,
      time: {
        minutes: 10,
        seconds: '00'
      },
      formh5Date: {},
      formCode: 1,
      stopTime: false, // 倒计时结束提示
      timer: null, // 定时器
      settingInfo: {
        chargeMinAmt: 500
      }, // 设置信息
      id: '', // 选择渠道的id
      formDate: {
        merchantid: '',
        orderno: '',
        orderamount: '',
        paytype: '',
        ordercurrency: '',
        serverbackurl: '',
        callbackurl: '',
        signtype: '',
        sign: ''
      },
      code: '',
      formUrl: '',
      formCode: '',
      isConfig: false,
      Focus1: false,
      formattedInput: '50,000'
    }
  },
  computed: {
    // selectStr () {
    //   return this.$moneyDot(this.selectNumber)
    // }

  },
  created () {},
  mounted () {
    if (this.$state.theme == 'red') {
      document.body.classList.remove('black-bg')
      document.body.classList.add('red-bg')
    }
    this.getSettingInfo()
    if (!this.$store.state.userInfo.idCard) {
      this.getUserInfo()
    }
    this.getPayInfo()
  },
  beforeDestroy () {
    if (this.$state.theme == 'red') {
      document.body.classList.remove('red-bg')
      document.body.classList.add('black-bg')
    }
    window.clearInterval(this.timer)
  },
  watch: {},
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
        this.selectNumber = parsedValue
        this.formattedInput = parsedValue.toLocaleString()
      } else {
        this.formattedInput = '' // 清空格式化的值
      }
    },
    async onsubmit () {
      // 解决金额不变的问题
      if (this.type === 2) {
        let data2 = await api.getjuhe1({
          payType: this.formCode,
          payAmt: this.selectNumber
        })
        if (data2.status === 0) {
          // 成功
          this.formDate = data2.data
          // console.log(document.getElementById("pay_form"))
          this.dialogShow = true
          // 支付跳转
          setTimeout(() => {
            document.getElementById('pay_form').submit()
            this.isloading = false
          }, 1500)
        } else {
          Toast(data2.msg)
        }
      } else {
        setTimeout(() => {
          this.$refs.formDate.submit()
        }, 1000)
      }
    },
    async getUserInfo () {
      // 获取用户信息
      let data = await api.getUserInfo()
      if (data.status === 0) {
        this.$store.state.userInfo = data.data
      } else {
        Toast(data.msg)
      }
    },
    async getPayInfo () {
      // 获取支付渠道
      let data = await api.getPayInfo()
      if (data.status === 0) {
        this.optionsPay = data.data
        this.id = data.data[0].id
        this.type = data.data[0].ctype
        if (data.data[0].ctype === 2) {
          this.formCode = data.data[0].formCode
          let data2 = await api.getjuhe1({
            payType: data.data[0].formCode,
            payAmt: this.selectNumber
          })
          if (data2.status === 0) {
            // 成功
            this.formDate = data2.data
            this.dialogShow = true
          } else {
            Toast(data2.msg)
          }
        }
      } else {
        Toast(data.msg)
      }
    },
    selectTypeFun (value) {
      // 选择充值金额
      this.selectNumber = value
      this.handleInput(value)
    },
    async changeType (value) {
      this.id = value.id
      // 支付宝扫码渠道单独分开
      //  if(value == 'juhe1'){
      if (
        value.formUrl !== undefined &&
        value.formUrl !== '' &&
        value.formUrl.indexOf('yunpay.waa.cn') !== -1
      ) {
        this.type = value.ctype
        this.formDate = value
        this.formCode = value.formCode
        this.dialogShow = false
      } else if (value.ctype === 2) {
        this.type = value.ctype
        // let data  = await api.getjuhe1({payType:903,payAmt:this.selectNumber})
        let data = await api.getjuhe1({
          payType: value.formCode,
          payAmt: this.selectNumber
        })
        if (data.status === 0) {
          // 成功
          this.formCode = value.formCode
          this.formDate = data.data
          this.dialogShow = true
        } else {
          Toast(data.msg)
        }
      } else {
        this.dialogShow = false
        if (value.isLock === 1) {
          Toast('Kênh này tạm thời không khả dụng')
        } else {
          if (value.ctype === 2) {
            // 其他渠道 保存code & url
            this.code = value.formCode
            this.formUrl = value.formUrl
            this.type = value.ctype
          } else {
            // 选择支付方式
            this.type = value.ctype
            this.id = value.id
          }
        }
      }
    },
    toSure () {
      // 充值 先判断是否实名认证
      if (!this.$store.state.userInfo.idCard) {
        Toast(
          'Bạn chưa xác minh tên thật của mình, vui lòng xác minh tên thật của bạn trước'
        )
        this.$router.push('/authentication')
        // else if(this.type == 2){
        //     Toast('微信支付暂未开通')
        // }else if(this.type == 3){
        //     Toast('对公转账暂未开通')
        // }
      } else {
        this.recharge()
      }
      // if(this.selectNumber > 20000 || this.selectNumber <500){
      //     Toast('一次最高充值20000,最低充值500')
      // }else{
      //     this.popupVisible = true
      //     this.minutes = 10
      //     this.seconds = 0
      //     this.time.minutes = 10
      //     this.time.seconds = '00'
      //     this.stopTime = false
      //     this.timerInterval()
      // }
    },
    async getSettingInfo () {
      let data = await api.getSetting()
      if (data.status === 0) {
        // 成功
        this.settingInfo = data.data
        // this.selectNumber = this.settingInfo.chargeMinAmt // 设置默认金额为最小金额
        // 充值金额快捷选择
        // this.numberList = []
        // for(var i = 0;i<10;i++){
        //     let item = {
        //         label:(this.settingInfo.chargeMinAmt+i*this.settingInfo.chargeMinAmt)  ,
        //         value:this.settingInfo.chargeMinAmt+i*this.settingInfo.chargeMinAmt
        //     }
        //     this.numberList.push(item)
        // }
      } else {
        Toast(data.msg)
      }
    },
    async recharge () {
      if (this.isloading) {
        return
      }
      // H5支付
      if (
        this.formDate.formUrl !== undefined &&
        this.formDate.formUrl !== '' &&
        this.formDate.formUrl.indexOf('yunpay.waa.cn') !== -1
      ) {
        let data5 = await api.getjuheH5({
          payType: this.formDate.formCode,
          payAmt: this.selectNumber
        })
        if (data5.status === 0) {
          this.formh5Date = data5.data
          this.$nextTick(() => {
            this.qrcode(this.formh5Date.qrcode)
          })

          this.popupVisible = true
          // console.log(document.getElementById("payh5_form"))
          // return;
          // setTimeout(() => {
          //   this.isloading = false
          // }, 180000)
        } else {
          this.$message.error(data5.msg)
        }
      } else if (this.type === 2) {
        // 其他渠道
        let opts = {
          payType: this.code,
          payAmt: this.selectNumber
        }
        let data = await api.payLInk(this.formUrl, opts)
        if (data.status === 0) {
          // 成功
          this.formDate = data.data
        } else {
          Toast(data.msg)
        }
      } else {
        let opts = {
          amt: this.selectNumber,
          payType: this.type
        }
        this.isloading = true
        let data = await api.inMoney(opts)
        if (data.status === 0) {
          // 成功
          // Toast(data.msg?data.msg:'充值成功!')
          this.$router.push({
            path: '/rechargeSure',
            query: {
              type: this.type,
              id: this.id,
              selectNumber: this.selectNumber
            }
          })
        } else {
          Toast(
            data.msg ? data.msg : 'Nạp tiền không thành công, vui lòng nạp tiền'
          )
        }
      }
      this.isloading = false
    },
    // 生成二维码
    qrcode (url) {
      document.getElementById('qrcode').innerHTML = ''
      let qrcode = new QRCode('qrcode', {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        text: url // 生成二维码的链接
      })
    },
    closePopup () {
      // 关闭弹窗
      this.popupVisible = false
      window.clearInterval(this.timer)
    },
    goBack () {
      this.$router.back(-1)
    },
    num (n) {
      return n < 10 ? '0' + n : '' + n
    },
    timerInterval () {
      var _this = this
      _this.timer = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          // 倒计时结束
          _this.seconds = 0
          _this.stopTime = true
          window.clearInterval(_this.timer)
        } else {
          _this.seconds -= 1
        }
        _this.time.minutes = _this.num(_this.minutes)
        _this.time.seconds = _this.num(_this.seconds)
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.pay-img {
  padding: 0 0.2rem;
  padding-top: 0.417rem;

  img {
    width: 100%;
  }
}

.submitBtn {
  background: none;
  border: none;
  display: inline-block;
  width: 100%;
}

.pay-radio {
  /* padding: 0.2rem 0.1rem; */
  margin-bottom: 0.2rem;
  height: 0.8rem;
  line-height: 0.75rem;

  .pay-icon {
    .iconfont {
      margin-right: 0.2rem;
    }
  }

  .pay-list {
    border-radius: 0.2rem;
    justify-content: space-between;
    padding: 0 0.2rem;
    .pay-miniimg {
      width: 18px;
      vertical-align: middle;
      margin-right: 8px;
    }
  }

  .pay-weixin {
    border-color: #36ae55;
  }

  // .pay-zhifubao{
  // border-color:#1296db;
  // }
  .icon-on {
    color: #b60c0d;
  }
}

.btn-default {
  border: 0.02rem solid #4e4d4d;
  border-radius: 0.2rem;
  display: inline-block;
  height: 0.8rem;
  width: 100%;
  text-indent: 0.2rem;
  background: none;
  color: #ddd;
}

.tips-group {
  padding: 0.417rem;
  margin-top: 0.417rem;

  p {
    line-height: 2;
    font-size: 0.25rem;
  }

  .tip-text {
    text-indent: 0.28rem;
  }
}

.transaction {
  .title {
    padding: 0.2rem;
  }

  .input-btn {
    border: 0.02rem solid #4e4d4d;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.05rem;
    width: 100%;
  }
}

.radio-group li {
  // width: 19%;
  width: 24%;
  margin-right: 1%;
}

.account {
  padding-bottom: 0.4rem;

  .title {
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 0.29rem;
    // color: rgb(51, 51, 51);
    text-align: center;
    font-weight: 700;
  }

  .number {
    font-size: 0.466rem;
  }
}

.mint-popup-white {
  color: #333;
  width: 80%;
  padding: 0.2rem 0.3rem 0;
  // bottom: 30%;
  border-radius: 0.1rem;
  box-shadow: 0.014rem 0.014rem 0.014rem rgba(103, 107, 111, 0.38);
  // .popup-silide-bottom-leave-active{
  //     bottom: -10%;
  // }
  .box-block {
    .qrCode {
      border: 1px solid #f3f3f3;
      padding: 0.1rem;
      height: 3rem;
      width: 3rem;
      margin: 0.3rem auto;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .alert-box {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        position: absolute;
        left: 0;
        top: 0;
        color: #333;
        text-align: center;

        .iconfont {
          color: #f98700;
          font-size: 0.6rem;
          display: block;
          margin-top: 0.8rem;
          margin-bottom: 0.4rem;
        }
      }
    }

    .prompt-box {
      padding: 0.2rem;
      margin: 0.2rem 0;
      color: #666;
    }

    .money {
      font-weight: bold;
      font-size: 0.5rem;

      .number {
        margin-left: 0.1rem;
      }
    }

    .timer-box {
      text-align: center;
      font-size: 0.5rem;
    }

    .number {
      font-size: 0.6rem;
    }
  }

  .scan {
    border-top: 0.02rem dashed #ddd;
    margin-top: 0.5rem;
    padding: 0.3rem;
    text-align: center;
    color: #ff1100;
  }

  // 微信支付宝icon设置
  .icon-umidd17 {
    color: #1296db;
    font-size: 0.6rem;
  }

  .icon-02 {
    color: #36ae55;
    font-size: 0.6rem;
  }
}

.attention {
  height: 0.417rem;
  line-height: 0.417rem;
  color: rgb(187, 187, 187);
  padding: 0.347rem;
}
.box-tab-input-box {
  display: flex;
  .config {
    // background: #b60c0d;
    width: 2.3rem;
    border-radius: 0.1rem;
    margin-left: 0.3rem;
  }
}
.btn-default-str {
  border: 0.02rem solid #4e4d4d;
  border-radius: 0.2rem;
  display: inline-block;
  height: 0.8rem;
  width: 100%;
  text-indent: 0.2rem;
  background: none;
  color: #ddd;
}
.page-part .box-contain{
  width: 98%;
    margin: 0 auto;
   border: 0.05rem solid #38363B;
    border-radius: 0.1rem;
}
</style>
