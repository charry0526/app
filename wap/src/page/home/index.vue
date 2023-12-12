<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main">
      <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
        <swiper-slide class="swiper-slide" v-for="item in stockList" :key="item.id">
          <div class="stock_title">
            <b>{{ item.indexName }}</b>{{ item.maxNum }}
          </div>
          <div class="stock_price text_red">{{ item.currentPoint }}</div>
          <div class="stock_percentage">
            <span class="text_red">{{ item.floatPoint }}</span>
            <span class="text_green">{{ item.floatRate }}%</span>
          </div>
        </swiper-slide>
      </swiper>
      <my-tab :tabList="tabList" @tabHandelClick="tabHandelClick" />
      <my-list :proList="proList" :listType="listType" @changeData="changeData" />
    </div>
    <Footer />
  </div>
</template>

<script>
import { apikey } from '@/utils/shuhaikeji'
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MyTab from "../../components/MyTab";
import MyList from "../../components/MyList";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
//mock数据
// import {
//   // tabList,
//   watchListData,
//   marketListData,
//   welfareESOP,
//   stateList,
// } from "@/mock";


export default {
  data() {
    return {
      keywords: '',
      pageNum: 1,
      pageSize: 15,
      stockPlate: '',
      swiperOptions: {
        slidesPerView: "3",
        spaceBetween: 10,
      },
      tabList: [
        {
          id: "0",
          name: "关注列表"
        },
        {
          id: "1",
          name: "市场列表",
          childrenType: "nav", //是否有二级菜单， 二级的类型 nav为标题形式  content为文字内容
          children: [
            {
              navID: "0",
              name: "HOSE"
            },
            {
              navID: "1",
              name: "HNX"
            },
            {
              navID: "2",
              name: "UPCOM"
            }
          ]
        },
        {
          id: "2",
          name: "福利列表",
          childrenType: "nav", //是否有二级菜单， 二级的类型
          children: [
            {
              navID: "0",
              name: "ESOP"
            },
            {
              navID: "1",
              name: "状态列表"
            }
          ]
        }
      ],
      stockList: [],
      proList: {},
      listType: "list", //my-list组件的表现形式，有例如首页的list 和订单页面的card
    };
  },
  components: {
    Footer,
    Header,
    MyList,
    MyTab,
    Swiper,
    SwiperSlide,
  },
  // computed: {
  //   swiper() {
  //     return this.$refs.mySwiper.$swiper;
  //   },
  // },
  mounted() {
    // console.log("Current Swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
    this.getMarket()
    this.getUserStock()
  },
  methods: {
    changeData(...agrs) {
      console.log('changeData---', agrs)
      if (typeof this[agrs[1]] === 'function') {
        this[agrs[1]](agrs[0]);
      }
    },
    /**
     *红利股申请列表
     */
    async getendorseList(pageNum) {
      try {
        const option = { pageNum: pageNum || this.pageNum, pageSize: this.pageSize, phone: '0000000001' }
        let data = await api.endorseList(option)
        console.log('getendorseList-----', data)
        if (data.status === 0) {
          let stateList = {
            tabList: [
              {
                name: "商品名称",
                isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
              },
              {
                name: "买入价",
                isChange: 0
              },
              {
                name: "保证金",
                isChange: 0
              },
              {
                name: "购买金额",
                isChange: 0
              },
              {
                name: "倍数",
                isChange: 0
              },
              {
                name: "状态",
                isChange: 0
              }
            ],
            stateList: {
              total: data.data.total, //总数
              list: []
            },
            lastPage: data.data.lastPage,
            fn: 'getendorseList',
          }
          if (pageNum == 1) {
            stateList.stateList.list = data.data.list
            this.proList = stateList
          } else {
            this.proList.stateList.list.push(...data.data.list)
          }
          this.proList.pageNum = pageNum
        }
      } catch (e) {
      }
    },
    /**
    * 红利股列表
    */
    async getNewlist(pageNum) {
      console.log('pageNum---', pageNum)
      try {
        const option = { pageNum: pageNum || this.pageNum, pageSize: this.pageSize }
        let data = await api.Newlist(option)
        console.log('getNewlist-----', data)
        if (data.status === 0) {
          let welfareESOP = {
            tabList: [
              {
                name: "商品名称",
                isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
              },
              {
                name: "市场价格",
                isChange: 0
              },
              {
                name: "涨幅",
                isChange: 1
              },
              {
                name: "操作",
                isChange: 0,
                actionClass: "buy" //操作类型，删除  购买
              }
            ],
            welfare: {
              total: data.data.total, //总数
              list: []
            },
            lastPage: data.data.lastPage,
            fn: 'getNewlist',
          }
          if (pageNum == 1) {
            welfareESOP.welfare.list = data.data.list
            this.proList = welfareESOP
          } else {
            this.proList.welfare.list.push(...data.data.list)
          }
          this.proList.pageNum = pageNum
        }
      } catch (e) {
        console.log(11, e)
      }
    },
    //市场列表
    async getStock(pageNum, stockPlate) {
      console.log('pageNum---', pageNum)
      let opt = {
        stockPlate: stockPlate || this.stockPlate,
        pageNum: pageNum || this.pageNum,
        pageSize: this.pageSize,
      }
      let data = await api.getStock(opt)
      console.log('getStock---', data)
      if (data.status === 0) {
        let marketListData = {
          tabList: [
            {
              name: "商品名称",
              isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
            },
            {
              name: "市场价格",
              isChange: 0
            },
            {
              name: "涨幅",
              isChange: 1
            },
            {
              name: "商品金额",
              isChange: 0
            }
          ],
          market: {
            total: data.data.total, //总数
            list: []
          },
          lastPage: data.data.lastPage,
          fn: 'getStock',
        }
        if (pageNum == 1) {
          marketListData.market.list = data.data.list
          this.proList = marketListData

        } else {
          this.proList.market.list.push(...data.data.list)
        }
        this.proList.pageNum = pageNum
      } else {
        Toast(data.msg)
      }
    },
    // 获取大盘指数
    async getMarket() {
      let result = await api.getIndexMarket()
      if (result.status === 0) {
        this.stockList = result.data
      } else {
        Toast(result.msg)
      }
    },
    //关注列表
    async getUserStock(pageNum) {
      console.log('pageNum', pageNum)
      let opt = {
        keyWords: this.keywords,
        pageNum: pageNum || this.pageNum,
        pageSize: 15,
        pKey: sessionStorage.getItem('pKey')
      }
      let data = await api.getMyList(opt)
      console.log('getUserStock----', data)
      if (data.status === 0) {
        if (pageNum) {
          if (pageNum == 1) {
            // this.proList = {}
            this.proList = {
              watchListData: {
                list: []
              }
            }
            this.proList.watchListData.list = data.data.list
          } else {
            this.proList.watchListData.list.push(...data.data.list)
          }
          this.proList.pageNum = pageNum
        } else {
          let watchListData = {
            tabList: [
              {
                name: "商品名称",
                isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
              },
              {
                name: "市场价格",
                isChange: 0
              },
              {
                name: "涨幅",
                isChange: 1
              },
              {
                name: "商品金额",
                isChange: 0
              },
              {
                name: "操作",
                isChange: 0,
                actionClass: "del" //操作类型，删除  购买
              }
            ],
            watchListData: {
              total: data.data.total, //总数
              list: data.data.list
            },
            lastPage: data.data.lastPage,
            fn: 'getUserStock'
          }
          this.proList = watchListData
        }
      } else {
        Toast(data.msg)
      }
    },
    tabHandelClick(oneTabItemData, childrenTabItemData) {
      //模拟不同数据// /后面根据真实id发交易
      if (oneTabItemData.name === "关注列表") {
        // this.proList = watchListData;
        this.getUserStock(1)
      } else if (
        oneTabItemData.name === "市场列表"
      ) {
        // this.proList = marketListData;
        this.getStock(1, childrenTabItemData.name)
        this.stockPlate = childrenTabItemData.name
      } else if (
        oneTabItemData.name === "福利列表"
      ) {
        if (childrenTabItemData.name == 'ESOP') {
          this.getNewlist(1)
        } else if (childrenTabItemData.name == '状态列表') {
          console.log(1111)
          this.getendorseList(1)
        }
      } else {
        this.proList = {
          tabList: [],
        };
      }
    },
  },
};
</script>
<style lang="less">
@import "../../assets/styles/index.less";
</style>
<style lang="less" scoped>
.swiper {
  width: calc(100% - 30px);

  .swiper-slide {
    // width: 100px !important;
    height: 76px;
    display: flex;
    align-items: center;
    flex-direction: column;
    // justify-content: center;
    background: #2c2c2e;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 0;

    .stock_title {
      font-size: 12px;

      b {
        padding-right: 10px;
      }
    }

    .stock_price {
      font-size: 14px;
      font-weight: bold;
    }

    .stock_percentage {
      font-size: 12px;

      span {
        padding: 0 2px;
      }
    }
  }
}
</style>
