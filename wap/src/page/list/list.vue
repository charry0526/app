<template>
  <div :class="`wrapper ${$state.theme === 'red' ? 'red-theme' : 'black-theme'}`">
    <!-- <mt-header v-if="selected == '2'" fixed  title="">
        <router-link to="/" slot="left">
        </router-link>
        <mt-button slot="right" icon="search" @click="toSearch"></mt-button>
    </mt-header> -->
    <mt-navbar class="top-navbar" v-model="selected" :style="selected != '7'?'':''" :fixed="selected != '7'?true:false">
      <!-- <mt-tab-item id="0">全部</mt-tab-item> -->
      <!-- <mt-tab-item v-if="this.$store.state.settingForm.indexDisplay" id="1">指数</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.stockDisplay" id="2">沪深</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.stockDisplay" id="5">港股</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.stockDisplay" id="6">美股</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.kcStockDisplay" id="3">科创</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.futuresDisplay" id="4">期货</mt-tab-item>  -->
      <mt-tab-item id="1">HSX</mt-tab-item>
      <mt-tab-item id="2">HNX</mt-tab-item>
      <mt-tab-item id="3">UPCOM</mt-tab-item>
      <mt-tab-item id="4">VN30</mt-tab-item>
      <mt-tab-item id="5">HNX30</mt-tab-item>
    </mt-navbar>
    <div class="content">
      <div :class="i.floatPoint>0?'tab greenBg':'tab redBg'" v-for="(i,index) in market" v-if="index < 3"
                  :key="i.key">
          <p :index='index' class="name">{{i.indexName}}</p>
          <p :class="changeTextClass[index] == true?'price heartBeat':'price'">
            {{$moneyDot(Number(i.currentPoint).toFixed(2))}}
          </p>
<!--          <div class="status">-->
<!--              <span :class="i.floatPoint>0?'pifting green':'pifting red'">{{Number(i.floatPoint).toFixed(2)}}</span>-->
<!--              <span :class="i.floatRate>0?'Percentage green':'Percentage red'">{{i.floatRate}}%</span>-->
<!--          </div>-->
      </div>
    </div>

    <mt-tab-container class="order-list" v-model="selected">
      <!-- <mt-tab-container-item id="0">
          <List0 :changeNavOptions='changeNavOptions'/>
      </mt-tab-container-item> -->
      <!-- <mt-tab-container-item v-if="this.$store.state.settingForm.indexDisplay" id="1">
        <List1 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item v-if="this.$store.state.settingForm.stockDisplay" id="2">
        <List2 :selectedNumber='selected'/>
      </mt-tab-container-item>

      <mt-tab-container-item v-if="this.$store.state.settingForm.stockDisplay" id="5">
        <List5 :selectedNumber='selected'/>
      </mt-tab-container-item>

      <mt-tab-container-item v-if="this.$store.state.settingForm.stockDisplay" id="6">
        <List6 :selectedNumber='selected'/>
      </mt-tab-container-item>

      <mt-tab-container-item v-if="this.$store.state.settingForm.kcStockDisplay" id="3">
        <List3 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item v-if="this.$store.state.settingForm.futuresDisplay" id="4">
        <List4 :selectedNumber='selected'/>
      </mt-tab-container-item> -->
      <mt-tab-container-item id="1">
        <List1 :selectedNumber='selected'/>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <List2 :selectedNumber='selected'/>
      </mt-tab-container-item>

      <mt-tab-container-item id="3">
        <List3 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <List4 v-if="selected==4" :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <List4 v-if="selected==5" :selectedNumber='selected'/>
      </mt-tab-container-item>
    </mt-tab-container>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot/foot'
// import '@/assets/style/common.less'
// import List0 from './list-all'
// import List1 from './list-index'
// import List2 from './list-stock'
// import List3 from './list-kechuang'
// import List4 from './list-futures'
// import List5 from './list-gangu'
// import List6 from './list-meigu'

import List1 from './list-HSX'
import List2 from './list-HNX'
import List3 from './list-UPCOM'
import List4 from './list-vn'
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'

