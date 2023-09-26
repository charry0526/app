<template>
  <div class="wrapper">
    <div v-if="list.length<=0" class="empty text-center">
      {{$t("noData")}}
    </div>
    <div v-if="list.length>0">
      <ul
        class="order-info-box-wrap"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="item in list" :key="item.key">
          <div class="order-info-box">
            <div class="order-title">
              <span class="main">{{item.stockName}}</span>
              <span class="secondary">({{item.stockCode}})</span>

              <span v-if="item.isNew==1" :class="item.isNew=='1'?'type type-up':'type type-down'">{{item.isNew=='1'?'ESOP':''}}</span>
              <span v-if="item.stockPlate=='科创'" :class="item.stockPlate=='科创'?'type':''">
                <!-- 科创 -->
                HOSE
              </span>
              <span class="pull-right">
                <!-- 总盈亏 -->
                Tổng lãi/lỗ
                :<b
                :class="item.allProfitAndLose>0?'space green':item.allProfitAndLose==0?'space':'space red'">{{$moneyDot(item.allProfitAndLose)}}</b></span>
            </div>
            <div class="order-info">
              <p class="clearfix">
                <span class="col-xs-4">
                  <!-- 买入价格 -->
                  Giá mua:
                  <b class="space">{{$moneyDot(item.buyOrderPrice)}}</b></span>
                <span class="col-xs-4 text-center">
                  <!-- 数量 -->
                   SL:<b class="space">{{$moneyDot(item.orderNum)}}</b></span>
                <span class="col-xs-4 text-right">
                  <!-- 市值 -->
                  Giá TT:{{$moneyDot(item.orderTotalPrice)}}</span>
              </p>
              <p class="clearfix">
                <span class="col-xs-4">
                  <!-- 卖出价格 -->
                  Giá bán:
                  :<b class="space">{{$moneyDot(item.sellOrderPrice)}}</b></span>
                <span class="col-xs-4 text-center"></span>
                <span class="col-xs-4 text-right">
                  <!-- 其他费用 -点差费 -->
<!--                  Chi phí khác:<b class="space">{{$moneyDot(item.orderStayFee)}}</b></span>-->
                lề:<b class="space">{{$moneyDot(item.newBzj==null?0:item.newBzj)}}</b></span>
              </p>
              <p class="clearfix">
                <span class="col-xs-4">
                  <!-- 手续费 -->
                  Phí giao dịch:
                  <b class="space">{{$moneyDot(item.orderFee)}}</b></span>
                <span class="col-xs-4 text-center">
                  <!-- 印花税 -->
                  Thuế thu nhập
                  :<b class="space">{{$moneyDot(item.orderSpread)}}</b></span>
                <span class="col-xs-4 text-right">
                  <!-- 隔夜费 -留仓费 -->
<!--                  Phí qua đêm:<b class="space">{{$moneyDot(item.orderStayFee)}}</b></span>-->
                Margin X:<b class="space">{{$moneyDot(item.orderLever)}}</b></span>
              </p>

              <p class="clearfix">
                <span class="col-xs-5">
                  <!-- 留仓天数 -->
                  Số ngày nắm giữ:<b class="space">{{item.orderStayDays}}</b></span>
                <span class="col-xs-7 text-right">
                  <!-- 浮动盈亏 -->
                  Lãi lỗ:<b
                  :class="item.profitAndLose>0?'space green':item.profitAndLose==0?'space':'space red'">{{$moneyDot(item.profitAndLose)}}</b></span>
              </p>
              <p class="clearfix">
                        <span class="secondary col-xs-6">
                          <!-- 买入 -->
                          Mua:
                            <b v-if="item.buyOrderTime">{{new Date(item.buyOrderTime) | timeFormat}}</b>
                            <b v-else></b>
                        </span>
                <span class="secondary col-xs-6 text-right">
                  <!-- 卖出 -->
                  Bán:
                            <b v-if="item.sellOrderTime">{{new Date(item.sellOrderTime) | timeFormat}}</b>
                            <b v-else></b>
                        </span>
              </p>
            </div>

          </div>
        </li>
      </ul>
      <div v-show="loading" class="load-all text-center">
        <mt-spinner type="fading-circle"></mt-spinner>
        {{$t("loading")}}...
      </div>
      <!-- <div v-show="!loading" class="load-all text-center">
        {{$t("allLoaded")}}
      </div> -->
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

export default {
  components: {},
  props: {

    hasChangeSell: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      currentNum: 0,
      list: [],
      total: 0 // 记录总值
    }
  },
  watch: {
    hasChangeSell (newval) {
      if (newval) {
        this.list = []
        this.getListDetail()
      }
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.getListDetail()
  },
  methods: {
    async loadMore () {
      if (this.list.length < this.pageSize || this.loading || this.total <= this.currentNum) {
        return
      }
      this.loading = true
      // 加载下一页
      this.pageNum++
      await this.getListDetail()
      this.currentNum = this.pageNum * this.pageSize
      this.loading = false
    },
    async getListDetail () {
      let opt = {
        state: 1,
        stockCode: '', // 代码
        stockSpell: '', // 简拼
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let data = await api.getOrderList(opt)
      if (data.status === 0) {
        data.data.list.forEach(element => {
          this.list.push(element)
        })
        this.total = data.data.total
      } else {
        Toast(data.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .wrapper {
    padding-bottom: 0
  }

  .order-title {
    .icon--kulian {
      font-size: 0.7rem;
      color: #006b96;
    }

    .icon-xiaolian {
      font-size: 0.6rem;
      color: #d50000;
    }

    .icon-pingchanglian {
      font-size: 0.6rem;
      color: #ddd;
    }
  }
    #app.red-theme{
    .order-info-box{
      background-color: #fff;
      .order-title{
        .main {
          color: #000;
        }
      }
      .order-info{
        color: #000;
      }
    }
    .order-foot {
      border-top-color: #ccc;
    }
    .load-all{
      background-color: #BB1815;
      color: #fff;
    }
  }
</style>
