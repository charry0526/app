<template>
  <div class="listBox">
    <template v-if="listType === 'list'">
      <div class="listBox_header" v-if="proList.tabList && proList.tabList.length">
        <div class="listBox_header_item" v-for="(item, index) in proList.tabList" :key="index">
          {{ item.name }}
          <div class="hasAction" v-if="item.isChange === 1" @click="changePriceOrPercentage">
            %
          </div>
        </div>
      </div>
      <div class="infinite-list-wrapper" ref="wrapper" v-if="productList.length">
        <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="(item, index) in productList" class="list-item" :key="index">
            <div class="list-item_text" v-if="item.stockName || item.name || item.names || item.xgname">
              {{ item.stockName || item.name || item.names || item.xgname }}
            </div>
            <div class="list-item_text" v-if="item.nowPrice || item.price">{{
              ((item.nowPrice || item.price) / 1000).toFixed(2) }}</div>
            <template v-if="item.nowPrice || item.hcrate || item.price">
              <div class="list-item_text" v-if="PriceOrPercentage && !proList.zccyList">
                <template v-if="item.price">
                  {{ ((item.price - item.scprice) / item.price * 100).toFixed(2) }}%
                </template>
                <template v-else>
                  {{ (item.hcrate / (item.nowPrice - item.hcrate) * 100).toFixed(2) }}%
                </template>
              </div>
              <div class="list-item_text" v-else>
                {{ item.preclose_px || item.price }}
              </div>
            </template>

            <div class="list-item_text" v-if="item.preclose_px">
              {{ item.preclose_px }}
            </div>
            <div class="list-item_text" v-if="item.orderNum">
              {{ item.orderNum }}
            </div>
            <div class="list-item_text" v-if="item.buyOrderPrice">
              {{ item.buyOrderPrice }}
            </div>
            <div class="list-item_text" v-if="item.now_price">
              {{ item.now_price }}
            </div>

            <div class="list-item_text" v-if="PriceOrPercentage && proList.zccyList">
              {{ (item.allProfitAndLose / item.orderTotalPrice * 100 / item.orderLever).toFixed(2) }}%
            </div>
            <div class="list-item_text" v-if="!PriceOrPercentage && proList.zccyList">
              {{ item.now_price || 'xxxasdsa' }}
            </div>


            <div class="list-item_text" v-if="item.issuePrice || proList.stateList">
              {{ item.issuePrice || 'xxx' }}
            </div>
            <div class="list-item_text" v-if="item.bzj">
              {{ item.bzj }}
            </div>
            <div class="list-item_text" v-if="isShowActionBtn">
              <img v-if="actionClass === 'del'" src="../assets/images/home/close@x2.png"
                @click="actionHandelClick(index, item, 'del')" />
              <span v-if="actionClass === 'buy'" class="buyItemBtn"
                @click="actionHandelClick(index, item, 'buy')">购买</span>
            </div>
            <div class="list-item_text" v-if="item.oldPrice || proList.stateList">
              {{ item.oldPrice || 'xxx' }}
            </div>
            <div class="list-item_text" v-if="item.gg">
              {{ item.gg }}
            </div>
            <div class="list-item_text" v-if="item.zts">
              <span class="textState" v-if="item.zts == '3'">待审核</span>
              <span class="textState" v-else-if="item.zts == '2'">未通过</span>
              <span class="textState" v-else-if="item.zts == '4'">已购买</span>
              <span v-else-if="item.zts == '1'" class="buyItemBtn"
                @click="actionHandelClick(index, item, 'buy')">购买</span>
            </div>
          </li>
        </ul>
        <p v-if="loading" class="infinite-list-wrapper_tips"><van-loading size="14px">加载中...</van-loading></p>
        <p v-if="noMore" class="infinite-list-wrapper_tips">没有更多了</p>
      </div>
    </template>
    <template v-if="listType === 'MyCard'">
      <div class="infinite-list-wrapper" ref="wrapper" v-if="productList.length">
        <ul class="list isCradList" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li class="cardItem" v-for="(item, index) in productList" :key="index">
            <div class="cardItem_title">
              <div class="title">{{ item.nickName }}</div>
              <div class="sub_title" v-if="item.stockName">({{ item.stockName }})</div>
              <div class="title_tag">员工福利扶持</div>
              <div class="updateTime">
                更新：<span class="text_green">22,700</span>
              </div>
            </div>
            <div class="cardItemInfo">
              <div class="cardItemInfo_item">
                <span>购买价格</span>
                <span>{{ item.buyOrderPrice }}</span>
              </div>
              <div class="cardItemInfo_item">
                <span>数量</span>
                <span>{{ item.orderNum }}</span>
              </div>
              <div class="cardItemInfo_item">
                <span>金额</span>
                <span>{{ item.orderTotalPrice }}</span>
              </div>
              <div class="cardItemInfo_item">
                <span>交易费用</span>
                <span>{{ item.orderFee }}</span>
              </div>
              <div class="cardItemInfo_item">
                <span>所得税</span>
                <span>35,800</span>
              </div>
              <div class="cardItemInfo_item">
                <span>倍数</span>
                <span>1</span>
              </div>
              <div class="cardItemInfo_item">
                <span>押金</span>
                <span>0</span>
              </div>
              <div class="cardItemInfo_item">
                <span>因损益</span>
                <span>{{ item.profitAndLose }}</span>
              </div>
              <div class="cardItemInfo_item">
                <span>实际损益</span>
                <span>{{ item.allProfitAndLose }}</span>
              </div>
            </div>
            <div class="cardItem_title noBorder">
              <div class="sub_title">03-11-2023 14:15:36</div>
              <div class="cardItem_footer_btn" v-if="state == 0">卖出</div>
              <div class="cardItem_footer_btn sw" v-if="state == 1">售完</div>
            </div>
          </li>
        </ul>
        <p v-if="loading" class="infinite-list-wrapper_tips"><van-loading size="14px">加载中...</van-loading></p>
        <p v-if="noMore" class="infinite-list-wrapper_tips">没有更多了</p>
      </div>
    </template>
    <van-empty description="暂无数据" v-if="listType === 'list' && !productList.length" />
  </div>