export default {
  components: {
    foot,
    // List0,
    List1,
    List2,
    List3,
    List4
    // List4,
    // List5,
    // List6
  },
  props: {},
  data () {
    return {
      market: [],
      changeTextClass: {},
      selected: '' // 选中
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getProductSetting()
    if (!this.$store.state.userInfo.phone) {
      this.getUserInfo()
    }
  },
  mounted () {
    if (this.$route.query.index) {
      this.selected = this.$route.query.index
    }
    this.getMarket()
  },
  methods: {
    async getMarket () {
      // 获取大盘指数
      let result = await api.getIndexMarket()
      if (result.status === 0) {
        this.market = result.data
      } else {
        Toast(result.msg)
      }
    },
    toSearch () {
      this.$router.push('/searchlist')
    },
    changeNavOptions (opts) {
      this.selected = opts
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
    async getProductSetting () {
      let data = await api.getProductSetting()
      if (data.status === 0) {
        this.$store.state.settingForm = data.data
        // 1 指数 2 沪深 3科创 4 期货
        if (this.$store.state.settingForm.indexDisplay) {
          this.selected = '1'
        } else if (this.$store.state.settingForm.stockDisplay) {
          this.selected = '2'
        } else if (this.$store.state.settingForm.kcStockDisplay) {
          this.selected = '3'
        } else {
          this.selected = '4'
        }
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .is-selected .mint-tab-item-label:hover {
    text-decoration: none;
  }

  .wrapper /deep/ .mint-tab-item-label {
    font-size: 0.264rem;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #d50000;
    text-decoration: none;
  }

  .nav-wrapper {
    padding-top: 0.8rem;
  }

  .mint-tab-container-item {
    // padding-top: 1.2rem;

    .mint-button--default {
      padding: 0 0.2rem;
      font-size: 0.24rem;
      height: 0.5rem;
      margin: 0.2rem 0.2rem 0;
      color: #607d8b;
      box-shadow: 0 0 1px #3b71b9;
      background: none;
    }
  }

  .mint-navbar {
    box-shadow: 0px 0px 4px rgba(6, 0, 1, 0.2);

    .mint-tab-item {
      // background: #21252a;
      padding: 0.2rem 0;

      &.is-selected {
        border: none;
        margin-bottom: 0;
      }

      .mint-tab-item-label {
        font-size: 0.22rem;
      }

      .iconfont {
        display: block;
        font-size: 0.46rem;
        margin-bottom: 0.12rem;
      }
    }
  }

  .top-navbar {
    .mint-tab-item {
      padding: 0.2rem 0;
      width: 1.42rem;
      // height: 0.44rem;
      margin: 0.3rem 0.1rem 0 0.1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.01rem;
    }
  }
  .wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: 1rem;
    .top-navbar{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      margin-left:0;
      background: none;
      box-shadow: none;
      border-bottom: .07rem solid #2B2A2F;
      width: 100%;
      padding: 0 .4rem;
      /deep/.mint-tab-item{
        background: transparent;
        .mint-tab-item-label{
          font-size:0.22rem;
          font-family:MicrosoftYaHeiLight;
          font-weight:400;
          color:rgba(255,255,255,1);

        }
        &.is-selected{
          position: relative;
          // background:linear-gradient(0deg,rgba(27,166,208,1),rgba(2,116,150,1));
          background: #343338;
          // border-bottom: 0.07rem solid #BA9261;
          // padding: 0.1rem;

          border-top-left-radius: .1rem;
          border-top-right-radius: .1rem;
          .mint-tab-item-label{
            color: #DF9F3E !important;
          }
          &::after{
            position: absolute;
            content: '';
            display: block;
            width: 100%;
            height: 0.07rem;
            background-color: #DF9F3E;
            bottom: -0.06rem;
            left: 0;
            // margin-left: -0.335rem;
            // display: none;
            // border-bottom: 0.07rem solid #BA9261;
          }
        }
      }
    }
    .order-list{
      width: 100%;
      height: 100%;
      /deep/.mint-tab-container-wrap{
        width: 100%;
        height: 100%;
      }
    }
  }
  .top-search{
    padding: .2rem;
    .top-search-btn {
      background-color: #16171d;
      padding: .1rem .2rem;
      width: 1.60rem;
      text-align: center;
      border-radius: .2rem;
      color: #fff;
      border: 1px solid rgb(96, 125, 139);
      margin: 0 auto;
    }
  }
  .red-theme{
     .top-search-btn {
       border-color: #000;
       color: #000;
       background-color: #fff;
     }
    .top-navbar{
      /deep/.mint-tab-item{
        background-color: #CBCBCB;
        .mint-tab-item-label{
          color: #000;
        }
        &.is-selected{
          background: #BB1715;
          .mint-tab-item-label{
            color: #fff;
          }
        }
      }
    }
  }
   .content {
    width:6.86rem;
    height: 1.72rem;
    margin: .2rem auto;
    // padding: 0 0.14rem;
    padding: 0;
    display: flex;
    justify-content: space-between;
      .tab {
        width: 2.04rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: .25rem 0 .15rem;
        background-color: #2A292E !important;
        border-radius: 0.2rem;
        .name {
          width: 1.52rem;
          height: .4rem;
          line-height: .4rem;
          // border:1px solid rgba(255, 255, 255, .2);
          border-radius: .2rem;
          font-size: .24rem;
          text-align: center;
        }
        .price {
          font-size: .24rem;
        }
        .status {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 .1rem;
          color: #fff8;
          &::before{
            display: none;
            position: absolute;
            content: '';
            width: 100%;
            height: 1px;
            left: 0%;
            top: -.1rem;
            background-color: #fff3;
          }
        }
      }
    }
.table-list .title{
  background: #353338;
}
  //  .tab {
  //     float: left;
  //     width: 31%;
  //     margin: 0.05rem 1%;
  //     margin-top: 0;
  //     text-align: center;
  //     padding: 0.1rem 0;
  //     background: none !important;

  //     p {
  //       margin-top: 0.1rem;
  //     }

  //     .name {
  //       font-size: .22rem;
  //     }

  //     .price {
  //       font-size: 0.34rem;
  //     }

  //     .status {
  //       margin-top: 0.1rem;
  //       font-size: .22rem;
  //     }
  //   }

</style>
