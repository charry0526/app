<template>
  <div :class="`list-content-wrapper ${$state.theme === 'red' ? 'red-theme' : 'black-theme'}`">

    <ul class="table-list list-table-title">
      <li class="title">
        <div>
          <ul class='clearfix'>
            <li class="li-title">Mã CK<img :src="sortIcon" alt=""></li>
            <li class="li-base">Giá khớp lệnh<img :src="sortIcon" alt=""></li>
            <li class="li-base"> %+/- <img :src="sortIcon" alt=""></li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="list-table-body">
      <ul class="table-list table-list-body"

          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li class="list-body" v-for="item in list" :key="item.key">
          <div>
            <ul class="clearfix"
                :class="item.nowPrice-item.preclose_px<0?'green':item.nowPrice-item.preclose_px==0?'':'red'"
                @click='toDetail(item)'>
              <li class="li-title">
                <p class="name">

                  <!-- <img
                  @click.stop="toDeleteMy(item)"
                  v-if="item.isOption == '1'" :src="require(`../../../static/img/list/${$state.theme === 'red' ? 'red-' : ''}loved-icon.png`)" alt=""> -->
                  <!-- <img
                  @click.stop="toDeleteMy(item)"
                  v-if="item.isOption == '1'" src="../../assets/ico/loved-icon.png" alt="">
                  <img v-else
                  @click.stop="addOptions(item)"
                  :src="require(`../../../static/img/list/${$state.theme === 'red' ? 'red-' : ''}love-icon.png`)" alt=""> -->
                  {{item.mack}}
                </p>
                <!-- <p class="code" style="padding-left: 0px">
                  <span class="code-wra">{{item.code}}</span>
                  <i class="iconfont kechuang-mark">{{searchKey}}</i>
                </p> -->
              </li>
              <li class="li-base" >
                <span v-if="item.hcrate == 0" class="yellow">
                  {{item.nowPrice?Number(item.nowPrice/1000).toFixed(2):'-'}}
                </span>
                <span v-else-if="item.hcrate < 0" class="red">
                  {{item.nowPrice?Number(item.nowPrice/1000).toFixed(2):'-'}}
                </span>
                <span v-else class="green">
                  {{item.nowPrice?Number(item.nowPrice/1000).toFixed(2):'-'}}
                </span>
              </li>
              <li class="li-base">
                <!-- <span v-if="item.hcrate == 0" class="yellow">-</span>
                <span v-else-if="item.hcrate < 0" class="red"> {{item.hcrate?item.hcrate/1000:'0'}}  {{Number(item.hcrate/(item.nowPrice-item.hcrate)*100).toFixed(2)}}%</span>
                <span v-else class="green"> {{item.hcrate?(item.hcrate/1000).toFixed(2):'0'}} {{Number(item.hcrate/(item.nowPrice-item.hcrate)*100).toFixed(2)}}%</span> -->

              </li>
              <!-- <li class="li-base no-bold">
                <span v-if="item.nowPrice == 0">-</span>
                <span
                  v-else>{{item.nowPrice-item.preclose_px>0 ?'+':''}}{{(item.nowPrice-item.preclose_px).toFixed(2)}}</span>
              </li> -->
            </ul>
          </div>

        </li>
      </ul>
      <div v-if="list.length<0" class="load-all text-center">
        <mt-spinner type="fading-circle"></mt-spinner>
      </div>
      <div v-if="!loading &&list.length==0" class="load-all text-center">
        {{$t("noData")}}
      </div>
      <!-- <div v-show="loading" class="load-all text-center">
        <mt-spinner type="fading-circle"></mt-spinner>
        {{$t("loading")}}...
      </div> -->
      <div v-show="!loading && list.length>0" class="load-all text-center">
        {{$t("allLoaded")}}
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '../../components/foot/foot'
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'
import { apikey } from '@/utils/shuhaikeji'
import { timestampToTime } from '@/utils/utils'
export default {
  components: {
    foot
  },
  props: {
    selectedNumber: {
      type: String
    }

  },
  data () {
    return {
      loading: false,
      pageNum: 0,
      pageSize: 15,
      currentNum: 15,
      list: [],
      timer: '',
      market: [],
      changeTextClass: {},
      sortIcon: require('../../../static/img/list/sort-icon.png'),
      searchKey: ''
    }
  },
  watch: {
    // selectedNumber (val) {
    //   let keyArr = {
    //     4: 'vn30',
    //     5: 'hnx30'
    //   }
    //   if (val == 4 || val == 5) {
    //     this.searchKey = keyArr[val]
    //     this.pageNum++
    //     this.getStock()
    //     this.timer = setInterval(this.refreshList, 60000)
    //   } else {
    //     clearInterval(this.timer)
    //   }
    // }
  },
  computed: {},
  created () {
    this.selectedNum(this.selectedNumber)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
  },
  methods: {
    selectedNum (val) {
      let keyArr = {
        4: 'vn30',
        5: 'hnx30'
      }
      if (val == 4 || val == 5) {
        this.searchKey = keyArr[val]
        this.pageNum++
        this.getStock()
        this.timer = setInterval(this.refreshList, 60000)
      } else {
        clearInterval(this.timer)
      }
    },
    // async addOptions (val) {
    //   let data = await api.addOption({ code: val.code })
    //   if (data.status === 0) {
    //     // Toast('添加自选成功')
    //     Toast('Thêm thành công tùy chọn')
    //   } else {
    //     Toast(data.msg)
    //   }
    // },
    // async toDeleteMy (val) {
    //   let data = await api.delOption({ code: val.code })
    //   if (data.status === 0) {
    //     // Toast('删除自选股成功')
    //     Toast('Xóa hàng tự chọn thành công')
    //     this.refreshList()
    //   } else {
    //     Toast(data.msg)
    //   }
    // },
    async getStock () {
      let opt = {
        apikey
        // code: this.searchKey,
        // 'to-date': timestampToTime(),
        // 'from-date': timestampToTime()
      }
      let {data} = await api.wifeedDutop(opt)
      if (data.length == 0) return this.loading = false
      this.loading = true
      // data.forEach(element => {
      //   this.list.push(element)
      // })
      this.list = data

      // this.total = data.data.total
    },
    async refreshList () {
      if (this.loading) {
        return
      }
      let opt = {
        apikey,
        code: this.searchKey,
        'to-date': timestampToTime(),
        'from-date': timestampToTime()
      }
      let data = await api.wifeedDutop(opt)
      this.list = data
    },
    async loadMore () {
      // if (this.list.length < 10 || this.pageNum * this.pageSize >= this.total) {
      //   return
      // }
      this.loading = true
      // clearInterval(this.timer)
      // 加载下一页
      // this.pageNum++
      // this.currentNum = this.pageNum * this

      await this.getStock()
      this.loading = false
    },
    toDetail (val) {
      // 详情
      this.$router.push({
        path: '/listdetail2',
        query: {
          code: val.mack,
          stock_type: this.searchKey
          // name: val.name
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
  @fontColor: #cfd0d1;

  .table-list-body {
    // padding-top: 1.3rem;
    // margin-top: 40px;
  }

  .table-list {

    .li-title {
      width: 34%;
    }

    .li-base {
      width: 22%;
      text-align: center;

      &.no-bold {
        span {
          font-weight: 400;
        }
      }
    }
  }

  .table-list .title {
    // position: static;
  }

  .page-part {
    margin-top: 40px;
    margin-bottom: 0px;
    border-bottom: 0.027rem solid #202020;

    .box-title {
      border-bottom: 0.027rem solid #202020;
      background-color: #1f523c;
      animation: obgFadeOut .8s ease forwards;
    }
  }

  @keyframes obgFadeOut {
    to {
      background: rgba(0, 0, 0, 0)
    }
  }

  .box-title {
    background-color: #5c1d29;
  }

  /*大盘指数*/
  .box-contain {
    .more {
      position: absolute;
      right: 0;
      padding-top: 0.5rem;
      padding-right: 0.2rem;
      cursor: pointer;
    }

    .tab {
      float: left;
      width: 31%;
      margin: 0.05rem 0.5%;
      margin-top: 0;
      text-align: center;
      padding: 0.1rem 0;
      background: none !important;

      p {
        margin-top: 0.1rem;
      }

      .name {
        color: @fontColor;
        font-size: .22rem;
      }

      .price {
        font-size: 0.34rem;
      }

      .status {
        margin-top: 0.1rem;
        font-size: .22rem;
      }
    }
  }

  .list-content-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    .list-table-title{
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .title{
        position: relative;
        top: 0;
        left: 0;
        ul{
          li{
            font-size:0.28rem;
            font-family:MicrosoftYaHeiLight;
            font-weight:400;
            color:rgba(255,255,255,0.5);
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 0.15rem;
              margin-left: 0.06rem;
            }
            &.li-title{
              width: 40%;

            }
            &.li-base{
              width: 30%;
            }
          }
        }
      }
    }
    .list-table-body{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      padding: 0.6rem 0 .8rem;
      >.table-list{
         >li:nth-child(odd){
          background-color: #212025;
        }
      }
      ul{

        li.li-base{
          width: 30%;
          span{
            font-size:0.26rem;
            font-family:MicrosoftYaHeiLight;
            font-weight:400;
          }

          span.red{
            color:rgba(255,0,0,1);
          }
          span.yellow{
            color:rgb(226, 107, 10);
          }
          span.green{
            color: rgb(0, 128, 0);
          }
        }
        .li-title{
          width: 40%;
          display: flex;
          align-items: center;
          .name{
            color: #fff;
            width: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            margin-top: 0.05rem;
            justify-content: center;
            // margin-right: .1rem;
            img{
              width: 0.32rem;
              margin-right: 0.05rem;
            }
          }
          .code{
            width: 100%;
            display: flex;
            align-items: center;
          }
          .kechuang-mark{
            // color: #138EB4;
            color:#BC9563;
            background: none;
            margin-left: 0.1rem;
            // border:1px solid rgba(20, 142, 180, 1);
            border:1px solid #BC9563;

            // width: 0.65rem;
            height: 0.28rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.1rem;
            // padding: 0;
            padding: 0.16rem 0.1rem;
          }
          .code-wra{
            // width: 1.35rem;
            height: 0.38rem;
            // display: block;
            // background: url(/static/img/list/code-bg.png) no-repeat;
            // background-size: contain;
            // background-color: #138EB4;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.05rem;
            color: white;
            position: relative;
            margin-left: 0.37rem;
            &::before{
              content: '';
              display: block;
              width: 0;
              height: 0;
              border-top: 0.1rem solid transparent;
              border-right: 0.15rem solid #138EB4;
              border-bottom: 0.1rem solid transparent;
              position: absolute;
              left: 0;
              top: 50%;
              margin-top: -0.095rem;
              left: -0.1rem;
              display: none;
            }
          }
        }

      }
    }
  }
  .red-theme{
     background: white;
    .table-list{
      ul{
        li{
          border-color: #f7f7f7;
        }
      }
    }
    .list-table-title{
      .title{
        background: white;
        ul{
          li{
            color: #212121;
          }
        }
      }
    }
    .list-table-body{
      li.li-title{
        .name{
          color: #000;
        }
        .code{
          i{
            color: #BB1715 !important;
            border-color: #BB1715 !important;
          }
        }
        .code-wra{
          color: #BB1715 !important;
        }
        .futures-code{
          color: #BB1715 !important;
        }
      }
    }
    .load-all{
      background-color: #e9e9e9;
      color: #000;
    }
  }
</style>
