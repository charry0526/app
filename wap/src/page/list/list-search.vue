<template>
  <div class="wrapper">
    <mt-button slot="right" class="search-btn-list" icon="search" @click="getStock">tìm kiếm</mt-button>
    <mt-search
      fixed
      show
      autofocus
      v-model="keywords"
      @keyup.enter.native="getStock"
      placeholder="Mã chứng khoán hoặc chính tả đơn giản"
    >
      <ul class="table-list">
        <li class="title">
          <div>
            <ul class='clearfix'>
              <li class="li-title">Mã CK</li>
              <li class="li-base">Giá hiện tại</li>
              <li class="li-base">Thay đổi </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="table-list table-list-body"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li class="list-body" v-for="item in list" :key="item.key">
          <div>
            <ul class="clearfix"
                :class="item.nowPrice-item.preclose_px<0?'green':item.nowPrice-item.preclose_px==0?'':'red'"
                @click='toDetail(item)'>
              <li class="li-title">
                <p class="name">{{item.name}}</p>
                <p class="code">
                  <i v-if="item.stock_plate != '科创'"
                     :class="item.stock_type == 'sz'?'iconfont shen-mark hushen-mark':'iconfont hushen-mark'">{{item.stock_type}}</i>
                  <i v-else class="iconfont kechuang-mark">HOSE</i>
                </p>
              </li>
              <li class="li-base">
                <span :class="item.hcrate == 0?'price yellow':item.hcrate > 0?'price green':item.hcrate<0?'price red':''">{{item.nowPrice?Number(item.nowPrice/1000).toFixed(2):'-'}}</span>
              </li>
              <li class="li-base">
                <span v-if="item.nowPrice == 0"  :class="item.hcrate == 0?'price yellow':item.hcrate > 0?'price green':item.hcrate<0?'price red':''">-</span>
                <span v-else  :class="item.hcrate == 0?'price yellow':item.hcrate > 0?'price green':item.hcrate<0?'price red':''">{{item.nowPrice-item.preclose_px>0 ?'+':''}} {{item.hcrate?item.hcrate/1000:'0'}}</span>
              </li>
              <li class="li-base no-bold"  :class="item.hcrate == 0?'price yellow':item.hcrate > 0?'price green':item.hcrate<0?'price red':''">
                <span
                   :class="item.hcrate == 0?'price yellow':item.hcrate > 0?'price green':item.hcrate<0?'price red':''">{{Number(item.hcrate/(item.nowPrice-item.hcrate)*100).toFixed(2)}}%</span>
              </li>

            </ul>
          </div>

        </li>
      </ul>
      <div v-show="loading" class="load-all text-center">
        <mt-spinner type="fading-circle"></mt-spinner>
        {{$t("loading")}}...
      </div>
      <div v-show="!loading && hasSearch" class="load-all text-center">
        {{$t("allLoaded")}}
      </div>
      <div v-show="!hasSearch" class="load-all text-center">
        <p class="text">Vui lòng nhập mã chứng khoán</p>
      </div>
    </mt-search>
    <foot></foot>
  </div>
</template>

<script>
import foot from '../../components/foot/foot'
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

export default {
  components: {
    foot
  },
  props: {},
  data () {
    return {
      loading: false,
      keywords: '',
      pageNum: 1,
      pageSize: 15,
      list: [],
      timer: '',
      currentNum: 15,
      hasSearch: false // 是否查询
    }
  },
  watch: {
    keywords (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getStock()
      }
    }
  },
  computed: {},
  created () {
    this.timer = setInterval(this.refreshList, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    //   this.getStock()
  },
  methods: {
    getStockType (val) {
      let rs = '沪'
      if (val === 'sz') {
        rs = '深'
      } else if (val === 'hk') {
        rs = '港'
      } else if (val === 'us') {
        rs = '美'
      }
      return rs
    },
    async getStock () {
      let opt = {
        keyWords: this.keywords,
        pageNum: this.pageNum,
        pageSize: 15
      }
      this.hasSearch = true
      let data = await api.getStock(opt)
      if (data.status === 0) {
        this.list = []
        data.data.list.forEach(element => {
          this.list.push(element)
        })
      } else {
        Toast(data.msg)
      }
    },
    async refreshList () {
      // 判断是不是已经查询 或者是否正在加载下一页 是则退出，不进行刷新
      if (!this.hasSearch || this.loading) {
        return
      }
      let opt = {
        keyWords: this.keywords,
        pageNum: 1,
        pageSize: this.currentNum
      }
      let data = await api.getStock(opt)
      this.list = data.data.list
    },
    async loadMore () {
      if (this.list.length < 10) {
        return
      }
      this.loading = true
      // 加载下一页
      this.pageNum++
      this.currentNum = this.pageNum * this.pageSize
      await this.getStock()
      this.loading = false
    },
    toDetail (val) {
      // if(true){
      //     Toast('系统正在升级，暂关闭交易！')
      //     return
      // }
      // 详情
      this.$router.push({
        path: '/listdetail2',
        query: {
          code: val.code,
          stock_type: val.stock_type
          // name: val.name
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .table-list-body {
    padding-top: 0.62rem;
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

  .search-btn-list {
    position: fixed;
    right: 0;
    height: 42px;
    font-size: 0.25rem;
    z-index: 10;
    border: none;
    box-shadow: none;
  }

  .wrapper /deep/ .mint-searchbar {
    background: #2e3138;
    position: fixed;
    width: 100%;

    .mint-searchbar-inner {
      background-color: rgba(180, 180, 180, 0.1)
    }
  }
/deep/.load-all{
  height: auto !important;
  line-height: .4rem !important;
  margin-top: 1rem;
  padding: .2rem 0;
}
.text{
  width:80%;
  text-align: center;
  margin: 0 auto;
}
</style>
