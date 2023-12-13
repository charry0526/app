<template>
  <div class="wrapper">
    <mt-navbar
      class="top-navbar"
      @click.native="tabchange"
      v-model="selected"
      fixed
    >
    </mt-navbar>
    <mt-tab-container class="order-list" v-model="selected">
      <mt-tab-container-item class="order-list-one" id="1" style="margin-top: -.8rem">
        <div>
          <!--为echarts准备一个具备大小的容器dom-->
          <div id="main" style="width: 400px;height: 200px;display: flex;flex-direction: row-reverse;justify-content: space-around;margin: 0 auto"></div>
        </div>
        <template>
<!--            <div class="info">-->
<!--              <div class="info_item">-->
<!--                <div>{{ credistInfo.creditScore }}</div>-->
<!--                <div style="font-size: 15px;">Đánh giá tín dụng</div>-->
<!--              </div>-->
<!--              <div class="info_list">-->
<!--                <div class="info_item">-->
<!--                  <div>{{ credistInfo.creditLimit }}</div>-->
<!--                  <div style="font-size: 14px;">Hạn mức vay tiền</div>-->
<!--                </div>-->
<!--                <div class="info_item">-->
<!--                  <div>{{ credistInfo.residualCredit }}</div>-->
<!--                  <div style="font-size: 14px;">Hạn mức mượn tiền</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
          <div class="info">
            <div class="info_item">
              <div>{{ userInfo.creditScore }}</div>
              <div style="font-size: 15px;">Đánh giá tín dụng</div>
            </div>
            <div class="info_list">
              <div class="info_item">
                <div>{{ userInfo.creditLimit }}</div>
                <div style="font-size: 14px;">Hạn mức vay tiền</div>
              </div>
              <div class="info_item">
                <div>{{ userInfo.amountBorrowed }}</div>
                <div style="font-size: 14px;color: #ed801a;">Hạn mức mượn tiền</div>
              </div>
            </div>
          </div>
          <div style="height: 100%">
            <table infinite-scroll-distance="10" class="table">
              <tr>
                <td>
                  <div class="button-box">
                    <mt-button class="btn-red pull-right btn"
                               size="small"
                               type="danger" style="background-color: deepskyblue !important;"
                               @click="popUp02()">
                      Vay tiền
                    </mt-button>
                  </div>
                </td>
                <td>
                  <div class="button-box">
                    <mt-button class="btn-red pull-right btn"
                               size="small"
                               type="danger" style="background-color: #f5991d !important;"
                               @click="popUp()">
                      Trả tiền
                    </mt-button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </template>
      </mt-tab-container-item>
    </mt-tab-container>
