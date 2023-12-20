<style src="../../../src/assets/styles/common.css"/>
<style lang="less" scoped>
@import "../../assets/styles/index.less";

.tabBox {
  .tabChildren {
    padding: 10px 15px 0 15px;
    flex-wrap: wrap;
    display: flex;
    border-bottom: 1px solid #707070;

    .tabChildrenItem {
      display: flex;
      height: 30px;
      align-items: center;
      font-size: 12px;
      background: #39383e;
      padding: 0 10px;
      border-radius: 20px;
      margin-right: 10px;
      margin-bottom: 10px;

      &.active {
        background: #fb9702;
        color: #fff;
      }
    }

    &.isContent {
      padding-bottom: 10px;

      &.MyCard {
        border: 0;
      }

      .isContent_list {
        flex: 1;
        display: flex;

        .isContent_item {
          font-size: 12px;

          span {
            padding: 0 5px 12px 0;
            display: inline-block;
            white-space: nowrap;
            display: block;

            &:nth-child(2) {
              padding-bottom: 0;
            }
          }
        }
      }
    }
  }
}

.between-box {
  &.property-total-icon {
    display: block;
  }

  .between-box_item {
    float: left;
    width: 50%;

    .item_number {
      overflow-wrap: break-word;
      line-height: 14px;
    }
  }
}

.app-wrapper {
  background-color: #29282e;
  font-size: 12px;
}

.property-menu {
  display: flex;
  margin-bottom: 15px;
}

.property-menu>div {
  border-bottom: 1px solid #6f6e74;
  text-align: center;
  width: 50%;
  font-size: 14px;
  height: 37px;
  line-height: 37px;
}

