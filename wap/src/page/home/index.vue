<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main">
      <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
        <swiper-slide class="swiper-slide" v-for="item in stockList" :key="item.id" style="border-radius: 16px;">
          <div class="stock_title">
            <b>{{ item.indexName }}</b>{{ item.maxNum }}
          </div>
          <div class="stock_price " :class="numberColorFn(item.volumePoint) ? 'text_red' : 'text_green'">{{
            Number(item.volumePoint)}}
          </div>
<!--          <div class="stock_price " :class="numberColorFn(item.currentPoint) ? 'text_red' : 'text_green'">{{-->
<!--              Number(item.currentPoint).toFixed(2) }}-->
<!--          </div>-->
          <div class="stock_percentage">
            <span :class="numberColorFn(item.floatPoint) ? 'text_red' : 'text_green'">{{ item.floatPoint }}</span>
<!--            <span :class="numberColorFn(item.floatRate) ? 'text_red' : 'text_green'">{{ item.floatRate }}%</span>-->
            <span :class="numberColorFn(item.currentPoint) ? 'text_red' : 'text_green'">{{ Number(item.currentPoint).toFixed(2) }}</span>
          </div>
        </swiper-slide>
      </swiper>
      <my-tab :tabList="tabList" @tabHandelClick="tabHandelClick" :activeFromIndex="active" />
      <my-list :proList="proList" :listType="listType" @changeData="changeData" :fromListType="fromListType"
        @changeListData="changeListData" />
    </div>
    <Footer />
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { Toast } from "vant";
import * as api from '@/axios/api'
import { numberColor } from '@/utils/utils'
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MyTab from "../../components/MyTab";
import MyList from "../../components/MyList";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
// import { apikey } from '@/utils/shuhaikeji'


