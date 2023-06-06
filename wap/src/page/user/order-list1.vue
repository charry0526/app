<template>
  <div class="wrapper">
    <!-- <mt-header fixed  title="我的持���">
        <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header> -->
    <mt-navbar class="sub-navbar" v-model="selected">
      <mt-tab-item id="1">{{$t("myPosition")}}</mt-tab-item>
      <mt-tab-item id="2">{{$t("myClosingPosition")}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="order-list" v-model="selected">
      <mt-tab-container-item id="1">
        <!-- <div class="text-center">
          <mt-button @click="toSearchName" type="default">{{$t("queryOrders")}}</mt-button>
          <mt-button @click="toSearchCode" type="default">{{$t("queryCodeOrders")}}</mt-button>
        </div> -->
        <holdPosition :selectedNumber='selectedNumber' :handleOptions='handleOptions'/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- <div class="text-center">
          <mt-button @click="toSearchName2" type="default">{{$t("queryOrders")}}</mt-button>
          <mt-button @click="toSearchCode2" type="default">{{$t("queryCodeOrders")}}</mt-button>
        </div> -->
        <HistoryList :selectedNumber='selectedNumber' :hasChangeSell="hasChangeSell" :handleOptions='handleOptions'/>
      </mt-tab-container-item>
    </mt-tab-container>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot/foot'
// import '@/assets/style/common.less'
import holdPosition from './compontents/hold-position'
import HistoryList from './compontents/history-list'
import indexHoldPosition from './compontents/indexhold-position'
import indexHistoryList from './compontents/indexhistory-list'
// import * as api from '@/axios/api'

export default {
  components: {
    foot,
    holdPosition,
    HistoryList,
    indexHoldPosition,
    indexHistoryList
  },
  props: {
    selectedNumber: {
      type: String
    }
  },
  data () {
    return {
      selected: '1', // 选中
      list: [], // 持仓
      form: {
        pageNum: 1,
        pageSize: 10,
        currentNum: 10
      },
      list2: [], // 平仓
      form2: {
        pageNum: 1,
        pageSize: 10
      },
      hasChangeSell: false,
      hasChangeSell2: false
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    //   this.getListDetail()
    //   this.getListDetail2()

  },
  methods: {
    handleOptions (opts) {
      this.hasChangeSell = opts
      //   this.hasChangeSell = { ...this.hasChangeSell, ...opts};
      if (this.hasChangeSell) {
        this.selected = '2'
      }
    },
    handleOptions2 (opts) {
      this.hasChangeSell2 = opts
      if (this.hasChangeSell2) {
        this.selected = '4'
      }
    },
    toSearchName () {
      // 按照持仓名称查持仓订单
      this.$router.push({
        path: '/holdorderlist2',
        query: {
          type: 1 // 查询类型 1--> name 2--> code
        }
      })
    },
    toSearchCode () {
      // 按照持仓代码查持仓订单
      this.$router.push({
        path: '/holdorderlist',
        query: {
          type: 2 // 查询类型 1--> name 2--> code
        }
      })
    },
    toSearchName2 () {
      // 按照持仓名称查持仓订单
      this.$router.push({
        path: '/sellorderlist2',
        query: {
          type: 1 // 查询类型 1--> name 2--> code
        }
      })
    },
    toSearchCode2 () {
      // 按照持仓代码查持仓订单
      this.$router.push({
        path: '/sellorderlist',
        query: {
          type: 2 // 查询类型 1--> name 2--> code
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .sub-navbar {
    background: transparent;
    justify-content: center;
    box-shadow: none;
    border-bottom: 0.07rem solid #2B2A2F;
    width: 100%;
    padding: 0 1.3rem;
    .mint-tab-item{
          padding: 0.2rem 0;
          width: 1.42rem;
          height: auto;
          margin: 0.3rem 0.1rem 0 0.1rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-radius: 0.01rem;
          background: transparent;
       /deep/.mint-tab-item-label{
            color: #fff;
            font-size: 0.264rem;
        }
    }
    .is-selected{
      position: relative;
      background: #343338;
      border-top-left-radius: .1rem;
      border-top-right-radius: .1rem;
        /deep/.mint-tab-item-label{
            color: #DF9F3E;
        }
    }
    .is-selected::after{
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
    // background-color: #16171D !important;
    // height: .7rem;
    // justify-content: center;
    // box-shadow: none;

    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   margin-left:0;
    //   background: none;
    //   box-shadow: none;
    //   border-bottom: .07rem solid #2B2A2F;
    //   width: 100%;
    //   padding: 0 .4rem;

    // /deep/.mint-tab-item-label {
    //     font-size: .24rem;
    //   }
    // .mint-tab-item {
    //   position: relative;
    //   flex-grow: 0;
    //   flex-shrink:1;
    //   flex-basis:auto;
    //   width: 1.9rem;
    //   height: .4rem;
    //   background-color: #3D4456;
    //   padding: 0;
    //   line-height: .4rem;
    //   margin: 0.3rem .2rem 0;
    //   /deep/.mint-tab-item-label {
    //     line-height: .4rem;
    //     height: .4rem;
    //   }
    //   &.is-selected {
    //     // color: #fff;
    //     // background-color: #138EB4;
    //      position: relative;
    //       background: #343338;
    //       border-top-left-radius: .05rem;
    //       border-top-right-radius: .05rem;
    //   }
    // }
  }
  #app.red-theme {
    .sub-navbar {
      background-color: #E9E9E9 !important;
      .mint-tab-item {
        background-color: #CCCCCC;
        color: #000;
        &.is-selected {
          color: #fff;
          background-color: #BB1815;
        }
      }
    }

  }
  .text-center /deep/button{
    width:2.9rem
  }
</style>