</template>
    
<script>
import Vue from "vue";
import { Empty, Loading } from "vant";
//mock数据
// import {
//   watchListData as getWatchData,
//   marketListData as getMarketData,
//   welfareESOP as getWelfaretData,
//   stateList as getStatetData,
//   holdingList as getGoldingData,
// } from "@/mock";
Vue.use(Empty);
Vue.use(Loading);

export default {
  name: "MyList",
  props: {
    proList: {
      type: Object,
      default: () => { },
    },
    state: {
      type: Number,
      default: 0
    },
    listType: {
      type: String,
      default: "list",
    },
  },
  data() {
    return {
      PriceOrPercentage: true,
      loading: false,
      noMore: false,
      stockPlate: '',
      pageSize: 1, //当前第几页面
      productList: [],
      isShowActionBtn: false, //是否显示操作按钮，根据返回的表头查看是否含有“操作”
      actionClass: "", //操作按钮类型，删除  购买
    };
  },
  computed: {
    // noMore() {
    //   return this.count >= 60;
    // },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {

  },
  watch: {
    proList: {
      handler(newValue, oldValue) {
        console.log('newValue-----', newValue)
        console.log('oldValue-----', oldValue)
        // 数据变化时触发的处理函数
        // this.init(); //初始化数据
        console.log('this.proList.pageNum---', this.proList.pageNum)
        if (this.proList.pageNum == 1) {
          this.init()
          // this.load()
        }
        if (this.proList.watchListData) {
          this.productList = this.proList.watchListData.list
        }
        if (this.proList.market) {
          this.productList = this.proList.market.list
        }
        if (this.proList.welfare) {
          this.productList = this.proList.welfare.list
        }
        if (this.proList.stateList) {
          this.productList = this.proList.stateList.list
        }
        if (this.proList.zccyList) {
          this.productList = this.proList.zccyList.list
        }
        if (this.proList.holdingList) {
          this.productList = this.proList.holdingList.list
        }
        this.loading = false
        this.noMore = false

        if (this.proList.tabList) {
          for (let i = 0; i < this.proList.tabList.length; i++) {
            if (this.proList.tabList[i].name === "操作") {
              this.isShowActionBtn = true;
              this.actionClass = this.proList.tabList[i].actionClass;
              break;
            } else {
              this.isShowActionBtn = false;
            }
          }
        }

      },
      deep: true
      // immediate: true, // 设置为 true，初始化加载
    },
  },
  methods: {
    init() {
      this.PriceOrPercentage = true;
      this.loading = false;
      this.noMore = false;
      this.pageSize = 1; //当前第几页面
      // this.productList = [];
      this.isShowActionBtn = false; //是否显示操作按钮，根据返回的表头查看是否含有“操作”
      this.actionClass = ""; //操作按钮类型，删除  购买
      if (this.proList.tabList && this.productList) {
        this.$nextTick(() => {
          if (this.proList.tabList.length && this.productList.length) {
            this.$refs.wrapper.scrollTop = 0;
          }
        });
      }
    },
    //涨幅百分比和金额显示切换
    changePriceOrPercentage() {
      this.PriceOrPercentage = !this.PriceOrPercentage;
    },
    //异步加载数据
    load() {
      console.log('加载下一页啦')
      let pass = false;
      //关注列表
      if (
        this.proList.watchListData &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //市场列表
      if (
        this.proList.market &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //福利列表--ESOP
      if (
        this.proList.welfare &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //福利列表--状态列表
      if (
        this.proList.stateList &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //资产 持有列表
      if (
        this.proList.zccyList &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      //订单--持有列表
      if (
        this.proList.holdingList &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      console.log('pass---', pass)
      if (pass) {
        this.loading = false;
        this.noMore = true;
        return;
      }

      this.loading = true;
      console.log(1111, this.pageSize)
      this.$emit('changeData', this.pageSize += 1, this.proList.fn)
    },
    //操作
    actionHandelClick(index, item, actionType) {
      // item为当前项目数据，index为索引，actionType操作按钮类型
      if (actionType === "del") {
        this.productList.splice(index, 1);
      } else if (actionType === "buy") {
        console.log("购买点击");
      }
    },
  },
};
</script>
    
<style lang="less" scoped>
.listBox {
  display: flex;
  // background: red;
  width: 100%;
  height: 100%;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: flex;
  flex-direction: column;

  .listBox_header {
    height: 38px;
    display: flex;
    background: #3c3b41;

    .listBox_header_item {
      height: 38px;
      line-height: 38px;
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;

      .hasAction {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;

        &::before {
          content: "";
          display: block;
          width: 6px;
          height: 10px;
          background: url("../assets/images/home/right-triangle@x2.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 5px;
        }

        &::after {
          content: "";
          display: block;
          width: 6px;
          height: 10px;
          background: url("../assets/images/home/left-triangle@x2.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 5px;
        }
      }
    }
  }

  .infinite-list-wrapper {
    padding-bottom: 10px;
    overflow: auto;

    .list {
      .list-item {
        height: 36px;
        display: flex;
        align-items: center;
        background: #1a191f;

        &:nth-child(2n) {
          background: #29282e;
        }

        .list-item_text {
          flex: 1;
          text-align: center;

          img {
            width: 14px;
            height: 14px;
          }

          .buyItemBtn {
            font-size: 14px;
            background: #f99420;
            padding: 5px 11px;
            border-radius: 6px;
          }

          .textState {
            color: rgb(105, 105, 107);
          }
        }
      }

      &.isCradList {
        padding: 0 15px;

        .cardItem {
          background: #1a191f;
          border-radius: 6px;
          margin-bottom: 10px;
          padding: 0 10px;

          .cardItem_title {
            display: flex;
            align-items: center;
            height: 36px;
            border-bottom: 1px dashed #555457;

            .title {
              font-size: 14px;
            }

            .sub_title {
              color: rgb(105, 105, 107);
              font-size: 12px;
              margin-left: 5px;
            }

            .title_tag {
              font-size: 12px;
              border: 1px solid #e62946;
              color: #e62946;
              margin-left: 5px;
              border-radius: 4px;
              padding: 1px 3px;
            }

            .updateTime {
              margin-left: auto;
              font-size: 14px;

              span {
                font-size: 13px;
              }
            }

            .cardItem_footer_btn {
              margin-left: auto;
              font-size: 14px;
              background: #f99420;
              padding: 4px 11px;
              border-radius: 6px;

              &.sw {
                background: none;
                color: #f99420;
                border: 1px solid #f99420;
              }
            }

            &.noBorder {
              border-top: 1px dashed #555457;
              border-bottom: 0;
            }
          }

          .cardItemInfo {
            display: flex;
            flex-wrap: wrap;
            padding: 5px 0;

            .cardItemInfo_item {
              padding: 5px 0;
              width: calc(100% / 3);

              span {
                display: block;
                line-height: 20px;
              }
            }
          }
        }
      }
    }

    .infinite-list-wrapper_tips {
      padding: 10px;
      text-align: center;
    }
  }
}
</style>
