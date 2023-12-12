<style src="../../../src/assets/styles/common.css"/>
<style lang="less" scoped>
@import "../../assets/styles/index.less";
</style>
<style lang="less" scoped>
.tabBox {
  margin-top: 10px;

  .myTab {
    border-bottom: 1px solid #707070;
  }

  .tabChildren {
    padding: 10px 15px 0 15px;
    flex-wrap: wrap;
    display: flex;
    border-bottom: 1px solid #707070;

    .tabChildrenItem {
      display: flex;
      height: 30px;
      align-items: center;
      font-size: 12px;
      background: #39383e;
      padding: 0 10px;
      border-radius: 20px;
      margin-right: 10px;
      margin-bottom: 10px;

      &.active {
        background: #fb9702;
        color: #fff;
      }
    }

    &.isContent {
      padding-bottom: 10px;

      &.MyCard {
        border: 0;
      }

      .isContent_list {
        flex: 1;
        display: flex;

        .isContent_item {
          font-size: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;

          span {
            padding: 0 8px 12px 0;
            display: inline-block;
            white-space: nowrap;

            &:nth-child(2) {
              padding-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.van-tabs__wrap {
  height: 37px !important;

  .van-tabs__nav {
    .van-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      &.van-tab--active {
        background: #3d3c41;
        border-radius: 8px 8px 0 0;
        border-bottom: 2px solid #e8972c;
      }
    }

    .van-tabs__line {
      display: none;
    }
  }
}
</style>
<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main">
      <div class="tabBox">
        <van-tabs v-model="active" class="myTab" background="#29282e" title-active-color="#e8972c"
          title-inactive-color="#fff" color="yellow" type="line" @click="tabHandelClick">
          <van-tab :title="item.name" v-for="item in tabList" :key="item.id"></van-tab>
        </van-tabs>
        <div class="tabChildren isContent" :class="listType" v-if="active === 1">
          <div class="isContent_list">
            <div class="isContent_item">
              <span>持有成本</span>
              <span>P/L</span>
            </div>
            <div class="isContent_item">
              <span class="text_red">{{ HoldingsTotal.name_price }}</span>
              <span class="text_green">{{ HoldingsTotal.pl_price }}</span>
            </div>
          </div>
          <div class="isContent_list">
            <div class="isContent_item">
              <span>持有市场价</span>
              <span>P/L</span>
            </div>
            <div class="isContent_item">
              <span class="text_red">{{ HoldingsTotal.name_price2 }}</span>
              <span class="text_green">{{ HoldingsTotal.pl_price2 }}%</span>
            </div>
          </div>
        </div>
        <div class="tabChildren isContent" :class="listType" v-else>
          <div class="isContent_list">
            <div class="isContent_item">
              <span>持有成本</span>
              <span>P/L</span>
            </div>
            <div class="isContent_item">
              <span class="text_red">{{ HoldingsTotal2.name_price }}</span>
              <span class="text_green">{{ HoldingsTotal2.pl_price }}</span>
            </div>
          </div>
          <div class="isContent_list">
            <div class="isContent_item">
              <span>持有市场价</span>
              <span>P/L</span>
            </div>
            <div class="isContent_item">
              <span class="text_red">{{ HoldingsTotal2.name_price2 }}</span>
              <span class="text_green">{{ HoldingsTotal2.pl_price2 }}%</span>
            </div>
          </div>
        </div>

      </div>
      <my-list :proList="proList" :listType="listType" @changeData="changeData" :state="state" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import MyTab from "../../components/MyTab.vue";
import MyList from "../../components/MyList.vue";
import * as api from "@/axios/api";
//mock数据
import { orderTabList as tabList, stockList, holdingList } from "../../mock";

export default {
  data() {
    return {
      state: 0,
      active: 0,
      pageNum: 1,
      pageSize: 5,
      proList: {},
      tabList: [
        {
          id: "0",
          name: "持有列表",
          childrenType: "content",
          // children: [
          //   {
          //     name: "持有成本",
          //     name_price: "",
          //     plName: "P/L",
          //     pl_price: ""
          //   },
          //   {
          //     name: "持有市场价",
          //     name_price: "",
          //     plName: "P/L",
          //     pl_price: ""
          //   }
          // ]
        },
        {
          id: "2",
          name: "售出列表",
          childrenType: "content",
          // children: [
          //   {
          //     name: "持有成本",
          //     name_price: "",
          //     plName: "P/L",
          //     pl_price: ""
          //   },
          //   {
          //     name: "持有市场价",
          //     name_price: "",
          //     plName: "P/L",
          //     pl_price: ""
          //   }
          // ]
        }
      ],
      stockList,
      listType: "MyCard",
      HoldingsTotal2: {},
      HoldingsTotal: {
        // nowPrice:0,
        // orderTotalPrice:0,
        // percentage:0,
        // profitMoney:0
      }
    };
  },
  components: {
    Footer,
    Header,
    MyTab,
    MyList,
  },
  mounted() {
    this.getHoldingsList(1, 0)
    this.getHoldingsTotal(0)
  },
  methods: {
    changeData(...agrs) {
      console.log('changeData---', agrs)
      if (typeof this[agrs[1]] === 'function') {
        this[agrs[1]](agrs[0]);
      }
    },
    getHoldingsTotal(state) {
      let totalObj = {
        pKey: sessionStorage.getItem('pKey'),
        state: state,
        pageNum: 1,
        pageSize: 1,
      }
      let totalRes = api.getUserPropertyTotal(totalObj);
      totalRes.then(result => {
        console.log('result---', result)

        // this.HoldingsTotal = result.data
        if (state === 1) {
          this.HoldingsTotal = {
            name_price: result.data.orderTotalPrice.toLocaleString('en-US'),
            pl_price: result.data.profitMoney.toLocaleString('en-US'),
            name_price2: result.data.nowPrice.toLocaleString('en-US') ? result.data.nowPrice.toLocaleString('en-US') : '',
            pl_price2: result.data.percentage.toLocaleString('en-US')
          }
        } else {
          this.HoldingsTotal2 = {
            name_price: result.data.orderTotalPrice.toLocaleString('en-US'),
            pl_price: result.data.profitMoney.toLocaleString('en-US'),
            name_price2: result.data.nowPrice.toLocaleString('en-US') ? result.data.nowPrice.toLocaleString('en-US') : '',
            pl_price2: result.data.percentage.toLocaleString('en-US')
          }
        }


        // this.tabList[state].children = [
        //   {
        //     name: "持有成本",
        //     name_price: result.data.orderTotalPrice.toLocaleString('en-US'),
        //     plName: "P/L",
        //     pl_price: result.data.profitMoney.toLocaleString('en-US')
        //   },
        //   {
        //     name: "持有市场价",
        //     name_price: result.data.nowPrice.toLocaleString('en-US') ? result.data.nowPrice.toLocaleString('en-US') : '',
        //     plName: "P/L",
        //     pl_price: result.data.percentage.toLocaleString('en-US')
        //   }
        // ];
      });
      console.log(this.tabList);
    },
    async getHoldingsList(pageNum, state) {
      let obj = {
        pKey: sessionStorage.getItem('pKey'),
        state: state || this.state,
        pageNum: pageNum || this.pageNum,
        pageSize: this.pageSize,
      }
      let data = await api.getOrderList(obj);
      try {
        if (data.status === 0) {
          let holdingList = {
            tabList: [],
            holdingList: {
              total: data.data.total, //总数
              list: []
            },
            lastPage: data.data.lastPage || Math.ceil(data.data.total / this.pageSize),
            fn: 'getHoldingsList',
          }
          if (pageNum === 1) {
            holdingList.holdingList.list = data.data.list
            this.proList = holdingList
          } else {
            this.proList.holdingList.list.push(...data.data.list)
          }
          this.proList.pageNum = pageNum
        }
      } catch (error) {
        console.log(error)
      }
    },
    tabHandelClick(oneTabItemData, childrenTabItemData) {
      if (oneTabItemData === '持有列表') {
        this.getHoldingsList(1, 0)
        this.getHoldingsTotal(0)
        this.state = 0
      } else {
        this.getHoldingsList(1, 1)
        this.getHoldingsTotal(1)
        this.state = 1
      }
    },
  },
};
</script>
