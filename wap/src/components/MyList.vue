<template>
  <div class="listBox">
    <template v-if="listType === 'list'">
      <div class="listBox_header" v-if="proList.tabList && proList.tabList.length">
        <div class="listBox_header_item" v-for="(item, index) in proList.tabList" :key="index">
          {{ item.name }}
          <div class="hasAction" v-if="item.isChange === 1" @click="changePriceOrPercentage">
            <template v-if="fromListType === '持有信息'">
              <template v-if="PriceOrPercentage">%</template>
              <template v-else>₫</template>
            </template>
            <template v-else>%</template>
          </div>
        </div>
      </div>
      <div class="infinite-list-wrapper" ref="wrapper" v-if="productList.length">
        <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li v-for="(item, index) in productList" class="list-item" :key="index" @click="goDetail(item, fromListType)">
            <div class="list-item_text" v-if="item.stockName || item.name || item.names || item.xgname">
              {{ item.stockName || item.name || item.names || item.xgname }}
            </div>
            <div class="list-item_text" v-if="item.nowPrice || item.price"
              :class="numberColorFn(((item.nowPrice || item.price) / 1000).toFixed(2)) ? 'text_red' : 'text_green'">{{
                ((item.nowPrice || item.price) / 1000).toFixed(2) }}</div>
            <template v-if="item.nowPrice || item.hcrate || item.price">
              <div class="list-item_text" v-if="PriceOrPercentage && !proList.zccyList">
                <template v-if="item.price">
                  <span
                    :class="numberColorFn(((item.price - item.scprice) / item.price * 100).toFixed(2)) ? 'text_red' : 'text_green'">{{
                      ((item.price - item.scprice) / item.price * 100).toFixed(2) }}%</span>
                </template>
                <template v-else>
                  <span
                    :class="numberColorFn((item.hcrate / (item.nowPrice - item.hcrate) * 100).toFixed(2)) ? 'text_red' : 'text_green'">
                    {{ (item.hcrate / (item.nowPrice - item.hcrate) * 100).toFixed(2) }}%</span>
                </template>
              </div>
              <div class="list-item_text" v-else>
                <span :class="numberColorFn(item.preclose_px || item.price) ? 'text_red' : 'text_green'">{{
                  item.preclose_px || item.price }}</span>
              </div>
            </template>

            <div class="list-item_text" v-if="item.preclose_px">
              <span :class="numberColorFn(item.preclose_px) ? 'text_red' : 'text_green'">{{ item.preclose_px }}</span>
            </div>
            <div class="list-item_text" v-if="item.orderNum">
              <span :class="numberColorFn(item.orderNum) ? 'text_red' : 'text_green'">{{ item.orderNum }}</span>
            </div>
            <div class="list-item_text" v-if="item.buyOrderPrice">
              <span :class="numberColorFn(item.buyOrderPrice) ? 'text_red' : 'text_green'">{{ item.buyOrderPrice }}</span>
            </div>
            <div class="list-item_text" v-if="item.now_price">
              <span :class="numberColorFn(item.now_price) ? 'text_red' : 'text_green'">{{ item.now_price }}</span>
            </div>

            <div class="list-item_text" v-if="PriceOrPercentage && proList.zccyList">
              <span
                :class="numberColorFn((item.allProfitAndLose / item.orderTotalPrice * 100 / item.orderLever).toFixed(2)) ? 'text_red' : 'text_green'">{{
                  (item.allProfitAndLose / item.orderTotalPrice * 100 / item.orderLever).toFixed(2) }}%</span>
            </div>
            <div class="list-item_text" v-if="!PriceOrPercentage && proList.zccyList">
              <span :class="numberColorFn(item.allProfitAndLose || '0') ? 'text_red' : 'text_green'">{{
                item.allProfitAndLose || '0'
              }}</span>
            </div>


            <div class="list-item_text" v-if="item.issuePrice || proList.stateList">
              <span :class="numberColorFn(item.issuePrice || '0') ? 'text_red' : 'text_green'">{{ item.issuePrice || '0'
              }}</span>
            </div>
            <div class="list-item_text" v-if="item.bzj">
              <span :class="numberColorFn(item.bzj || '0') ? 'text_red' : 'text_green'">{{ item.bzj }}</span>
            </div>
            <div class="list-item_text" v-if="isShowActionBtn">
              <img v-if="actionClass === 'del'" src="../assets/images/home/close@x2.png"
                @click.stop="actionHandelClick(index, item, 'del')" />
              <span v-if="actionClass === 'buy'" class="buyItemBtn"
                @click.stop="actionHandelClick(index, item, 'buy')">购买</span>
            </div>

            <div class="list-item_text" v-if="item.oldPrice || proList.stateList">
              <span :class="numberColorFn(item.oldPrice || '0') ? 'text_red' : 'text_green'">{{ item.oldPrice || '0'
              }}</span>
            </div>
            <div class="list-item_text" v-if="item.gg">
              {{ item.gg }}
            </div>
            <div class="list-item_text" v-if="item.zts">
                <span v-if="item.zts == 1" class="buyItemBtn" @click.stop="toCash(item)">BUY</span>
                <span class="textState" v-else-if="item.zts == '2'">Chưa thông qua</span>
                <span class="textState" v-else-if="item.zts == '4'">Hoàn thành</span>
                <span class="textState" v-else>Đang XD</span>
            </div>
          </li>
        </ul>
        <p v-if="loading" class="infinite-list-wrapper_tips"><van-loading size="14px">加载中...</van-loading></p>
        <p v-if="noMore" class="infinite-list-wrapper_tips">没有更多了</p>
      </div>
    </template>
    <template v-if="listType === 'MyCard'">
      <div class="infinite-list-wrapper" ref="wrapper" v-if="productList.length">
        <ul class="list isCradList" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <li class="cardItem" v-for="(item, index) in productList" :key="index">
            <div class="cardItem_title">
              <div class="title">{{ item.stockName }}</div>
              <div class="sub_title" v-if="item.stockCode">({{ item.stockCode }})</div>
              <div class="title_tag" v-if="item.isNew">员工福利扶持</div>
              <div class="updateTime" v-if="state === 0">
                更新：<span style="color: rgb(91, 186, 110)" v-if="item.now_price > 0">{{ item.now_price }}</span>
                      <span style="color: #d02551;" v-else="item.now_price < 0">{{ item.now_price }}</span>
              </div>
              <div class="updateTime" v-if="state === 1">
                总损益：<span style="color: rgb(91, 186, 110)" v-if="item.allProfitAndLose > 0">{{ item.allProfitAndLose }}</span>
                        <span style="color: #d02551;" v-else="item.allProfitAndLose < 0">{{ item.allProfitAndLose }}</span>
              </div>
            </div>
            <template v-if="state === 0">
              <div class="cardItemInfo" @click="goDetail(item, 'holding')">
                <div class="cardItemInfo_item">
                  <span>购买价格</span>
                  <span>{{ item.buyOrderPrice }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>数量</span>
                  <span>{{ item.orderNum }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>金额</span>
                  <span>{{ item.orderTotalPrice }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>交易费用</span>
                  <span>{{ item.orderFee }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>所得税</span>
                  <span>{{ item.orderSpread }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>倍数</span>
                  <span>{{ item.orderLever }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>押金</span>
                  <span>{{ item.newBzj }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>因损益</span>
                  <span>{{ item.profitAndLose }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>实际损益</span>
                  <span :class="item.allProfitAndLose < 0 ? 'text_red' : 'text_green'">{{ item.allProfitAndLose }}</span>
                </div>
              </div>
              <div class="cardItem_title noBorder">
                <div class="sub_title">{{new Date(item.buyOrderTime) | timeFormat}}</div>
                <div class="cardItem_footer_btn" @click.stop="handSellClick(item.positionSn)">卖出</div>
              </div>
            </template>
            <template v-else>
              <div class="cardItemInfo"  @click="goDetail(item, 'sell')">
                <div class="cardItemInfo_item">
                  <span>购买价格</span>
                  <span>{{ item.buyOrderPrice }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>数量</span>
                  <span>{{ item.orderNum }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>总价</span>
                  <span>{{ item.orderTotalPrice }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>售价</span>
                  <span>{{ item.sellOrderPrice }}</span>
                </div>
                <div class="cardItemInfo_item"></div>
                <div class="cardItemInfo_item">
                  <span>保证金</span>
                  <span>{{ item.newBzj }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>交易费用</span>
                  <span>{{ item.orderFee }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>所得税</span>
                  <span>{{ item.orderSpread }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>杠杆</span>
                  <span>{{ item.orderLever }}</span>
                </div>
                <div class="cardItemInfo_item">
                  <span>举办天数</span>
                  <span>{{ item.orderStayDays }}</span>
                </div>
                <div class="cardItemInfo_item"></div>
                <div class="cardItemInfo_item">
                  <span>损益</span>
                  <span :class="item.profitAndLose < 0 ? 'text_red' : 'text_green'">{{ item.profitAndLose }}</span>
                </div>
              </div>
              <div class="cardItem_title noBorder" style="display: flex;justify-content: space-between">
                <div class="sub_title" style="margin-left: 0; font-size: 12px;">买入:{{new Date(item.buyOrderTime) | timeFormat}}</div>
                <div class="sub_title" style="margin-left: 0; font-size: 12px;">售出:{{new Date(item.sellOrderTime) | timeFormat}}</div>
              </div>
            </template>
          </li>
        </ul>
        <p v-if="loading" class="infinite-list-wrapper_tips"><van-loading size="14px">加载中...</van-loading></p>
        <p v-if="noMore" class="infinite-list-wrapper_tips">没有更多了</p>
      </div>
    </template>
    <van-empty description="暂无数据" v-if="listType === 'list' && !productList.length" />

    <mt-popup v-model="dialogShow" :closeOnClickModal="false" class="mint-popup-box mint-popup-white">
      <div class="clearfix">
        <a @click="dialogShow = false" class="pull-right"><i class="iconfont icon-weitongguo"></i></a>
      </div>
      <div class=" page-part transaction">
        <div class="back-info">
          <p class="title">
            Nhập số lượng cổ phiếu bạn muốn mua
          </p>
          <div class="box-tab">
            <input v-model="selectNumber" class="btn-default" type="number">
            <p class="margin">Đòn bẩy</p>
            <div class="tab-con">
              <ul class="radio-group clearfix">
                <li v-for="(item, index) in itemInfo.numberList" :key="item.key" @click="selectTypeFun(item, index)">
                  <div :class="selecIndex == index ? 'on' : ''">
                    {{ item }}
                  </div>
                </li>
              </ul>
            </div>
            <p class="totle margin">Margin: {{ $moneyDot(leverageValue) }}</p>
            <p class="totle margin">Tiền mua vào: {{ $moneyDot(deposit) }}</p>
            <p class="totle margin">Tiền bảo chứng: {{ $moneyDot(fundsFrozen) }}</p>
            <div class="button-box">
              <div @click="dialogShow = false" class="btn">Hủy bỏ</div>
              <div @click="handclick()" class="btn">
                Xác nhận
              </div>

            </div>
          </div>
        </div>
      </div>

    </mt-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Empty, Loading } from "vant";
import { numberColor, debounceJArgs} from '@/utils/utils'
import * as api from '@/axios/api'
import { formatTime } from '@/utils/imgupload'
import {MessageBox, Toast} from 'mint-ui'
Vue.use(Empty);
Vue.use(Loading);

export default {
  name: "MyList",
  props: {
    fromListType: {
      type: String,
      default: '',
    },
    proList: {
      type: Object,
      default: () => { },
    },
    state: {
      type: Number,
      default: 0
    },
    listType: {
      type: String,
      default: "list",
    },
  },
  data() {
    return {
      userInfo:{},
      leverValue: 0,
      itemInfo: {},
      selecIndex: 0,
      selectNumber: '',
      dialogShow: false,
      PriceOrPercentage: true,
      loading: false,
      noMore: false,
      stockPlate: '',
      pageSize: 1, //当前第几页面
      productList: [],
      isShowActionBtn: false, //是否显示操作按钮，根据返回的表头查看是否含有“操作”
      actionClass: "", //操作按钮类型，删除  购买
    };
  },
  computed: {
    deposit() {
      const { price } = this.itemInfo
      // 购买数量乘以单价再除以杠杆
      // return this.selectNumber * price / this.leverValue
      return this.selectNumber * price
    },
    // 冻结资金
    fundsFrozen() {
      // 获取账户可用余额：可用金-购买金 = 购买后的可用金
      const p_price = this.deposit
      // const entPrice = this.userInfo.enableAmt - p_price
      // 获取保证金比例
      const mr = this.itemInfo.marginRatio
      // 计算冻结资金额度 可用余额乘以保证金
      // const bzj = entPrice * mr
      //购买金额 * 保证金比率
      return p_price * mr
    },
    // 杠杆值
    leverageValue() {
      // 购买数量乘以杠杆
      return this.selectNumber * this.leverValue
    },
    // noMore() {
    //   return this.count >= 60;
    // },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {
    this.getUserInfo()
  },
  watch: {
    proList: {
      handler(newValue, oldValue) {
        console.log('newValue-----', newValue)
        console.log('oldValue-----', oldValue)
        // 数据变化时触发的处理函数
        // this.init(); //初始化数据
        console.log('this.proList.pageNum---', this.proList.pageNum)
        if (this.proList.pageNum == 1) {
          this.init()
          // this.load()
        }
        if (this.proList.watchListData) {
          this.productList = this.proList.watchListData.list
        }
        if (this.proList.market) {
          this.productList = this.proList.market.list
        }
        if (this.proList.welfare) {
          this.productList = this.proList.welfare.list
        }
        if (this.proList.stateList) {
          this.productList = this.proList.stateList.list
        }
        if (this.proList.zccyList) {
          this.productList = this.proList.zccyList.list
        }
        if (this.proList.holdingList) {
          this.productList = this.proList.holdingList.list
        }
        this.loading = false
        this.noMore = false

        if (this.proList.tabList) {
          for (let i = 0; i < this.proList.tabList.length; i++) {
            if (this.proList.tabList[i].name === "操作") {
              this.isShowActionBtn = true;
              this.actionClass = this.proList.tabList[i].actionClass;
              break;
            } else {
              this.isShowActionBtn = false;
            }
          }
        }

      },
      deep: true
      // immediate: true, // 设置为 true，初始化加载
    },
  },
  methods: {
    // 重置表单
    reset() {
      this.selectNumber = ''
      this.selecIndex = 0
    },
    // 提出弹窗操作
    popUp(option) {
      this.itemInfo = option
      option.numberList = option.lever.split('/')
      if (option.numberList.length != 0) {
        this.leverValue = option.numberList[0]
        console.log(this.leverValue)
      }
      this.reset()
      this.dialogShow = !this.dialogShow
    },
    goDetail(item, fromListType) {
      let code = '', stock_type = ''
      if (fromListType === '关注列表') {
        code = item.stockCode
        stock_type = item.stock_type
      } else if (fromListType === '市场列表') {
        code = item.code
        stock_type = item.stock_type
      } else if (fromListType === '福利列表') {
        code = item.names
        stock_type = item.names
      }
      else if (fromListType === '持有信息' || fromListType === 'holding' || fromListType === 'sell') {
        code = item.stockCode
        stock_type = item.stock_type
      }
      this.$router.push(`detail-new?code=${code || ''}&stock_type=${stock_type || ''}`)
    },
    numberColorFn(val) {
      return numberColor(val)
    },
    init() {
      this.PriceOrPercentage = true;
      this.loading = false;
      this.noMore = false;
      this.pageSize = 1; //当前第几页面
      // this.productList = [];
      this.isShowActionBtn = false; //是否显示操作按钮，根据返回的表头查看是否含有“操作”
      this.actionClass = ""; //操作按钮类型，删除  购买
      if (this.proList.tabList && this.productList) {
        this.$nextTick(() => {
          if (this.proList.tabList.length && this.productList.length) {
            this.$refs.wrapper.scrollTop = 0;
          }
        });
      }
    },
    //涨幅百分比和金额显示切换
    changePriceOrPercentage() {
      this.PriceOrPercentage = !this.PriceOrPercentage;
    },
    //异步加载数据
    load() {
      console.log('加载下一页啦')
      let pass = false;
      //关注列表
      if (
        this.proList.watchListData &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //市场列表
      if (
        this.proList.market &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //福利列表--ESOP
      if (
        this.proList.welfare &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //福利列表--状态列表
      if (
        this.proList.stateList &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      // //资产 持有列表
      if (
        this.proList.zccyList &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      //订单--持有列表
      if (
        this.proList.holdingList &&
        this.pageSize === this.proList.lastPage
      )
        pass = true;
      console.log('pass---', pass)
      if (pass) {
        this.loading = false;
        this.noMore = true;
        return;
      }

      this.loading = true;
      console.log(1111, this.pageSize)
      this.$emit('changeData', this.pageSize += 1, this.proList.fn)
    },
    //操作
    async actionHandelClick(index, item, actionType) {
      // item为当前项目数据，index为索引，actionType操作按钮类型
      if (actionType === "del") {
        let res = await api.delOption({ code: item.stockCode })
        if (res.status === 0) {
          this.$emit('changeListData')
        }
      } else if (actionType === "buy") {
        this.popUp(item)
      }
    },
    handclick: debounceJArgs(function (e) {
      this.popconfirm()
    }, (3000)),
    /**
     * 确认购买股票
     */
    async popconfirm() {
      if (this.selectNumber < this.itemInfo.num) {
        return this.$message.warning('Tối thiểu cần' + this.itemInfo.num)
      }
      const { agentName, realName, phone } = this.userInfo
      const { names, price } = this.itemInfo
      const option = {
        agent: agentName, // 代理
        zname: realName, // 真实名称
        phone: phone, // 手机号
        xgname: names, // 新股名称
        nums: this.selectNumber, // 数量
        bzj: this.fundsFrozen, // 保证金
        marginRatio: this.itemInfo.marginRatio, // 保证金比例
        gg: this.leverValue, // 杠杆
        sz: Number(this.selectNumber) * Number(price), // 市值
        mrsj: formatTime() // 提交日期
      }
      console.log(option);
      try {
        let res = await api.ListsAdd(option)
        if (res.status === 0) {
          this.$message.success(res.msg)
          this.dialogShow = false
        }
      } catch (e) {

      }
    },
    async getUserInfo() {
      let data = await api.getUserInfo()
      if (data.status === 0) {
        // 判断是否登录
        this.userInfo = data.data
      }
    },
    toCash(option) {
      console.log(option, 'option')
      if (option.ggstr) {
        this.leverValue = option.ggstr.split('/')[0]
      }
      console.log(option.lever, 'option.lever')
      this.$router.push({
        path: '/twoBuyNew',
        query: {
          id: option.listsId,
          code: option.names || option.xgname,
          leverValue: option.gg,
          buyMinNum: option.num || option.nums
        }
      })
    },
    handSellClick:debounceJArgs(function(val){
      MessageBox.confirm('Bạn có chắc chắn muốn bán ra?', '', {confirmButtonText: 'Xác nhận', cancelButtonText: 'Hủy bỏ'}).then(async action => {
        this.sell(val)
      })
    },(3000)),
    async sell (val) {
      let opt = {
        positionSn: val
      }
      let data = await api.sell(opt)
      if (data.status === 0) {
        Toast(data.msg)
        this.hasChangeSell = true
        this.handleOptions(this.hasChangeSell)
        this.getListDetail()
      } else {
        Toast(data.msg)
      }
    },

  },
};
</script>

<style scoped lang="less" src="@/assets/css/esop.less" />
<style lang="less" scoped>
.listBox {
  display: flex;
  // background: red;
  width: 100%;
  height: 100%;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: flex;
  flex-direction: column;

  .listBox_header {
    height: 38px;
    display: flex;
    background: #3c3b41;

    .listBox_header_item {
      height: 38px;
      line-height: 38px;
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;

      .hasAction {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;

        &::before {
          content: "";
          display: block;
          width: 6px;
          height: 10px;
          background: url("../assets/images/home/right-triangle@x2.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 5px;
        }

        &::after {
          content: "";
          display: block;
          width: 6px;
          height: 10px;
          background: url("../assets/images/home/left-triangle@x2.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 5px;
        }
      }
    }
  }

  .infinite-list-wrapper {
    padding-bottom: 10px;
    overflow: auto;

    .list {
      .list-item {
        height: 36px;
        display: flex;
        align-items: center;
        background: #1a191f;

        &:nth-child(2n) {
          background: #29282e;
        }

        .list-item_text {
          flex: 1;
          text-align: center;

          img {
            width: 14px;
            height: 14px;
          }

          .buyItemBtn {
            font-size: 14px;
            background: #f99420;
            padding: 5px 11px;
            border-radius: 6px;
          }

          .textState {
            color: rgb(105, 105, 107);
          }
        }
      }

      &.isCradList {
        padding: 0 15px;

        .cardItem {
          background: #1a191f;
          border-radius: 6px;
          margin-bottom: 10px;
          padding: 0 10px;

          .cardItem_title {
            display: flex;
            align-items: center;
            height: 36px;
            border-bottom: 1px dashed #555457;

            .title {
              font-size: 14px;
            }

            .sub_title {
              color: rgb(105, 105, 107);
              font-size: 12px;
              margin-left: 5px;
            }

            .title_tag {
              font-size: 12px;
              border: 1px solid #e62946;
              color: #e62946;
              margin-left: 5px;
              border-radius: 4px;
              padding: 1px 3px;
            }

            .updateTime {
              margin-left: auto;
              font-size: 14px;

              span {
                font-size: 13px;
              }
            }

            .cardItem_footer_btn {
              margin-left: auto;
              font-size: 14px;
              background: #f99420;
              padding: 4px 11px;
              border-radius: 6px;

              &.sw {
                background: none;
                color: #f99420;
                border: 1px solid #f99420;
              }
            }

            &.noBorder {
              border-top: 1px dashed #555457;
              border-bottom: 0;
            }
          }

          .cardItemInfo {
            display: flex;
            flex-wrap: wrap;
            padding: 5px 0;

            .cardItemInfo_item {
              padding: 5px 0;
              width: calc(100% / 3);

              span {
                display: block;
                line-height: 20px;
              }
            }
          }
        }
      }
    }

    .infinite-list-wrapper_tips {
      padding: 10px;
      text-align: center;
    }
  }
}
</style>
