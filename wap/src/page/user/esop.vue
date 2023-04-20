<template>
  <div class="wrapper">
    <mt-navbar class="top-navbar"
               @click.native="tabchange"
               v-model="selected"
               fixed>
      <mt-tab-item class="top-nav-item"
                   id="1">沪深账户</mt-tab-item>
      <mt-tab-item class="top-nav-item"
                   id="2">指数账户</mt-tab-item>
      <!-- <mt-tab-item class="top-nav-item"
                   id="3">期货账户</mt-tab-item> -->
    </mt-navbar>
    <mt-tab-container class="order-list"
                      v-model="selected">
      <mt-tab-container-item class="order-list-one"
                             id="1">
        <div class="table-box">
          <!-- <h3>报名名单</h3> -->
          <table v-infinite-scroll="loadMore"
                 :infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10"
                 class="table">
            <th>名称</th>
            <th>市场价格</th>
            <th>发行价</th>
            <th>申请</th>
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
                             @click="popUp(item)">
                    申请
                  </mt-button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item class="order-list-two"
                             id="2">
        <div class="table-box">
          <table v-if="selected==2"
                 v-infinite-scroll="loadMore"
                 :infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10"
                 class="table">
            <th>股票名称</th>
            <th>市值</th>
            <th>数量</th>
            <th>杠杆</th>
            <th>费用</th>
            <th>状态</th>
            <th>购买</th>
            <tr v-for="(item,index) in tendorseListDate"
                :key="index">
              <td>{{item.xgname}}</td>
              <td>{{item.sz}}</td>
              <td>{{item.nums}}</td>
              <td>{{item.gg}}</td>
              <td>{{item.bzj}}</td>
              <td :class="item.zt==2?'tdActive':''">
                {{item.zt==1?'审核通过':item.zt==2?'未通过':'未审核'}}
              </td>
              <td>
                <div class="button-box">
                  <mt-button v-if="item.zt==1" class="btn-red pull-right"
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
import { CodeList, endorseList, CodeDateFormat, CodeDateFormatFrist } from '@/utils/data.js'
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
      userInfo: {
        // phone: 15888
      },
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
      this.loadingAll = new Array(3).fill([]).map((item) => {
        return { loading: false }
      })
      this.paegs = new Array(3).fill([]).map((item) => {
        return { pageNum: 0, pageSize: 30, total: null }
      })
    },
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
        if (Object.keys(this.userInfo).length == 0) {
          await this.getUserInfo()
        }
        await this.getendorseList()
        // try {
        //   if (Object.keys(this.userInfo).length == 0) {
        //     await this.getUserInfo()
        //   }
        //   await this.getendorseList()
        // } catch (e) {
        //   await this.getendorseList()
        // }
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
      const { agentName, realName, phone } = this.userInfo
      const { zt, code, names, scprice, price } = this.itemInfo
      const option = {
        agent: agentName, // 代理
        zname: realName, // 真实名称
        phone: phone, // 手机号
        xgname: names, // 新股名称
        // zts: zt, // 状态
        // codes: code, // 新股代码
        nums: this.selectNumber, // 数量
        bzj: this.deposit, // 保证金
        // price: price,
        gg: this.leverValue, // 杠杆
        sz: Number(this.selectNumber) * Number(price), // 市值
        // scprice: scprice,
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
        const option = { pageNum: pages.pageNum, pageSize: pages.pageSize, phone: this.userInfo.phone }
        let res = await api.endorseList(option)
        if (res.status === 0) {
          const data = res.data
          if (data.list.length != 0) {
            this.tendorseListDate.push(...data.list)
            this.paegs[1].total = data.total
          }
        }
      } catch (e) {
        const data = endorseList
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
          data.list.forEach(item => {
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

    // 提出弹窗操作
    popUp (option) {
      this.itemInfo = option
      if (option.numberList.length != 0) {
        this.leverValue = option.numberList[0]
        console.log(this.leverValue)
      }
      this.reset()
      this.dialogShow = !this.dialogShow
    },
    toCash (option) {
      console.log(option, 'option')
      if (option.lever) {
        this.leverValue = option.lever.split('/')[0]
      }
      if (option.gg) {
        this.leverValue = option.lever.split('/')[0]
      }
      console.log(option.lever, 'option.lever')
      this.$router.push({
        path: '/twoBuyNew',
        query: {
          code: option.names || option.xgname,
          leverValue: this.leverValue,
          lever: option.lever || option.gg,
          buyMinNum: option.num || option.nums
        }
      })
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
<style scoped lang="less" src="@/assets/css/esop.less" />