<!--    付款弹窗-->
    <mt-popup v-model="dialogShow"
              :closeOnClickModal="false"
              class="mint-popup-box mint-popup-white">
      <div class="clearfix">
        <a @click="dialogShow = false"
           class="pull-right"><i class="iconfont icon-weitongguo"></i></a>
      </div>
      <div class=" page-part transaction">
        <div class="back-info">
          <p class="title">
            Vui lòng nhập số tiền thanh toán
          </p>
          <div class="box-tab">
            <input v-model="selectNumber"
                   class="btn-default"
                   type="number">

            <p class="margin">Chọn số tiền thanh toán</p>
            <div class="tab-con">
              <ul class="radio-group clearfix">
                <li v-for="(item,index) in numberList"
                    :key="item.key"
                    @click="selectTypeFun(item,index)">
                  <div :class="selecIndex == index?'on':''">
                    {{item.num}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="button-box">
              <div @click="handclick()"
                   class="btn" style="background: #2AB0B2;color: #000000;width: 4rem;">
                nộp
              </div>

            </div>
          </div>
        </div>
      </div>
    </mt-popup>
<!--贷款弹窗-->
    <mt-popup v-model="dialogShow02"
              :closeOnClickModal="false"
              class="mint-popup-box mint-popup-white">
      <div class="clearfix">
        <a @click="dialogShow02 = false"
           class="pull-right"><i class="iconfont icon-weitongguo"></i></a>
      </div>
      <div class=" page-part transaction">
        <div class="back-info">
          <p class="title">
            Vui lòng nhập số tiền vay
          </p>
          <div class="box-tab">
            <input v-model="selectNumber02"
                   class="btn-default"
                   type="number">
            <div class="button-box">
              <div @click="handclick2()"
                   class="btn" style="background: #2AB0B2;color: #000000;width: 4rem;">
                nộp
              </div>

            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import {
  CodeList,
  endorseList,
  CodeDateFormat,
  CodeDateFormatFrist,
} from "@/utils/data.js";
import * as api from "@/axios/api";
import { formatTime } from "@/utils/imgupload";
import echarts from 'echarts'
import { debounceJArgs } from '@/utils/utils'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      formatTime,
      selectNumber: 0,
      selectNumber02: 0,
      leverValue: 0,
      selecIndex: 0,
      selected: "1", // 选中
      dialogShow: false, // 贷款弹窗
      dialogShow02: false, // 付款弹窗
      numberList: [],
      credistInfo: {},
      userInfo: {
        // phone: 15888
      },
      paegs: [],
      loadingAll: [],
      loading: false,
      tendorseListDate: [],
      isagree: false,
      // 测试饼图
      charts: '',
      opinion:['Vay tiền','Mượn tiền'],
      opinionData:[
        {value:0, name:'Vay tiền'},
        {value:0, name:'Mượn tiền'}
      ]
    };
  },
  mounted() {
    if (this.$state.theme === "red") {
      document.body.classList.remove("black-bg");
      document.body.classList.add("red-bg");
    }
    this.getUserInfo(); // 个人信息
    this.fillData(); // 填充数据
    // this.getCredist(); //信用金
    // 测试饼图
    this.$nextTick(function() {
      this.drawPie('main')
    })
    this.numberList = [
      {num:1000},
      {num:2000},
      {num:3000},
      {num:4000},
      {num:5000}
    ]
  },
  methods: {
    //防抖
    handclick:debounceJArgs(function(e){
      this.topUpSubmit()
    },(3000)),
      //防抖
    handclick2:debounceJArgs(function(e){
      this.popconfirm()
    },(3000)),
    // 提交贷款
    async popconfirm(){
      console.log('popconfirm',this.selectNumber02)
      let opts = {
        amountCreditApplied: this.selectNumber02
      };
      let data = await api.moneyCredit(opts);
      if (data.status === 0) {
        this.$message.success(data.msg);
        this.selectNumber02 = 0
        this.dialogShow02 = false
        this.getUserInfo() // 个人信息刷新
      } else {
        this.$message.error(data.msg);
      }

    },
    // 提交付款
    async topUpSubmit() {
      let opts = {
        topupMoney: this.selectNumber
      };
      let data = await api.topUp(opts);
      if (data.status === 0) {
        this.$message.success(data.msg);
        this.selectNumber = 0
        this.dialogShow = false
      } else {
        this.$message.error(data.msg);
      }
    },
    //赋值到数组
    fillData() {
      this.loadingAll = new Array(3).fill([]).map((item) => {
        return { loading: false };
      });
      this.paegs = new Array(3).fill([]).map((item) => {
        return { pageNum: 0, pageSize: 30, total: null };
      });
    },

    // 获取用户信息
    async getUserInfo() {
      let data = await api.getUserInfo();
      if (data.status === 0) {
        // 判断是否登录
        this.userInfo = data.data;
        console.log("userInfo: ",this.userInfo)
        this.opinionData = [
          {
            value: data.data.creditLimit,
            name:'Vay tiền'
          },
          {
            value: data.data.amountBorrowed,
            name:'Mượn tiền'
          }
        ]
        this.drawPie('main')
      }
    },
    // 获取信用金
    // async getCredist() {
    //   let data = await api.moneyCreditInfo();
    //   this.credistInfo = data.data;
    //   this.opinionData = [
    //     {
    //       value: data.data.creditLimit,
    //       name:'Vay tiền'
    //     },
    //     {
    //       value:data.data.residualCredit,
    //       name:'Mượn tiền'
    //     }
    //   ]
    //   this.drawPie('main')
    // },
    change(e) {
      this.$forceUpdate();
    },
    // topupChange(e) {
    //   this.$forceUpdate();
    // },
    // handleClose(done) {
    //   this.$refs.tableList.clearSort(); //此方法为重置排序选中状态
    // },
    // topUPClose(done) {
    //   done();
    // },

    // 重置表单
    // reset() {
    //   this.selectNumber = "";
    //   this.selecIndex = 0;
    // },
    selectTypeFun(value, index) {
      this.selectNumber = value.num;
      this.selecIndex = index;
    },
    // 测试饼图
    drawPie(id){
      this.charts = echarts.init(document.getElementById(id),'dark')
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
          data:this.opinion
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:this.opinionData
          }
        ]
      })
    },
    // 付款弹窗操作
    popUp () {
      this.dialogShow = !this.dialogShow
    },
    // 贷款弹窗操作
    popUp02 () {
      this.dialogShow02 = !this.dialogShow02
    }
  }
};
</script>
<style scoped lang="less" src="@/assets/css/esop.less" >
.el-dialog-div {
  height: 60vh;
  overflow: auto;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 200px);
  max-width: calc(100% - 30px);
}
</style>

<style>
.info{
  width: 7.2rem;
  height: 3rem;
  background: #fff;
  border-radius: 2%;
  margin: 0.2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: .3rem;
  box-sizing: border-box;
}
.info_list{
  width: 5.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info_item{
  font-size: 0.36rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  color: #666666;
}
.info_item>div:nth-child(1){
  font-weight: 800;
}
.info_item>div:nth-child(2){
  margin-top: .1rem;
  color: #b3b8be;
  font-weight: 500;
}
.btn{
  width: 3rem;
  height: 0.8rem !important;
  border-radius: 6%;
  margin-top: 1rem;
}
.btn .mint-button-text{
  font-size: .3rem;
}
</style>