export default {
  data() {
    return {
      active: 0,
      fromListType: 'Theo dõi biểu',
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
          name: "Theo dõi biểu"
        },
        {
          id: "1",
          name: "Biểu thị trường",
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
            },
            {
              navID: "3",
              name: "VN30"
            },
            {
              navID: "4",
              name: "HNX30"
            }
          ]
        },
        {
          id: "2",
          name: "ESOP",
          childrenType: "nav", //是否有二级菜单， 二级的类型
          children: [
            {
              navID: "0",
              name: "ESOP"
            },
            {
              navID: "1",
              name: "Danh mục"
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
  mounted() {
    this.getMarket()
    // console.log(11111111, sessionStorage.getItem('oneTabItemData'))
    // console.log(222222, sessionStorage.getItem('childrenTabItemData'))
    if (sessionStorage.getItem('oneTabItemData')) {
      if (sessionStorage.getItem('oneTabItemData') === 'Theo dõi biểu') {
        this.active = 0
        this.getUserStock()
      } else if (sessionStorage.getItem('oneTabItemData') === 'Biểu thị trường' && sessionStorage.getItem('childrenTabItemData')) {
        this.getStock(1, sessionStorage.getItem('childrenTabItemData'))
        this.active = 1
      } else if (sessionStorage.getItem('oneTabItemData') === 'ESOP') {
        this.active = 2
        if (sessionStorage.getItem('childrenTabItemData') === 'ESOP') {
          this.getNewlist(1)
        } else if (sessionStorage.getItem('childrenTabItemData') === 'Danh mục') {
          this.getendorseList(1)
        }
      }
    } else {
      this.getUserStock()
      this.active = 0
    }
  },
  methods: {
    showLoading() {
      Toast({
        className: "login_toast",
        icon: require("../../assets/images/login/loading.gif"),
        // duration: 0,
        overlay: true
        // onClose: () => {
        //   this.$router.push("/userInfo");
        // },
      });
    },
    closeLoading() {
      Toast.clear()
    },
    changeListData() {
      this.getUserStock()
    },
    numberColorFn(val) {
      return numberColor(val)
    },
    changeData(...agrs) {
      if (typeof this[agrs[1]] === 'function') {
        this[agrs[1]](agrs[0]);
      }
    },
    /**
     *红利股申请列表
     */
    async getendorseList(pageNum) {
      try {
        let phone = this.$store.state.userInfo.phone
        if (!phone) {
          let userInfo = await api.getUserInfo()
          if (userInfo.status === 0) {
            phone = userInfo.data.phone
          }
        }
        const option = { pageNum: pageNum || this.pageNum, pageSize: this.pageSize, phone }
        let data = await api.endorseList(option)
        if (data.status === 0) {
          this.closeLoading()
          let stateList = {
            tabList: [
              {
                name: "Mã CK",//股码
                isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
              },
              {
                name: "Giá mua",//购买价
                isChange: 0
              },
              {
                name: "lề",//保证金
                isChange: 0
              },
              {
                name: "Số lượng",//购买数量
                isChange: 0
              },
              {
                name: "Đòn bẩy",//杠杆
                isChange: 0
              },
              {
                name: "Xét duyệt",//审核状态
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
          if (pageNum === 1) {
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
      try {
        const option = { pageNum: pageNum || this.pageNum, pageSize: this.pageSize }
        let data = await api.Newlist(option)
        console.log('getNewlist-----', data)
        if (data.status === 0) {
          this.closeLoading()
          let welfareESOP = {
            tabList: [
              {
                name: "Mã CK",// 股码
                isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
              },
              {
                name: "Giá thị trường",//红利股市场价
                isChange: 0
              },
              {
                name: "Giá phát hành",//交易所发行价
                isChange: 0
              },
              {
                name: "Đặt lệnh",
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
      // let isNew = ['VN30', 'HNX30'].includes(stockPlate);
      let opt = {
        pageNum: pageNum || this.pageNum,
        pageSize: this.pageSize,
        stockPlate: stockPlate || this.stockPlate,
      }

      let data = await api.getStock(opt)
      // let data = isNew ? await api.wifeedDutop({
      //   san: stockPlate || this.stockPlate,
      //   apikey
      // }) : await api.getStock(opt);

      // if (isNew) {
      //   let replaceData = {
      //     list: [],
      //     total: data.data.length,
      //     lastPage: 1
      //   };
      //   data.status = data.msg ? 1 : 0;
      //   data.data.map(result => {
      //     replaceData.list.push({
      //       name: result.mack,
      //       nowPrice: result.high_root,
      //       changedRatio: result.changedratio ? result.changedratio : 0, //涨幅度百分比
      //       floorPrice: result.changed, //涨幅度金额
      //       volume: result.volume_root
      //     })
      //   })
      //   data.data = replaceData
      // }

      if (data.status === 0) {
        this.closeLoading()
        let marketListData = {
          tabList: [
            {
              name: "Mã CK",
              isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
            },
            {
              name: "Khớp",
              isChange: 0
            },
            {
              name: "",
              isChange: 1
            },
            {
              name: "Tổng KL",
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
        if (pageNum === 1) {
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
      this.showLoading()
      console.log('pageNum', pageNum)
      let opt = {
        keyWords: this.keywords,
        pageNum: pageNum || this.pageNum,
        pageSize: 15,
        pKey: sessionStorage.getItem('pKey')
      }
      let data = await api.getMyList(opt)
      if (data.status === 0) {
        this.closeLoading()
        let watchListData = {
          tabList: [
            {
              name: "Mã CK",
              isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
            },
            {
              name: "Khớp",
              isChange: 0
            },
            {
              name: "",
              isChange: 1
            },
            {
              name: "Tổng KL",
              isChange: 0
            },
            {
              name: "Đặt lệnh",
              isChange: 0,
              actionClass: "del" //操作类型，删除  购买
            }
          ],
          watchListData: {
            total: data.data.total, //总数
            list: []
          },
          lastPage: data.data.lastPage,
          fn: 'getUserStock'
        }

        if (!pageNum || pageNum === 1) {
          watchListData.watchListData.list = data.data.list
          this.proList = watchListData
        }
        else {
          this.proList.watchListData.list.push(...data.data.list)
        }
      } else {
        Toast(data.msg)
      }
    },
    tabHandelClick(oneTabItemData, childrenTabItemData) {
      this.showLoading()
      this.fromListType = oneTabItemData.name

      sessionStorage.setItem('oneTabItemData', oneTabItemData.name);
      if (oneTabItemData.name !== 'Theo dõi biểu') {
        sessionStorage.setItem('childrenTabItemData', childrenTabItemData.name);
      }
      //模拟不同数据// /后面根据真实id发交易
      if (oneTabItemData.name === "Theo dõi biểu") {
        // 关注列表
        // this.proList = watchListData;
        this.active = 0
        this.getUserStock(1)
      } else if (
        oneTabItemData.name === "Biểu thị trường"
      ) {
        this.active = 1
        //市场列表
        // this.proList = marketListData;
        this.getStock(1, childrenTabItemData.name)
        this.stockPlate = childrenTabItemData.name
      } else if (
        oneTabItemData.name === "ESOP"
      ) {
        this.active = 2
        // 福利股列表
        if (childrenTabItemData.name == 'ESOP') {
          this.getNewlist(1)
        } else if (childrenTabItemData.name == 'Danh mục') {
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
