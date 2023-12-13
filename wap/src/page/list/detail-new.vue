<style src="../../../src/assets/styles/common.css"/>
<template>
  <div class="wrapper" style="padding: 0 15px;">
    <div class="between-box page-title page-box-start" style="margin-top: 8px">
      <div>
        <div class="title-1">{{ detail.code }}</div>
        <div class="title-2">({{ detail.code }})</div>
      </div>
      <div>
        <div v-if="!isOptionOpt" @click="addOptions"><img src="../../assets/images/details/join.png"></div>
        <div v-else @click="deteleOptions"><img style="max-width:20px" src="../../assets/images/home/close@x2.png"></div>
        <div style="margin-left: 5px;" @click="toBuy"><img src="../../assets/images/details/buy.png"></div>
      </div>
    </div>
    <div class="between-box" style="font-size: 12px; color: #FFFFFF; height: 110px; margin-top: 8px">
      <div class="page-title" style="width: 45%; height: 110px;">
        <div>价值</div>
        <div class="between-box">
          <div class="price-left-total">
            <div :class="['page-price', detail.hcrate === 0 ? 'yellow' : (detail.hcrate > 0 ? 'green' : 'red')]">
              {{ Number(detail.nowPrice / 1000).toFixed(2) }}
            </div>
            <div>商品总值</div>
          </div>
          <div class="price-left-total">
            <p :class="detail.hcrate === 0 ? 'yellow' : (detail.hcrate > 0 ? 'green' : 'red')">{{ Number(detail.hcrate / 1000).toFixed(2) }}</p>
            <p :class="detail.hcrate === 0 ? 'yellow' : (detail.hcrate > 0 ? 'green' : 'red')">{{ Number(detail.hcratePercentage).toFixed(2) }}%</p>
            <p>{{ (Number(detail.volume) / 1000).toFixed(2) }}M</p>
          </div>
        </div>
      </div>
      <div class="price-box page-title price-right">
        <div class="between-box low-price-box">
          <div>
            <p>最低价</p>
            <p>{{ Number(detail.lowRoot/1000).toFixed(2) }}</p>
          </div>
          <div>
            <p>清仓价</p>
            <p>{{ Number(detail.closeRoot/1000).toFixed(2)}}</p>
          </div>
          <div>
            <p>最高价</p>
            <p>{{ Number(detail.ceiling/1000).toFixed(2) }}</p>
          </div>
        </div>
        <div class="between-box">
          <div>
            <p>最低价(调)</p>
            <p>{{ Number(detail.lowAdjust/1000).toFixed(2) }}</p>
          </div>
          <div>
            <p>平均价</p>
            <p style="text-align: right">{{ Number(detail.avgprice/1000).toFixed(2) }}</p>
          </div>
          <div>
            <p>最高价(调)</p>
            <p style="text-align: right">{{ Number(detail.hightAdjust/1000).toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="page-part box-part">
      <imgBox :code="$route.query.code"
              :imgList='detail'/>
    </div>
    <div>
      <div v-infinite-scroll="loadMore"
           :infinite-scroll-disabled="bestandslisteLoading"
           infinite-scroll-distance="10"
           class="news-content">
        <div @click="pageNews(item)"
             class="news-item"
             v-for="item of bestandslisteContent"
             :key="item.id">
          <p class="news-title"
             style="-webkit-box-orient: vertical;">{{ item.title }}</p>
          <span class="news-status">
            <!-- <i class="glyphicon glyphicon-eye-open"></i>
                浏览量：{{item.views}} -->
          </span>
        </div>
      </div>
      <div v-if="bestandslisteContent.length!=0">
        <div v-if="bestandslisteContent.length<0"
             class="load-all text-center">
          <mt-spinner type="fading-circle"></mt-spinner>
        </div>

        <div v-show="bestandslisteLoading"
             class="load-all text-center">
          <mt-spinner type="fading-circle"></mt-spinner>
          {{ $t('loading') }}...
        </div>
        <div v-show="!bestandslisteLoading && bestandslisteContent.length>0"
             class="load-all text-center">
          {{ $t('allLoaded') }}
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import imgBox from './compontent/img'
import {Toast} from 'mint-ui'
import * as api from '@/axios/api'
import {apikey} from '@/utils/shuhaikeji'
import Img from './compontent/img.vue'

export default {
  components: {
    Img,
    imgBox
  },
  props: {},
  data () {
    return {
      bestandslisteContent: [], // 股票列表
      pages: {
        page: 0,
        limit: 10,
        total: -1
      },
      bestandslisteLoading: false,
      detail: {
        'name': '青海华鼎',
        'code': '600243',
        'spell': 'qhhd',
        'gid': 'sh600243',
        'nowPrice': '4.290',
        'hcrate': 1.18,
        'today_max': '4.300',
        'today_min': '4.240',
        'business_balance': '4151985.000',
        'business_amount': '973005',
        'preclose_px': '4.240',
        'open_px': '4.240',
        'buy1': '4.290',
        'buy2': '4.280',
        'buy3': '4.270',
        'buy4': '4.260',
        'buy5': '4.250',
        'sell1': '4.300',
        'sell2': '4.310',
        'sell3': '4.320',
        'sell4': '4.330',
        'sell5': '4.340',
        'buy1_num': '34700',
        'buy2_num': '38900',
        'buy3_num': '35900',
        'buy4_num': '26200',
        'buy5_num': '50100',
        'sell1_num': '76005',
        'sell2_num': '5100',
        'sell3_num': '2500',
        'sell4_num': '40200',
        'sell5_num': '11500'
      }, // 详情
      buyList: [
        {price: 33.5, price2: 14323.5},
        {price: 33.5, price2: 14323.5},
        {price: 33.5, price2: 14323.5},
        {price: 33.5, price2: 14323.5},
        {price: 33.5, price2: 14323.5}
      ],
      isOptionOpt: false, // 是否已经添加自选
      timer: null,
      loading: false,
      qhinfo: {},
      zsinfo: {}
    }
  },
  watch: {},
  computed: {},
  created () {
    this.timer = setInterval(this.refreshList, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.getDetail()
    if (this.$store.state.userInfo.phone) {
      // 判断是否登录
      this.getOpation()
    } else {
      // 获取用户信息
      this.getUserInfo()
    }
    this.qhinfo = this.$route.query.qhinfo
    this.zsinfo = this.$route.query.zsinfo
  },
  methods: {
    // 跳转新闻详情
    pageNews (option) {
      this.$router.push({
        path: '/news'
      })
      window.sessionStorage.setItem('newDetail', option.maincontent)
    },
    // 加载更多
    async loadMore () {
      if (this.bestandslisteContent.length == this.pages.total || this.bestandslisteLoading) {
        return
      }
      this.bestandslisteLoading = true
      // 加载下一页
      this.pages.page++
      await this.getAllNewList()
      this.bestandslisteLoading = false
    },
    async getAllNewList () {
      const {page, limit} = this.pages
      let obj = {
        apikey,
        page,
        limit,
        code: this.$route.query.code

        // code: 'ABR'
      }
      try {
        const res = await api.bestandslisteList(obj)
        this.bestandslisteContent.push(...res.data)
        this.pages.total = res.meta.total_count
      } catch (e) {

      }
    },
    toSearch () {
      this.$router.push('/searchlist')
    },
    async getUserInfo () {
      // 获取用户信息
      let data = await api.getUserInfo()
      if (data.status === 0) {
        this.$store.state.userInfo = data.data
        this.getOpation()
      } else {
        Toast(data.msg)
      }
      this.$store.state.user = this.user
    },
    async refreshList () {
      if (this.loading) {
        return
      }
      this.getDetail()
    },
    async getOpation () {
      let opts = {
        code: this.$route.query.code
      }
      let data = await api.isOption(opts)
      if (data.status === 0) {
        // 0 --> 未添加
        this.isOptionOpt = false
      } else {
        this.isOptionOpt = true
      }
    },
    async getDetail () {
      let opts = {
        code: this.$route.query.code
      }
      this.loading = true
      let data = await api.getSingleStock(opts)
      this.loading = false
      if (data.status === 0) {
        this.detail = data.data
      } else {
        Toast(data.msg)
      }
    },
    async addOptions () {
      let data = await api.addOption({code: this.$route.query.code})
      if (data.status === 0) {
        Toast('Thêm thành công tùy chọn')
        this.isOptionOpt = true
      } else {
        Toast(data.msg)
      }
    },
    async deteleOptions () {
      let data = await api.delOption({code: this.$route.query.code})
      if (data.status === 0) {
        Toast('Xóa hàng tự chọn thành công')
        this.isOptionOpt = false
      } else {
        Toast(data.msg)
      }
    },
    toBuy () {
      this.$router.push({
        path: '/twoBuy',
        query: {
          code: this.detail.code
        }
      })

      // //期货
      // if(this.$route.query.code != undefined && this.$route.query.code.indexOf('hf_')!=-1){
      //   this.$router.push({
      //     path: '/futuresBuy',
      //     query: {
      //       info: this.qhinfo
      //     }
      //   })
      // } else if(this.$route.query.code != undefined && (this.$route.query.code.indexOf('sh')!=-1 || this.$route.query.code.indexOf('sz')!=-1)){
      //   this.$router.push({
      //     path: '/indexBuy',
      //     query: {
      //       info: this.zsinfo
      //     }
      //   })
      // } else{
      //   this.$router.push(
      //   {
      //     name: 'buy',
      //     params: {
      //       gid: this.detail.id,
      //       name: this.detail.name,
      //       code: this.detail.code,
      //       hcrate: this.detail.hcrate,
      //       nowPrice: this.detail.nowPrice
      //     }
      //   })
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.btn-box {
  padding: 0;
}

.mint-header {
  background: #21252a;
}

.page-part {
  // background: #21252a;
  padding: 0.3rem;
  margin-bottom: 0.1rem;
  border-bottom: 0.01rem solid #676b6f;
}

.stock-price li {
  width: 20%;

  p {
    height: 0.34rem;
    line-height: 0.34rem;
  }
}

.detail-part {
  .price {
    font-size: 0.56rem;
    margin-top: 0.1rem;
    margin-bottom: 0.2rem;
    padding-bottom: 0.2rem;
  }

  .gain {
    font-size: 0.24rem;
  }

  .title {
    line-height: 0.36rem;
  }

  .number {
    line-height: 0.36rem;
  }

  .price-detail {
    li {
      width: 50%;
      float: left;
      margin-bottom: 0.16rem;
    }
  }

  .detail-list {
    padding-left: 0.3rem;
  }
}

.box-part {
  padding: 0;
}

.red {
  color: rgba(255, 0, 0, 1);
}

.yellow {
  color: rgb(226, 107, 10);
}

.green {
  color: rgb(0, 128, 0);
}

.agree-footer {
  z-index: 100
}

.news-content {
  position: relative;

  .news-item {
    padding: 0.3rem;

    .news-title {
      position: relative;
      width: 100%;
      font-size: 0.3rem;
      line-height: 0.46rem;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
    }

    .news-status {
      display: block;
      margin-top: 0.1rem;
      font-size: 0.2rem;
      line-height: 0.36rem;
      color: #606167;
      margin-top: 0.1rem;
      padding-bottom: 0.25rem;
      border-bottom: 0.01rem solid #32333b;
    }
  }
}

.agree-footer .bottom-btn {
  color: #EE9827;
}

.agree-footer .on {
  background: #f5991d;
  color: #fff;
}

.page-title {
  background-color: #1a191f;
  border-radius: 8px;
  padding: 10px;
}

.title-1 {
  font-size: 14px;
  color: #f99420;
  line-height: 20px;
}

.title-2 {
  color: rgb(105 105 107);
  line-height: 20px;
  font-size: 12px;
  margin-left: 5px;
}

.page-box-start > div {
  display: flex;
  justify-content: flex-start;
}
.price-left-total {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  flex-direction: column;
  height: 70px;
  margin-top: 10px;
  justify-content: space-around;
}
.price-box{
  height: 110px;
}
.page-price {
  font-size: 18px;
}
.total-template {
  height: 110px;
  display: flex;
  justify-content: space-evenly;
}
.price-right{
  flex: 1;
  margin-left: 8px;
  display: flex;
  align-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}
.low-price-box{
  width: 100%;
}
.low-price-box > div > p:last-child{
  margin-top: 5px;
}
</style>
