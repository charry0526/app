<template>
  <div class="wrapper">
    <mt-navbar class="top-navbar"
               @click.native="tabchange"
               v-model="selected"
               fixed>
      <mt-tab-item class="top-nav-item"
                   id="1">提出</mt-tab-item>
      <mt-tab-item class="top-nav-item"
                   id="2">赞同</mt-tab-item>
      <mt-tab-item class="top-nav-item"
                   id="3">保留代码</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="order-list"
                      v-model="selected">
      <mt-tab-container-item class="order-list-one"
                             id="1">
        <div class="table-box">
          <h3>报名名单</h3>
          <table v-infinite-scroll="loadMore"
                 :infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10"
                 class="table">
            <th>名称</th>
            <th>市场价格</th>
            <th>发行价</th>
            <th>购买</th>
            <tr v-for="(item,index) in stockList"
                :key="index">
              <td>{{item.names}}</td>
              <td>{{item.scprice}}</td>
              <td>{{item.price}}</td>
              <td>
                <div class="button-box">
                  <mt-button class="btn-red pull-right"
                             size="small"
                             type="danger"
                             @click="toCash(item)">
                    提出
                  </mt-button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item class="order-list-two"
                             id="2">
        <table v-if="selected==2"
               v-infinite-scroll="loadMore"
               :infinite-scroll-disabled="loading"
               infinite-scroll-distance="10"
               class="table">
          <th>代码</th>
          <th>市值</th>
          <th>数量</th>
          <th>杠杆</th>
          <th>费用</th>
          <th>状态</th>
          <tr v-for="(item,index) in tendorseListDate"
              :key="index">
            <td>{{item.code}}</td>
            <td>{{item.scprice}}</td>
            <td>{{item.num}}</td>
            <td>{{item.lever}}</td>
            <td>{{item.bzj}}</td>
            <td :class="item.zt==2?'tdActive':''">
              {{item.zt==1?'已中签':item.zt==2?'未中签':'待审核'}}
            </td>
          </tr>
        </table>
      </mt-tab-container-item>
      <mt-tab-container-item class="order-list-three"
                             id="3">
        <ul class="order-info-box-wrap"
            v-for="(itemF,indexF) in GiumaList"
            :key="indexF">
          <li v-for="(item,index) in itemF"
              :key="index">
            <div v-if="index==0"
                 class="row-box">
              <div class="title">
                {{item.label}}
                <div class="tag">{{item.value}}</div>
              </div>
            </div>
            <div v-if="index!=0&&index!=itemF.length-1"
                 class="row-box">
              <div>{{item.label}}</div>
              <div>{{item.value}}</div>
            </div>
            <div v-if="index==itemF.length-1"
                 class="row-box">
              <div v-if="indexF!=0">20/03/2023 10:20:49</div>
              <div>04/04/2023 10:26:52</div>
              <div v-if="indexF==0"
                   class="foot-btn-box">
                <div @click="config"
                     class="foot-btn">销售</div>
              </div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-popup v-model="dialogShow"
              :closeOnClickModal="false"
              class="mint-popup-box mint-popup-white">
      <div class="clearfix">
        <a @click="dialogShow = false"
           class="pull-right"><i class="iconfont icon-weitongguo"></i></a>
      </div>
      <div class=" page-part transaction">
        <div class="back-info">
          <!-- 银行卡信息 -->
          <p class="title">
            输入您要购买的股票数量
          </p>
          <div class="box-tab">
            <input v-model="selectNumber"
                   class="btn-default"
                   type="number">
            <p class="margin">杠杆</p>
            <div class="tab-con">
              <ul class="radio-group clearfix">
                <li v-for="(item,index) in itemInfo.numberList"
                    :key="item.key"
                    @click="selectTypeFun(item,index)">
                  <div :class="selecIndex == index?'on':''">
                    {{item}}
                  </div>
                </li>
              </ul>
            </div>
            <p class="totle">定金:{{deposit}}</p>
            <div class="button-box">
              <div @click="dialogShow=false"
                   class="btn">取消</div>
              <div @click="popconfirm()"
                   class="btn">
                确认
              </div>

            </div>
          </div>
        </div>
      </div>

    </mt-popup>
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import * as api from '@/axios/api'
import { formatTime } from '@/utils/imgupload'
export default {
  components: {
  },
  props: {},
  data () {
    return {
      formatTime,
      selectNumber: '',
      leverValue: 0,
      selecIndex: 0,
      selected: '1', // 选中
      dialogShow: false,
      GiumaList: [],
      itemInfo: {},
      stockList: [],
      userInfo: {},
      paegs: [],
      loadingAll: [],
      loading: false,
      tendorseListDate: []
    }
  },
  mounted () {
    if (this.$state.theme === 'red') {
      document.body.classList.remove('black-bg')
      document.body.classList.add('red-bg')
    }
    this.getUserInfo()// 个人信息
    // this.getNewlist()// 第一个页面列表
    this.fillData()// 填充数据
  },
  beforeDestroy () {
    if (this.$state.theme === 'red') {
      document.body.classList.remove('red-bg')
      document.body.classList.add('black-bg')
    }
  },
  computed: {
    deposit () {
      const { price } = this.itemInfo
      return this.selectNumber * price / this.leverValue
    }
  },
  methods: {
    fillData () {
      this.GiumaList = new Array(6).fill([]).map((item) => {
        return [
          {
            label: '三三重工',
            value: '控股代码'
          },
          {
            label: '最新价格',
            value: '2000'
          }, {
            label: '利润总额',
            value: '2000'
          }, {
            label: '购买价格',
            value: '2000'
          }, {
            label: '市场价',
            value: '2000'
          }, {
            label: '价格',
            value: '2000'
          }, {
            label: 'GD费用',
            value: '2000'
          }, {
            label: '举办天数',
            value: '2000'
          }, {
            label: '资本成本',
            value: '2000'
          }, {
            label: '利润',
            value: '2000'
          }, {
            label: '数量',
            value: '2000'
          }
        ]
      })

      this.loadingAll = new Array(3).fill([]).map((item) => {
        return { loading: false }
      })
      this.paegs = new Array(3).fill([]).map((item) => {
        return { pageNum: 0, pageSize: 20, total: null }
      })
    },
    // async loadMoreTwo () {
    //   console.log(this.paegs, 'this.paegs1this.paegs')
    //   const pages = this.paegs[1]
    //   const loadingAll = this.loadingAll[1]
    //   if (this.tendorseListDate.length == pages.total || loadingAll.loading) {
    //     return false
    //   }
    //   loadingAll.loading = true
    //   // 加载下一页
    //   this.paegs[1].pageNum++
    //   console.log(this.paegs, 'this.paegs2')
    //   await this.getendorseList()
    //   loadingAll.loading = false
    // },
    // 上拉加载
    async loadMore () {
      const pages = this.paegs[this.selected - 1]
      const loadingAll = this.loadingAll[this.selected - 1]
      if (this.selected == 1) {
        if (this.stockList.length == pages.total || loadingAll.loading) {
          return false
        }
      }
      if (this.selected == 2) {
        if (this.tendorseListDate.length == pages.total || loadingAll.loading) {
          return false
        }
      }
      loadingAll.loading = true
      // 加载下一页
      this.paegs[this.selected - 1].pageNum++
      if (this.selected == 1) {
        await this.getNewlist()
      }
      if (this.selected == 2) {
        await this.getendorseList()
      }

      loadingAll.loading = false
    },
    // 获取用户信息
    async getUserInfo () {
      let data = await api.getUserInfo()
      if (data.status === 0) {
        // 判断是否登录
        this.userInfo = data.data
      }
    },
    /**
     * 切换tab
     */
    async tabchange (option) {
      if (this.selected != 2) {
        this.tendorseListDate = []
        this.paegs[1].pageNum = 0
        this.paegs[1].pageSize = 20
        this.paegs[1].total = null
        // this.loadingAll[1].loading=true
        // await this.getendorseList()
        // this.loadingAll[1].loading = false
      }
    },
    /**
     * 确认购买股票
     */
    async popconfirm () {
      console.log(this.userInfo)
      if (this.selectNumber < this.itemInfo.num) {
        return this.$message.warning('最少需要' + this.itemInfo.num)
      }
      const { agentName, agentId, phone } = this.userInfo
      const { zt, code, names, scprice, price } = this.itemInfo
      const option = {
        agent: agentId, // 代理
        zname: agentName, // 代理名称
        phone: phone, // 手机号
        xgname: names, // 新股名称
        zts: zt, // 状态
        codes: code, // 新股代码
        nums: this.selectNumber, // 数量
        bzj: this.deposit, // 保证金
        price: price,
        scprice: scprice,
        mrsj: formatTime() // 提交日期
      }
      try {
        let res = await api.ListsAdd(option)
        if (res.status === 0) {
          this.$message.success(res.msg)
          this.dialogShow = false
        }
      } catch (e) {

      }
    },
    /**
     * 赞同列表
     */
    async getendorseList () {
      try {
        const pages = this.paegs[1]
        const option = { pageNum: pages.pageNum, pageSize: pages.pageSize }
        let res = await api.endorseList(option)
        if (res.status === 0) {
          const data = res.data
          this.tendorseListDate.push(...data)
          this.paegs[1].total = data.total
        }
      } catch (e) {
        const data = [
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1002', fxtime: '2023-04-16 00:00:00', lever: '1', names: 'admin', newlist_id: 10, num: 10000, price: '9888', scprice: '900', zt: 2, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 },
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1, bzj: 1000 }

        ]
        this.tendorseListDate.push(...data)
        // this.paegs[1].total = this.tendorseListDate.length
        // console.log(this.paegs, 'this.pages[1]')
        if (this.paegs[1].pageNum == 2) {
          this.paegs[1].total = 34
        }
        console.log(this.tendorseListDate, 'this.stockList')
      }
    },
    /**
     * 提出列表
     */
    async getNewlist () {
      try {
        const pages = this.paegs[0]
        const option = { pageNum: pages.pageNum, pageSize: pages.pageSize }
        let res = await api.Newlist(option)
        if (res.status === 0) {
          const data = res.data
          data.forEach(item => {
            if (item.lever) {
              let numberList = item.lever.split('/')
              this.$set(item, 'numberList', numberList)
            }
            this.stockList.push(item)
          })
          this.paegs[0].total = data.total
        }
      } catch (e) {
        const data = [
          { code: '1001', fxtime: '2023-04-15 00:00:00', lever: '1/5', names: 'test', newlist_id: 9, num: 1000, price: '8888', scprice: '8000', zt: 1 },
          { code: '1002', fxtime: '2023-04-16 00:00:00', lever: '1', names: 'admin', newlist_id: 10, num: 10000, price: '9888', scprice: '900', zt: 1 }

        ]
        data.forEach(item => {
          if (item.lever) {
            let numberList = item.lever.split('/')
            this.$set(item, 'numberList', numberList)
          }
          this.stockList.push(item)
        })
        this.paegs[0].total = this.stockList.length
        console.log(this.stockList, 'this.stockList')
      }
    },
    // 提出确认操作
    config (val) {
      MessageBox.confirm('你确定要卖光吗?').then(async action => {
        let opt = {
          positionSn: val.positionSn
        }
        let data = await api.sellFunds(opt)
        if (data.status === 0) {
          Toast(data.msg)
          this.hasChangeSell = true
          this.handleOptions(this.hasChangeSell)
          this.getListDetail()
        } else {
          Toast(data.msg)
        }
      })
    },
    // 提出弹窗操作
    toCash (option) {
      this.itemInfo = option
      if (option.numberList.length != 0) {
        this.leverValue = option.numberList[0]
        console.log(this.leverValue)
      }
      this.reset()
      this.dialogShow = !this.dialogShow
    },
    // 重置表单
    reset () {
      this.selectNumber = ''
      this.selecIndex = 0
    },
    selectTypeFun (value, index) {
      this.leverValue = value
      this.selecIndex = index
    }

  }
}
</script>
<style lang="less" scoped>
.line {
  background-color: #eee;
  width: 100%;
  height: 0.1rem;
}
.table-box {
  border-top: 0.2rem solid #eee;
  border-bottom: 0.2rem solid #eee;
}
.order-list-one {
  h3 {
    position: relative;
    text-align: center;
    padding: 0.26rem 0 0.26rem 0.26rem;
    color: #fff;
    font-size: 0.25rem;
    font-weight: 700;
    text-align: left;
  }
  h3::before {
    content: "";
    width: 0.03rem;
    height: 100%;
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
  }
  .table {
    width: 100%;
    tr {
    }
    td,
    th {
      padding: 0.2rem 0;
      color: white;
      text-align: center;
      font-size: 0.1rem;
      vertical-align: middle;
    }
    .button-box {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
.order-list-two {
  .table {
    width: 100%;
    tr {
    }
    td,
    th {
      padding: 0.2rem 0;
      color: white;
      text-align: center;
      font-size: 0.1rem;
      vertical-align: middle;
    }

    .tdActive {
      color: rgb(255, 19, 19);
    }
    .button-box {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
.box-tab {
  .btn-default {
    border: 0.02rem solid #4e4d4d;
    border-radius: 0.2rem;
    display: inline-block;
    height: 0.8rem;
    width: 100%;
    text-indent: 0.2rem;
    background: none;
  }
  .margin {
    margin: 0.2rem 0;
  }
  .radio-group li {
    // width: 19%;
    width: 24%;
    margin-right: 1%;
  }
  .button-box {
    display: flex;
    justify-content: space-around;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    .btn {
      padding: 0.2rem 0.5rem;
      border: 0.02rem solid #c5c1c1;
    }
  }
}
.order-info-box-wrap {
  color: #cfd0d1;
  width: 7rem;
  background: #25292e;
  padding: 0.1rem 0.2rem;
  margin: 0 auto 0.3rem;
  > li {
    width: 100%;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem solid #eee;

    .row-box {
      display: flex;
      align-items: center;
      > div {
        width: 50%;
        text-align: left;
        font-size: 0.24rem;
      }
      .title {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 0.26rem;
        .tag {
          color: #1b8e5d;
          border: 1px solid #1b8e5d;
          padding: 0.03rem 0.1rem;
          margin-left: 0.2rem;
          border-radius: 0.03rem;
        }
      }
      .foot-btn-box {
        text-align: right;
        .foot-btn {
          width: 2rem;
          border: 0.01rem solid #c61616;
          border-radius: 0.3rem;
          text-align: center;
          display: inline-block;
          padding: 0.1rem 0.3rem;
          line-height: 0.26rem;
          color: #c61616;
        }
      }
    }
  }
  > li:nth-last-of-type(1) {
    border-bottom: none;
  }
}
.wrapper {
  padding-bottom: 0.3rem;
}
::v-deep .v-modal {
  z-index: 10;
}
</style>
