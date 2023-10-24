<template>
  <div class="wrapper">
    <div class="detail-part">
      <div class="index-name">
        <p>{{detail.name}}
          <span class="index-name_code">{{detail.code}}</span>
        </p>
      </div>
      <div class="clearfix">
        <div class="pull-left hangqin-left col-xs-4">
          <p :class="detail.hcrate == 0?'price yellow':detail.hcrate > 0?'price green':detail.hcrate<0?'price red':''">
            {{$moneyDot((Number(detail.nowPrice)/1000).toFixed(2))}}</p>
          <p :class="detail.hcrate == 0?'gain yellow':detail.hcrate > 0?'gain green':detail.hcrate<0?'gain red':''">
            <span>{{Number(detail.hcrate).toFixed(2)}}</span>
            <span style="margin-left: .1rem;">{{Number(detail.hcratePercentage).toFixed(2)}}%</span>
          </p>
        </div>
        <div class="pull-right hangqin-right col-xs-8">
          <ul class="price-detail text-center clearfix grup-ul">
            <li>
              <!-- <p class="title"></p> -->
              <!-- <p :class="detail.hcrate == 0?'number yellow':detail.hcrate > 0?'number green':detail.hcrate<0?'number red':''">
                <span class="title">Tham chiếu</span>
                {{Number(detail.open_px).toFixed(2)}}
              </p> -->
               <p style="color:#C4BA4F" class="number">
                <span class="title">Tham chiếu</span>
                {{(Number(detail.open_px)/1000).toFixed(2)}}
              </p>
            </li>
            <li style="text-align:left">
              <!-- <p :class="detail.hcrate == 0?'number yellow':detail.hcrate > 0?'number green':detail.hcrate<0?'number red':''">
                <span class="title ">Trần</span>
                {{Number(detail.today_max).toFixed(2)}}
              </p> -->
               <p style="color:#B955CA" class="number">
                <span class="title ">Trần</span>
                {{(Number(detail.today_max)/1000).toFixed(2)}}
              </p>
            </li>
            <li>
              <!-- <p :class="detail.hcrate == 0?'number yellow':detail.hcrate > 0?'number green':detail.hcrate<0?'number red':''">
                <span class="title">Sàn</span>
                {{Number(detail.today_min).toFixed(2)}}
              </p> -->
                <p style="color:#2AB0B2" class="number">
                <span class="title">Sàn</span>
                {{(Number(detail.today_min)/1000).toFixed(2)}}
              </p>
            </li>
            <!-- <li> -->
            <!-- <p class="title">最低</p> -->
            <!-- <p class="green">
                <span class="title green">跌停限制</span>
                {{(detail.nowPrice - Number(detail.nowPrice) * settingIndexInfo.downLimit ).toFixed(2)}}
              </p>
            </li> -->
          </ul>
        </div>
      </div>
      <!-- <div class="clearfix">
          <div class="col-xs-4 red">涨停限制 </div>
          <div class="col-xs-4 green">跌停限制 </div>
      </div> -->
    </div>
    <div v-if="false"
         class="box-tab">
      <div class="tab-title">
        <span class="circle"></span>股票详情
      </div>
      <div class="tab-con">
        <ul class="first clearfix">
          <li class="pull-left">
            {{detail.indexName}}
          </li>
          <li :class="detail.hcrate < 0?'pull-left green':detail.hcrate == 0?'pull-left':'pull-left red'">
            当前价：
            <span>{{Number(detail.currentPoint).toFixed(2)}}</span>
          </li>
        </ul>
        <ul class="first clearfix">
          <li class="pull-left">
            {{detail.indexCode}}
            <!-- <span>(Scrb1905)</span> -->
          </li>
          <li :class="detail.hcrate < 0?'pull-left green':detail.hcrate == 0?'pull-left':'pull-left red'">
            <!-- 当前价： -->
            <span>{{detail.hcrate}}%</span>
          </li>
        </ul>
        <!-- <div class='buy-price clearfix'>
            <div class="col-xs-4">
                <p>市价买入</p>
            </div>
            <div class="col-xs-4">
                <p class="red">{{detail.nowPrice}}</p>
            </div>
            <div class="col-xs-4">
                <p>说明</p>
            </div>
        </div> -->
      </div>
    </div>
    <div class="box-tab">
      <div class="tab-title">
        <span class="circle"></span>{{$t("selectNumber")}}
        <!-- <div class="notify">最小购买股数{{Number(routeQuery.buyMinNum)}}股</div> -->
      </div>
      <div class="tab-con">
        <ul class="radio-group clearfix">
          <li v-for="item in numberList"
              :key="item.key"
              @click="selectNumberFun(item.value)">
            <div :class="[selectNumber == item.value?'on':'']">
              {{item.label}}
            </div>
          </li>

        </ul>
        <p class="clearfix">
          <!-- <span class="pull-left">最小购买股数{{Number(routeQuery.buyMinNum)}}股</span> -->
          <!-- <span class="protem pull-right">
            最大可购买数量{{Number(settingInfo.buyMaxNum)}}股
          </span> -->
        </p>
      </div>
    </div>
    <div class="box-tab"
         style="display:none">
      <div class="tab-title">
        <span class="circle"></span>买卖方向
        <span class="notify">最大购买金额:{{(settingInfo.buyMaxAmtPercent * $store.state.userInfo.enableAmt).toFixed(2)}}</span>
      </div>
      <div class="tab-con">
        <ul class="radio-group clearfix">
          <li v-for="item in type"
              :key="item.key"
              @click="selectTypeFun(item.value)">
            <div :class="selectType == item.value?'on':''">
              {{item.label}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="box-tab">
      <div class="tab-title">
        <span class="circle"></span>chọn đòn bẩy
      </div>
      <div class="tab-con">
        <ul class="radio-group clearfix">
          <li v-for="item in siteLeverList"
              :key="item.key"
              @click="selectCycleFun(item.value)">
            <div :class="selectCycle == item.value?'on':''">
              {{item.label}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="box-tab">
      <div class="tab-con">
        <!-- <p class="text-left page-part">
            <span class="">{{selectNumber?selectNumber*100:autoNumber*100}}股</span>
            <span class="pull-right">买入金额:{{price?price:0}}元</span>
        </p> -->
    <!-- <p class="clearfix">
          <!-- <span class="pull-right">最小购买金额{{settingInfo.buyMinAmt}}元</span> -->
    <!-- <span class="pull-right">最大购买金额:{{settingInfo.buyMaxPercent * $store.state.userInfo.enableIndexAmt}}</span>
        </p>

      </div>
    </div> -->
    <div class="agree">
      <!-- <p style="line-height: 0.4rem;padding: 0 0.2rem;">
        当该指数涨幅达到<span class="red">涨停限制</span>时,不能买涨；达到<span class="green">跌停限制</span>时，不能买跌.
      </p> -->
      <!-- <p>
          <i @click="isAgree" :class="agree?'glyphicon glyphicon glyphicon-ok-sign red':'glyphicon glyphicon-ok-circle'"></i>
          我已阅读并同意
          <a @click="totrageUrl" >《指数交易交易⻛险揭示书》</a>
      </p> -->
    </div>
    <div class="footer-btn">
      <div class="total">
        <p class="pay">{{$t("paybond")}}<span class="protem">{{total?$moneyDot(total):0}}</span></p>
        <p class="account">({{$t("accountbalance")}}:{{$moneyDot($store.state.userInfo.enableAmt)}})</p>
      </div>
      <!-- <mt-button :disabled="buying" class="btn-red" size="small" type="danger" @click="toInquiry">下单</mt-button> -->
      <div class="right-btn">
        <div class="btn-buy"
             @click="toInquiry">
          <img src="../../assets/ico/hangqing-btn.png"
               alt=""
               srcset="">
          {{$t("placorderwithliangrong")}}
        </div>
      </div>
    </div>

    <foot></foot>
  </div>
</template>

<script>
import foot from '../../components/foot/foot'
import { Toast } from 'mint-ui'
import { isNull } from '@/utils/utils'
import * as api from '@/axios/api'

export default {
  components: {
    foot
  },
  props: {},
  data () {
    return {
      detail: {
        name: '',
        code: '',
        gid: '',
        stockType: ''
      }, //
      cycle: [ // 杠杆倍数
        { label: '10', value: '10' },
        { label: '20', value: '20' },
        { label: '30', value: '30' }
      ],
      selectCycle: 1, // 杠杆
      numberList: [],
      siteLeverList: [],
      selectNumber: '', // 购买的数量
      autoNumber: '',
      type: [
        { label: '买涨', value: '0' },
        { label: '买跌', value: '1' }
      ],
      selectType: 0,
      // number:0,// 股
      // price:0,// 股价格
      // total:0, // 总价
      agree: true,
      settingInfo: {
        buyMaxNum: 1000, // 最大买入股数
        buyMinNum: 100 // 最小买入股数
      }, // 设置规则信息
      settingIndexInfo: {
        riseLimit: 0.1,
        downLimit: 0.1
      },

      dialogShow: false,
      timer: null,
      buying: false,
      focePromptPopup: false, // 总手续费提示框
      settingSpreadRate: { spreadRate: 0 },
      routeQuery: {}
    }
  },
  watch: {},
  computed: {
    poundage () { // 手续费= 买入手续费+印花税+点差费
      if (this.autoNumber) {
        let payfee = (this.detail.nowPrice * this.autoNumber * 100).toFixed(2) // / this.selectCycle
        return ((payfee * this.settingInfo.buyFee) + (payfee * this.settingInfo.dutyFee) + (payfee * this.settingSpreadRate.spreadRate)).toFixed(2)
      } else if (this.selectNumber) {
        let payfee = (this.detail.nowPrice * this.selectNumber * 100).toFixed(2)
        return ((payfee * this.settingInfo.buyFee) + (payfee * this.settingInfo.dutyFee) + (payfee * this.settingSpreadRate.spreadRate)).toFixed(2)
      } else {
        return 0
      }
    },
    total () {
      if (this.settingSpreadRate == undefined || this.settingSpreadRate.spreadRate == undefined) {
        this.settingSpreadRate.spreadRate = 0
      }
      if (this.autoNumber) {
        // let payfee = (this.detail.nowPrice * 1 * this.autoNumber / this.selectCycle)
        let payfee = (this.detail.nowPrice * 1 * this.selectNumber)
        return (payfee + (payfee * this.settingInfo.buyFee) + (payfee * this.settingInfo.dutyFee) + (payfee * this.settingSpreadRate.spreadRate)).toFixed(2)
        // return (this.detail.nowPrice * this.autoNumber * 100 / this.selectCycle).toFixed(2)
      } else if (this.selectNumber) {
        // alert("bb"+this.detail.nowPrice+"cc==="+this.selectNumber+"ff==="+this.selectCycle+"==="+this.settingSpreadRate.spreadRate)
        // let payfee = (this.detail.nowPrice * 1 * this.selectNumber / this.selectCycle)
        let payfee = (this.detail.nowPrice * 1 * this.selectNumber)
        return (payfee + (payfee * this.settingInfo.buyFee) + (payfee * this.settingInfo.dutyFee) + (payfee * this.settingSpreadRate.spreadRate)).toFixed(2)
        // return (this.detail.nowPrice * this.selectNumber * 100 / this.selectCycle).toFixed(2)
      } else {
        return 0
      }
      // 需支付总价 = 现价 * 股（1手 = 100股）/ 杠杆倍数
    },
    price () {
      if (this.autoNumber) {
        return (this.detail.nowPrice * this.autoNumber * 1).toFixed(2)
      } else if (this.selectNumber) {
        return (this.detail.nowPrice * this.selectNumber * 1).toFixed(2)
      } else {
        return 0
      }
      // 市值价 = 现价 * 股（1手 = 100股）
    }
  },
  created () {
    // this.timer = setInterval(this.getDetail, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.routeQuery = this.$route.query
    console.log(this.routeQuery, 'this.routeQuery')
    this.selectNumber = this.routeQuery.buyMinNum
    let items = { label: this.selectNumber, value: this.selectNumber }
    console.log(this.selectNumber, items)
    this.numberList.push(items)
    this.selectCycle = this.routeQuery.leverValue
    let item = { label: this.selectCycle + 'lần', value: this.selectCycle }
    this.siteLeverList.push(item)
    this.getDetail()

    this.getSettingIndexInfo()
    this.getSettingInfo()
    if (!this.$store.state.userInfo.enableAmt) {
      this.getUserInfo()
    }
    // this.detail = this.$route.query.info
  },
  methods: {
    changeAutoNumber () {
      // 自定义手数
      this.selectNumber = ''
    },
    async getSettingIndexInfo () {
      // 网站设置信息 指数
      let data = await api.getIndexSetting()
      if (data.status === 0) {
        // 成功
        this.settingIndexInfo = data.data
      } else {
        Toast(data.msg)
      }
    },
    async getSettingInfo () {
      // 网站设置信息
      let data = await api.getSetting()
      if (data.status === 0) {
        this.settingInfo = data.data
        // 成功
        // 杠杆倍数
        // this.selectCycle = data.data.siteLever
        // // console.log(this.$store.state.userInfo)
        // if(this.$store.state.userInfo !== undefined && this.$store.state.userInfo !== null && this.$store.state.userInfo.phone !== '' && this.$store.state.userInfo.siteLever !== null){
        //     data.data.siteLever = '1'
        //     this.selectCycle = data.data.siteLever.split('/')[0]
        //     this.siteLeverList = []
        //     for (let i = 0; i < data.data.siteLever.split('/').length; i++) {
        //       let val = data.data.siteLever.split('/')[i]
        //       let item = { label: val + '倍', value: val }
        //       this.siteLeverList.push(item)
        //     }
        //   } else {
        //     data.data.siteLever = '1'
        //     this.selectCycle = data.data.siteLever.split('/')[0]
        //     this.siteLeverList = []
        //     for (let i = 0; i < data.data.siteLever.split('/').length; i++) {
        //       let val = data.data.siteLever.split('/')[i]
        //       let item = { label: val + '倍', value: val }
        //       this.siteLeverList.push(item)
        //     }
        //   }
      } else {
        Toast(data.msg)
      }
    },
    async findSpreadRateOne () {
      // 查询点差费率
      let opts = {
        applies: this.detail.hcrate, // 涨跌幅
        turnover: this.total, // 成交额
        unitprice: this.detail.nowPrice, // 股票单价
        code: this.$route.params.code
      }
      let data = await api.findSpreadRateOne(opts)
      if (data.status === 0) {
        // 成功
        if (data.data != undefined) {
          this.settingSpreadRate = data.data
        }
        console.log(this.settingSpreadRate)
      } else {
        this.$message.error(data.msg)
      }
    },
    isAgree () {
      let i = false
      let j = true
      this.agree = this.agree ? i : j
    },
    totrageUrl () {
      this.$router.push('/trade')
    },
    // async getDetail () {
    //   let opts = {
    //     indexCode: this.$route.query.info ? this.$route.query.info.indexGid : ''
    //   }
    //   let data = await api.getSingleIndex(opts)
    //   if (data.status === 0) {
    //     this.detail = data.data
    //   } else {
    //     Toast(data.msg)
    //   }
    // },
    async getDetail () {
      let opts = {
        code: this.$route.query.code,
        isNew: 1
      }
      this.loading = true
      let data = await api.getSingleStock(opts)
      this.loading = false
      if (data.status === 0) {
        this.detail = data.data
        this.findSpreadRateOne()
      } else {
        Toast(data.msg)
      }
    },
    selectCycleFun (value) {
      // value = 1
      // this.selectCycle = value
    },
    selectNumberFun (value) {
      this.selectNumber = value
      if (value !== 0) {
        this.autoNumber = ''
      }
      console.log(value, this.selectNumber)
    },
    selectTypeFun (value) {
      this.selectType = value
    },
    canBuyStatus () {
      let dataTime = new Date()
      let day = dataTime.getDay() // 星期几
      let hour = dataTime.getHours() // 小时
      let minute = dataTime.getMinutes() // 分钟
      if (day === 6 || day === 7) {
        return false
      }
      if (hour < 9 || (hour >= 12 && hour < 13) || hour >= 15) {
        return false
      }
      if (hour === 9 && minute < 32) {
        return false
      }
      if (hour === 11 && minute >= 30) {
        return false
      }
      if (hour === 14 && minute > 57) {
        return false
      }
      return true
    },
    async toInquiry () {
      // 判断在不在开盘时间内
      // if(!this.canBuyStatus()){
      //     Toast('不在交易时段内！')
      //     return
      // }
      // 下单

      if (!this.$store.state.userInfo.idCard) {
        // Toast('您还未实名认证,请先实名认证了再下单')
        Toast('Bạn chưa xác minh tên thật của mình, vui lòng xác minh tên thật của bạn trước khi đặt hàng')

        this.$router.push('/authentication')
        return
      }
      if (!this.agree) {
        // Toast('需同意合作协议才能交易!')
        Toast('Cần đồng ý thỏa thuận hợp tác để giao dịch!')
      } else if (isNull(this.selectNumber) && isNull(this.autoNumber)) {
        // Toast('请选择购买手数')
        Toast('Vui lòng chọn số lô cần mua')
      } else if (isNull(this.selectType)) {
        // Toast('请选择买卖方向')
        Toast('Vui lòng chọn hướng mua và bán')
      } else {
        this.buying = true
        console.log(this.detail)
        let opts = {
          stockId: this.detail.id,
          buyNum: this.selectNumber ? this.selectNumber * 1 : this.autoNumber * 1, // 单位为手
          buyType: this.selectType,
          lever: this.selectCycle ? this.selectCycle : 0,
          newId: this.routeQuery.id
        }

        let data = await api.buy(opts)
        this.buying = false
        if (data.status === 0) {
          Toast(data.data)
          this.getUserInfo()
          this.$router.push('/orderlist')
        } else {
          Toast(data.msg)
        }
      }
    },
    toDetail () {
      this.$router.push('/listdetail')
    },
    goBack () {
      this.$router.go(-1)
    },
    async getUserInfo () {
      // 获取用户信息
      let data = await api.getUserInfo()
      if (data.status === 0) {
        // Toast(data.msg)
        this.$store.state.userInfo = data.data
      } else {
        Toast(data.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
body {
  background: #fff;
}
.wrapper {
  background-color: #2A282D;//#16171d;
}
.protem {
  color: #ff8000;
}

.agree {
  margin-top: 0.2rem;
  padding-bottom: 1rem;
  a {
    color: #428bca;
  }
}

.footer-btn {
  position: fixed;
  z-index: 1;
  width: 100%;
  padding-right: 0;
  bottom: 0.97rem;
  height: 1.32rem;
  line-height: 1.32rem;
  display: flex;

  .total {
    font-size: 0.26rem;
    padding-left: 0.3rem;
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .pay {
      line-height: 0.45rem;
      font-size: 0.32rem;
      .protem {
        margin-left: 0.1rem;
      }
    }

    .account {
      line-height: 0.3rem;
      font-size: 0.24rem;
      color: #999;
    }
  }

  .right-btn {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btn-buy {
      width: 2.4rem;
      height: 0.76rem;
      border-radius: 0.38rem;
      background-color: #7266ba;
      line-height: 0.76rem;
      text-align: center;
      font-size: 0.28rem;
      img {
        width: 0.26rem;
        height: 0.26rem;
        margin-right: 0.1rem;
      }
    }
  }

  .btn-red {
    flex: 2;
    border-radius: 0;
    padding: 0;
  }
}

.auto {
  input {
    display: inline-block;
    width: 75%;
    border-bottom: 0.01rem solid #ddd;
  }
}

// bottom 7rem -> 0.97rem
.buy-price {
  // border-top: 0.01rem solid #000000;
  padding-top: 0.15rem;

  p {
    height: 0.32rem;
    line-height: 0.32rem;
  }
}

.mint-popup-white {
  height: 6.5rem;
  padding: 0.25rem;

  .check-box {
    height: 5.3rem;
    line-height: 0.35rem;
    overflow: auto;

    h3 {
      margin-bottom: 0.2rem;
    }
  }

  .box-btn {
    width: 100%;
    padding-top: 0.2rem;

    .btn-red {
      width: 100%;
      height: 0.6rem;
    }
  }
}

.detail-part {
  .index-name {
    font-size: 0.32rem;
    padding: 0.3rem;

    span.index-name_code {
      font-size: 0.22rem;
      color: #fff;
      margin-left: 0.2rem;
      background-image: url(../../assets/ico/zhishu.png);
      background-size: 100% 100%;
      padding: 0.02rem 0.05rem 0.02rem 0.15rem;
    }
  }

  .price {
    font-size: 0.5rem;
    padding-bottom: 0.1rem;
  }

  .gain {
    font-size: 0.24rem;
  }

  .title {
    color: #999;
    line-height: 0.36rem;
    padding-right: 0.1rem;
    font-size: 0.24rem;
    &.red {
      color: #b60c0d;
    }

    &.green {
      color: #31b97e;
    }
  }

  .number {
    line-height: 0.36rem;
  }

  .price-detail {
    li {
      margin-left: .2rem;
      // width: 60%;
      float: left;
      margin-bottom: 0.15rem;
      margin-top: 0.15rem;
      text-align: right;
      div {
        background-color: #2d2e3b;
      }
      &:nth-child(odd) {
        // width: 40%;
        text-align: left;
      }
    }
  }

  .detail-list {
    padding-left: 0.3rem;
  }
}
.hangqin-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0.1rem 0 0.3rem;
  position: relative;
  .price {
    padding-bottom: 0.35rem;
  }
  &:after {
    display: block;
    position: absolute;
    content: "";
    width: 2px;
    height: 0.77rem;
    background-color: #2e2f34;
    top: 0.2rem;
    right: 0;
  }
}
.hangqin-right {
  // padding: 0 0.3rem 0 0;
}
.box-tab {
  margin: 0.15rem 0.3rem;
  width: 6.9rem;
  background-color: #302F35;//#1b1c25;
  border-bottom: none;
  border-radius: 0.1rem;
  box-shadow: inset 0px 0px 0.4rem -0.2rem #888;
  .tab-title {
    margin-bottom: 0;
    margin-top: 0.14rem;
    border-bottom: 1px solid #32333b;
    font-size: 0.32rem;
    font-weight: bold;
    padding-top: 0.12rem;
    padding-bottom: 0.12rem;
    height: auto;
    .notify {
      font-size: 0.24rem;
      color: #fff8;
    }
    &:after {
      background: #138eb4;
    }
  }
}
.radio-group li div {
  background-color: #2d2e3b;
  border-radius: 0.03rem;
  border: none;
}
.radio-group li div.on {
  background-color: #ec9e2f;//#e00101;
}
.radio-group li input {
  background-color: #2d2e3b;
  border-radius: 0.03rem;
  border: none;
  width: 1rem;
  margin-right: 0.15rem;
  padding: 0 0.2rem;
}
.agree {
  font-size: 0.24rem;
  padding-bottom: 1.32rem;
}
.red-theme {
  .wrapper {
    background-color: #e9e9e9;
  }
  .detail-part .index-name {
    color: #222222;
  }
  .detail-part .index-name span.index-name_code {
    background-image: url(../../assets/ico/zhishu-red.png);
  }
  .hangqin-left .price {
    color: #e00202;
    font-family: lightnumber;
  }
  .hangqin-left:after {
    background-color: transparent;
  }
  .detail-part .title {
    color: #000;
  }
  .box-tab {
    background-color: #fff;
  }
  .box-tab .tab-title {
    color: #000;
  }
  .box-tab .tab-title:after {
    background-color: #000;
  }
  .box-tab .tab-title .notify {
    color: #000;
  }
  .radio-group li div {
    background-color: #d9d9d9;
    border: 1px solid #aeaeae;
    color: #222222;
  }
  .radio-group li div.on {
    background-color: #e00202;
    border: 1px solid #e00202;
    color: #ffffff;
  }
  .box-tab .tab-title {
    border-bottom-color: #e9e9e9;
  }
  .agree {
    color: #000;
  }
  .footer-btn {
    background-color: #e0e0e0;
  }
  .footer-btn .total .pay {
    color: #000;
  }
  .footer-btn .total .pay .protem {
    color: #e00202;
    font-family: lightnumber;
  }
  .footer-btn .right-btn .btn-buy {
    background-color: #e00202;
  }
}
.radio-group li{
  width: 2rem;
  padding: 0 .2rem;
}
 .grup-ul{
      display: flex;
      flex-wrap: wrap;

    }
</style>
