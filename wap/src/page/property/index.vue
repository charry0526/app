<style src="../../../src/assets/styles/common.css"/>
<style lang="less" scoped>
@import "../../../src/assets/styles/index.less";

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
            padding: 0 8px 12px 0;
            display: inline-block;
            white-space: nowrap;

            &:nth-child(2) {
              padding-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<style scoped lang="less">
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

      span {
        margin: 5px 20px;
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

.property-total-icon>div:first-child {
  margin-right: 30px;
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
<style >
.van-circle__text {
  color: #fff
}

.van-circle__hover {
  stroke: #ff8f00
}
</style>
<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main">
      <div class="property-menu">
        <div :class="showTemplate === 1 ? 'property-menu-active' : ''" @click="showTemplate = 1; getHoldingsList(1)">
          持有信息
        </div>
        <div :class="showTemplate === 2 ? 'property-menu-active' : ''" @click="getPropertyInfo();">资产报告
        </div>
      </div>
      <template v-if="showTemplate === 2">
        <div class="property-template">
          <div class="property-title">
            <div class="property-icon">
              <img src="../../assets/images/property/graphics.png" alt="" />
            </div>
            <div>图形化展示</div>
          </div>
          <div class="between-box property-detail">
            <div class="between-box_left">
              <div style="font-size: 14px">总资产</div>
              <div style="font-size: 20px; margin-top: 10px; margin-bottom: 20px">
                {{ (propertyInfo.userAmt + propertyInfo.enableAmt).toLocaleString('en-US') }}
              </div>
              <div class="between-box property-total-icon">
                <div>
                  <div class="between-box">
                    <div class="origin-box origin-green"></div>
                    <div>持有资产</div>
                  </div>
                  <div>{{ propertyInfo.shareholdingAmt.toLocaleString('en-US') }}</div>
                </div>
                <div>
                  <div class="between-box">
                    <div class="origin-box origin-yellow"></div>
                    <div>可用资产</div>
                  </div>
                  <div>{{ propertyInfo.availableAmount.toLocaleString('en-US') }}</div>
                </div>
              </div>
            </div>
            <div class="bingtu">
              <van-circle v-model="currentRate" size="111px" :rate="rate" layer-color="#5bba6e" stroke-width=80
                          :color="red" />
              <div class="bingtu_text">
                总资产<span> {{ (propertyInfo.userAmt + propertyInfo.enableAmt).toLocaleString('en-US') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="property-template">
          <div class="property-title">
            <div class="property-icon">
              <img src="../../assets/images/property/money.png" alt="" />
            </div>
            <div>资产详情</div>
          </div>


          <div class="between-box property-detail-subtitle property-detail-title">
            <div>证券资产</div>
            <div class="between-box">
              <div>{{ propertyInfo.userAmt.toLocaleString('en-US') }}</div>
              <div class="fold-icon" @click="property_1 = property_1 === 1 ? 0 : 1">
                <img v-if="property_1 === 1" src="../../assets/images/property/dropdown.png" alt="" />
                <img v-else src="../../assets/images/users/more.png" alt="" />
              </div>
            </div>
          </div>
          <div class="property-list-template" v-if="property_1">
            <div class="between-box">
              <div>持股总市值</div>
              <div>{{ propertyInfo.shareholdingAmt.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>持股总数</div>
              <div>{{ propertyInfo.shareholdingNumber.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>持股损益总金额</div>
              <div>{{ propertyInfo.shareholdingProperty.toLocaleString('en-US') }}</div>
            </div>
          </div>

          <div class="between-box property-detail-subtitle property-detail-title">
            <div>现金</div>
            <div class="between-box">
              <div>{{ propertyInfo.enableAmt.toLocaleString('en-US') }}</div>
              <div class="fold-icon" @click="property_2 = property_2 === 1 ? 0 : 1">
                <img src="../../assets/images/property/dropdown.png" alt="" />
              </div>
            </div>
          </div>
          <div class="property-list-template" v-if="property_2">
            <div class="between-box">
              <div>可用金额</div>
              <div>{{ propertyInfo.availableAmount.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>可提取资金</div>
              <div>{{ propertyInfo.extractableAmount.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>冻结资金</div>
              <div>{{ propertyInfo.freezeAmount.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>保证金</div>
              <div>{{ propertyInfo.margin.toLocaleString('en-US') }}</div>
            </div>
          </div>

          <div class="between-box property-detail-subtitle property-detail-title">
            <div>债务</div>
            <div class="between-box">
              <div>{{ propertyInfo.debtAmt.toLocaleString('en-US') }}</div>
              <div class="fold-icon" @click="property_3 = property_3 === 1 ? 0 : 1">
                <img src="../../assets/images/property/dropdown.png" alt="" />
              </div>
            </div>
          </div>
          <div class="property-list-template" style="border: none" v-if="property_3">
            <div class="between-box">
              <div>信用金额度</div>
              <div>{{ propertyInfo.creditLimit.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>信用金可贷金额</div>
              <div>{{ propertyInfo.creditAvailableLimit.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>信用金已贷金额</div>
              <div>{{ propertyInfo.creditBorrowedAmt.toLocaleString('en-US') }}</div>
            </div>
            <div class="between-box">
              <div>信用金已还金额</div>
              <div>{{ propertyInfo.creditStillAmt.toLocaleString('en-US') }}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- 持股信息 -->
      <template v-if="showTemplate === 1">
        <div class="tabBox">
          <div class="tabChildren isContent MyCard">
            <div class="isContent_list">
              <div class="isContent_item"><span>持有成本</span><span>P/L</span></div>
              <div class="isContent_item"><span class="text_red">353,961,300</span><span
                class="text_green">-42,124,220</span></div>
            </div>
            <div class="isContent_list">
              <div class="isContent_item"><span>持有市场价</span><span>P/L</span></div>
              <div class="isContent_item"><span class="text_red">353,961,300</span><span
                class="text_green">-42,124,220</span></div>
            </div>
          </div>
          <my-list :proList="proList" :listType="listType" @changeData="changeData" />
        </div>
      </template>
    </div>

    <Footer />
  </div>
</template>


<script>
import Vue from 'vue';
import { Circle } from 'vant';
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import MyList from '../../components/MyList'
import * as api from '@/axios/api'
Vue.use(Circle);

export default {
  name: 'articlePage',
  components: {
    Footer,
    Header, MyList
  },
  data() {
    return {
      currentRate: 100,
      rate: 50,
      property_1: 1,
      property_2: 1,
      property_3: 1,
      // page: 1,
      listType: 'list',
      showTemplate: 1,
      propertyInfo: {},
      // holdingsList: [],
      pageNum: 1,
      pageSize: 15,
      proList: {},
    }
  },
  mounted() {
    this.getHoldingsList(1)
  },
  methods: {
    changeData(...agrs) {
      if (typeof this[agrs[1]] === 'function') {
        this[agrs[1]](agrs[0])
      }
    },
    async getHoldingsList(pageNum) {
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
                name: '商品名称',
                isChange: 0
              },
              {
                name: '数量',
                isChange: 0
              },
              {
                name: '购买价',
                isChange: 0
              },
              {
                name: '市场价',
                isChange: 0
              },
              {
                name: '损益',
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
      let obj = {
        pKey: sessionStorage.getItem('pKey')
      }
      let res = api.getUserProperty(obj)
      res.then(result => {
        this.propertyInfo = result.data
        this.showTemplate = 2
      })
    }
  },
}
</script>
