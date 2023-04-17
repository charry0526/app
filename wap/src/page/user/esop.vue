<template>
  <div class="wrapper">
    <mt-navbar class="top-navbar" @click.native="tabchange"
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
          <table class="table">
            <th>CK代码</th>
            <th>注册码</th>
            <th>发行价</th>
            <th>履行</th>
            <tr v-for="(item,index) in 5"
                :key="index">
              <td>单元格1</td>
              <td>单元格2</td>
              <td>单元格3</td>
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
        <table class="table">
          <th>马克</th>
          <th>价值</th>
          <th>cp</th>
          <th>利润</th>
          <th>费用</th>
          <th>状态</th>
          <tr v-for="(item,index) in 30"
              :key="index">
            <td>LGC</td>
            <td>50,000,000</td>
            <td>1,000</td>
            <td>10</td>
            <td>5,000,000</td>
            <td class="tdActive">尚未审核</td>
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
            <p class="margin">利润</p>
            <div class="tab-con">
              <ul class="radio-group clearfix">
                <li v-for="(item,index) in numberList"
                    :key="item.key"
                    @click="selectTypeFun(item.value,index)">

                  <div :class="selecIndex == index?'on':''">
                    {{item.value}}
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

export default {
  components: {
  },
  props: {},
  data () {
    return {
      selectNumber: '',
      selecIndex: 0,
      selected: '1', // 选中
      dialogShow: false,
      numberList: [{ value: '5000', key: '1' }, { value: '10000', key: '2' }],
      GiumaList: [],
      itemInfo: {}
    }
  },
  mounted () {
    if (this.$state.theme === 'red') {
      document.body.classList.remove('black-bg')
      document.body.classList.add('red-bg')
    }
    this.getNewlist()
    this.fillData()
  },
  beforeDestroy () {
    if (this.$state.theme === 'red') {
      document.body.classList.remove('red-bg')
      document.body.classList.add('black-bg')
    }
  },
  computed: {
    deposit () {
      return 1000
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
    },
    /**
     * 切换tab
     */
    tabchange (option) {
      this.getNewlist()
    },
    /**
     * 确认购买股票
     */
    popconfirm () {

    },
    /**
     * 提出列表
     */
    getNewlist () {
      api.Newlist().then(res => {
        console.log(res)
      })
    },
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
    toCash (option) {
      this.itemInfo = option
      this.dialogShow = !this.dialogShow
    },
    selectTypeFun (value, index) {
      // 选择充值金额
      // this.selectNumber = value
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
    }
    .tdActive{
      color:rgb(255, 19, 19);
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
  width:7rem;
  background: #25292e;
  padding: 0.1rem 0.2rem;
  margin:0 auto 0.3rem;
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
</style>