.property-menu-active {
  background-color: #3d3c41;
  border-bottom: 2px solid #e8972c !important;
  color: rgb(255 155 46);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.property-template {
  margin: 0 15px 15px;
  padding: 0 15px;
  border-radius: 8px;
  background-color: #1a191f;
}

.property-title {
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  color: #ffffff;
  align-items: center;
  padding: 15px 0 10px 0;
  border-bottom: 1px dashed #58575f;
}

.property-detail {
  padding: 20px 0;

  .between-box_left {
    width: calc(100% - 120px);
    overflow: hidden;
  }

  .bingtu {
    position: relative;

    .bingtu_text {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      text-align: center;
      font-size: 16px;
      box-sizing: border-box;

      p {
        margin: 8px 10px;
        overflow: hidden;
      }
    }
  }
}

.property-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.origin-box {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
}

.origin-green {
  background-color: forestgreen;
}

.origin-yellow {
  background-color: #f99420;
}

.property-total-icon .between-box {
  justify-content: start;
  margin-bottom: 5px;
}

.property-detail-title {
  font-size: 14px;
}

.property-detail-subtitle {
  padding: 8px 0;
}

.property-list-template {
  padding-bottom: 11px;
  border-bottom: 1px dashed #58575f;
}

.property-list-template>div {
  padding-bottom: 4px;
}

.fold-icon {
  margin-top: -1px;
  margin-left: 5px;
}
</style>
<style lang="less">
.van-circle__text {
  color: #fff
}

.van-circle {
  svg {
    .van-circle__layer {
      stroke: #ff8f00 !important;
    }

    .van-circle__hover {
      stroke: rgb(91, 186, 110) !important
    }
  }
}
</style>
<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main">
      <div class="property-menu">
        <div :class="showTemplate === 1 ? 'property-menu-active' : ''"
          @click="showTemplate = 1; getHoldingsList(1); getHoldingsTotal">
          Thông tin nắm giữ
        </div>
        <div :class=" showTemplate === 2 ? 'property-menu-active' : '' " @click="getPropertyInfo();">Báo cáo tài sản
        </div>
      </div>
      <template v-if=" showTemplate === 2 ">
        <div class="property-template">
          <div class="property-title">
            <div class="property-icon">
              <img src="../../assets/images/property/graphics.png" alt="" />
            </div>
            <div>Biểu đồ hiển thị</div>
          </div>
          <div class="between-box property-detail">
            <div class="between-box_left">
              <div style="font-size: 14px">Tổng tài sản</div>
              <div
                style="font-size: 18px; margin-top: 10px; margin-bottom: 25px; word-wrap: break-word; overflow-wrap: break-word;">
                {{ $moneyDot(propertyInfo.userAmt) }}
              </div>
              <div class="between-box property-total-icon">
                <div class="between-box_item">
                  <div class="between-box">
                    <div class="origin-box origin-green"></div>
                    <div>Giá trị đang nắm giữ</div>
                  </div>
                  <div class="item_number">{{
                    $moneyDot(propertyInfo.shareholdingAmt)
                    }}
                  </div>
                </div>
                <div class="between-box_item">
                  <div class="between-box">
                    <div class="origin-box origin-yellow"></div>
                    <div>Số dư khả dụng</div>
                  </div>
                  <div class="item_number">{{
                    $moneyDot(propertyInfo.enableAmt)
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bingtu">
              <van-circle v-model=" currentRate " size="111px" :rate=" rate " layer-color="#5bba6e" stroke-width=80 />
              <div class="bingtu_text">
                Tài sản<p><span style="color: #5bba6e">{{ rate || 0 }}%</span> / <span style="color: #ff7b23">{{
                  (100 - rate) || 0
                    }}%</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="property-template">
          <div class="property-title">
            <div class="property-icon">
              <img src="../../assets/images/property/money.png" alt="" />
            </div>
            <div>Chi tiết tài sản</div>
          </div>
          <div class="between-box property-detail-subtitle property-detail-title">
            <div>Tài sản CK</div>
            <div class="between-box">
              <div>{{ $moneyDot(propertyInfo.shareholdingAmt) }}</div>
              <div class="fold-icon" @click="property_1 = property_1 === 1 ? 0 : 1">
                <img v-if=" property_1 === 1 " src="../../assets/images/property/dropdown.png" alt="" />
                <img v-else src="../../assets/images/users/more.png" alt="" />
              </div>
            </div>
          </div>
          <div class="property-list-template" v-if=" property_1 ">
            <div class="between-box">
              <div>Giá trị thị trường nắm giữ</div>
<!--              持有债券总市值-->
              <div>{{ $moneyDot(propertyInfo.nowTotalPrice) }}</div>
            </div>
            <div class="between-box">
              <div>Số lượng nắm giữ</div>
              <div>{{ $moneyDot(propertyInfo.shareholdingNumber) }}</div>
            </div>
            <div class="between-box">
              <div>Tổng lãi/lỗ</div>
<!--              持有债券总损益值-->
              <div>{{ $moneyDot(propertyInfo.shareholdingProperty) }}</div>
            </div>
          </div>

          <div class="between-box property-detail-subtitle property-detail-title">
            <div>Tiền mặt</div>
            <div class="between-box">
              <div>{{ $moneyDot(propertyInfo.enableAmt) }}</div>
              <div class="fold-icon" @click="property_2 = property_2 === 1 ? 0 : 1">
                <img v-if=" property_2 === 1 " src="../../assets/images/property/dropdown.png" alt="" />
                <img v-else src="../../assets/images/users/more.png" alt="" />
              </div>
            </div>
          </div>
          <div class="property-list-template" v-if=" property_2 ">
            <div class="between-box">
              <div>Số dư khả dụng</div>
              <div>{{ $moneyDot(propertyInfo.availableAmount) }}</div>
            </div>
            <div class="between-box">
              <div>Số dư được rút</div>
              <div>{{ $moneyDot(propertyInfo.extractableAmount) }}</div>
            </div>
            <div class="between-box">
              <div>Đóng băng tiền gửi</div>
              <div>{{ $moneyDot(propertyInfo.freezeAmount) }}</div>
            </div>
            <div class="between-box">
              <div>Tổng số ký quỹ</div>
              <div>{{ $moneyDot(propertyInfo.margin) }}</div>
            </div>
          </div>

          <div class="between-box property-detail-subtitle property-detail-title">
            <div>Nợ</div>
            <div class="between-box">
              <div>{{ $moneyDot(propertyInfo.debtAmt) }}</div>
              <div class="fold-icon" @click="property_3 = property_3 === 1 ? 0 : 1">
                <img v-if=" property_3 === 1 " src="../../assets/images/property/dropdown.png" alt="" />
                <img v-else src="../../assets/images/users/more.png" alt="" />
              </div>
            </div>
          </div>
          <div class="property-list-template" style="border: none" v-if=" property_3 ">
            <div class="between-box">
              <div>Tổng hạn mức tín dụng</div>
              <div>{{ $moneyDot(propertyInfo.creditLimit) }}</div>
            </div>
            <div class="between-box">
              <div>Số tiền khả dụng tín dụng</div>
              <div>{{ $moneyDot(propertyInfo.creditAvailableLimit-propertyInfo.creditBorrowedAmt) }}</div>
            </div>
            <div class="between-box">
              <div>Số tiền đã vay tín dụng</div>
              <div>{{ $moneyDot(propertyInfo.creditBorrowedAmt) }}</div>
            </div>
            <div class="between-box">
              <div>Số tiền đã trả tín dụng</div>
              <div>{{ $moneyDot(propertyInfo.creditStillAmt) }}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- 持股信息 -->
      <template v-if=" showTemplate === 1 ">
        <div class="tabBox">
          <div class="tabChildren isContent MyCard">
            <div class="isContent_list">
              <div class="isContent_item">
                <span>Tổng vốn：</span>
                <span>P/L：</span>
              </div>
              <div class="isContent_item">
                <span>{{
                  $moneyDot(holdingTotal.orderTotalPrice)
                  }}</span>
                <span>{{
                  $moneyDot(holdingTotal.profitMoney)
                  }}</span>
              </div>
            </div>
            <div class="isContent_list">
              <div class="isContent_item">
                <span>Tổng GT：</span>
                <span>Tỉ lệ P/L：</span>
              </div>
              <div class="isContent_item">
                <span>{{
                  $moneyDot(holdingTotal.nowPrice)
                  }}</span>
                <span :class=" holdingTotal.profitMoney < 0 ? 'text_red' : 'text_green' ">{{
                  holdingTotal.percentage
                  }}%</span>
              </div>
            </div>
          </div>
          <my-list :proList=" proList " :listType=" listType " @changeData=" changeData "
            :fromListType=" fromListType " />
        </div>
      </template>
    </div>

    <Footer />
  </div>
</template>


<script>
import Vue from 'vue'
import { Circle } from 'vant'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import MyList from '../../components/MyList'
import * as api from '@/axios/api'
import { getUserPropertyTotal } from '../../axios/api'

Vue.use(Circle)

export default {
  name: 'articlePage',
  components: {
    Footer,
    Header, MyList
  },
  data() {
    return {
      fromListType: 'Thông tin nắm giữ',
      currentRate: 100,
      rate: 0,
      property_1: 1,
      property_2: 1,
      property_3: 1,
      listType: 'list',
      showTemplate: 1,
      propertyInfo: {},
      holdingTotal: {
        orderTotalPrice: 0,
        profitMoney: 0,
        nowPrice: 0,
      },
      pageNum: 1,
      pageSize: 15,
      proList: {},
    }
  },
  mounted() {
    this.getHoldingsList(1)
    this.getHoldingsTotal()
  },
  methods: {
    changeData(...agrs) {
      if (typeof this[agrs[1]] === 'function') {
        this[agrs[1]](agrs[0])
      }
    },
    //债券资产汇总更新
    getHoldingsTotal() {
      let obj = {
        pKey: sessionStorage.getItem('pKey'),
        state: 0
      }
      let data = api.getUserPropertyTotal(obj)
      try {
        data.then(result => {
          this.holdingTotal = result.data
        })
      } catch (error) {
        console.log(error)
      }
    },
    //资产持有列表
    async getHoldingsList(pageNum) {
      //债券资产汇总更新
      this.getHoldingsTotal()
      let obj = {
        pKey: sessionStorage.getItem('pKey'),
        state: 0,
        pageNum: pageNum || this.pageNum,
        pageSize: this.pageSize,
      }
      let data = await api.getOrderList(obj)
      try {
        if (data.status === 0) {
          let zccyList = {
            tabList: [
              {
                name: 'Mã CK',
                isChange: 0
              },
              {
                name: 'Số lượng',
                isChange: 0
              },
              {
                name: 'Giá mua',
                isChange: 0
              },
              {
                name: 'Giá TT',//市场价
                isChange: 0
              },
              {
                name: 'P/L',
                isChange: 1
              }
            ],
            zccyList: {
              total: data.data.total, //总数
              list: []
            },
            lastPage: data.data.lastPage || Math.ceil(data.data.total / this.pageSize),
            fn: 'getHoldingsList',
          }
          data.data.list.map((result, index) => {
            //data.data.list[index].buyOrderPrice = result.buyOrderPrice ? result.buyOrderPrice / 1000 : 0
            //data.data.list[index].now_price = result.now_price ? result.now_price / 1000 : 0
          })
          if (pageNum == 1) {
            zccyList.zccyList.list = data.data.list
            this.proList = zccyList
          } else {
            this.proList.zccyList.list.push(...data.data.list)
          }
          this.proList.pageNum = pageNum
        }
      } catch (error) {
        console.log(error)
      }
    },
    getPropertyInfo() {
      this.showTemplate = 2
      let obj = {
        pKey: sessionStorage.getItem('pKey')
      }
      let res = api.getUserProperty(obj)
      res.then(result => {
        this.rate = Math.ceil(result.data.shareholdingAmt / result.data.userAmt * 100)
        this.propertyInfo = result.data
      })
    }
  },
}
</script>
