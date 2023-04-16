<template>
  <div class="wrapper">
    <mt-navbar class="top-navbar"
               v-model="selected"
               fixed>
      <mt-tab-item class="top-nav-item"
                   id="1">Đề xuất</mt-tab-item>
      <mt-tab-item class="top-nav-item"
                   id="2">xét duyệt</mt-tab-item>
      <mt-tab-item class="top-nav-item"
                   id="3">Giữ mã</mt-tab-item>
    </mt-navbar>
    <!-- <div class="line"></div> -->
    <mt-tab-container class="order-list"
                      v-model="selected">
      <mt-tab-container-item class="order-list-one"
                             id="1">
        <div class="table-box">
          <h3>Danh sách đăng ký</h3>
          <table class="table">
            <th>Mã CK</th>
            <th>Mã đăng ký</th>
            <th>Giá phát hành</th>
            <th>order-title</th>
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
                             @click="toCash">
                    Đề xuất
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
          <th>Mã CK</th>
          <th>Giá trị</th>
          <th>CP</th>
          <th>margin</th>
          <th>Chi phí</th>
          <th>Trạng thái</th>
          <tr v-for="(item,index) in 30"
              :key="index">
            <td>LGC</td>
            <td>50,000,000</td>
            <td>1,000</td>
            <td>10</td>
            <td>5,000,000</td>
            <td>Chưa xét duyệt</td>
          </tr>
        </table>
      </mt-tab-container-item>
      <mt-tab-container-item class="order-list-three"
                             id="3">
        <ul class="order-info-box-wrap"
            v-for="(item,index) in GiumaList"
            :key="index">
          <li>
            <div class="title">
              Tập đoàn C.E.O
              <div class="tag">Đang giữ mã</div>
            </div>
          </li>
          <li>
            <div>Tổng lợi nhuận:</div>
            <div>23,100</div>
          </li>
          <li>
            <div>Giá mua:</div>
            <div>23,100</div>
          </li>
          <li>
            <div>Giá bán:</div>
            <div>23,100</div>
          </li>
          <li>
            <div>Số ngày nắm giữ:</div>
            <div>23,100</div>
          </li>
          <li>
            <div>Số lượng:</div>
            <div>23,100</div>
          </li>
          <li>
            <div v-if="index!=0">20/03/2023 10:20:49</div>
            <div>04/04/2023 10:26:52</div>
            <div v-if="index==0" class="foot-btn-box">
              <div class="foot-btn">Bán ra</div>
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
            Nhap s6 luong CP mun mua
          </p>
          <div class="box-tab">
            <input v-model="selectNumber"
                   class="btn-default"
                   type="number">
            <p class="margin">margin</p>
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
            <p class="totle">Tin ky quy:0</p>
            <div class="button-box">
              <div @click="dialogShow=false"
                   class="btn">Đề xuất</div>
              <div @click="dialogShow=false"
                   class="btn">
                Xác định
              </div>

            </div>
          </div>
        </div>
      </div>

    </mt-popup>
  </div>

</template>

<script>

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
      GiumaList: [
        { label: 'Tập đoàn C.E.O' },
        { label: 'SABECO' },
        { label: 'Bán lẻ KTS FPT' },
        { label: 'Vietinbank' },
        { label: 'Chứng khoán HCM' },
        { label: 'Địa ốc First Real' },
        { label: 'Ngân hàng BIDV' },
        { label: 'Hóa dầu Petrolmex' },
        { label: 'CTCP City Auto' },
        { label: 'Ngân hàng Á Châu' },
        { label: 'Tập đoàn PC1' },
        { label: 'CTCP LICOGI 16' },
        { label: 'Tập đoàn C.E.O' }
      ]

    }
  },
  watch: {},
  computed: {},
  created () { },
  mounted () {
    if (this.$state.theme === 'red') {
      document.body.classList.remove('black-bg')
      document.body.classList.add('red-bg')
    }
  },
  beforeDestroy () {
    if (this.$state.theme === 'red') {
      document.body.classList.remove('red-bg')
      document.body.classList.add('black-bg')
    }
  },
  methods: {
    toCash (option) {
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
  background: #25292e;
  padding: 0.1rem 0.2rem;
  margin-bottom: 0.3rem;
  > li {
    width: 100%;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem solid #eee;
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
      .tag {
        color: #1b8e5d;
        border: 1px solid #1b8e5d;
        padding: 0.03rem 0.1rem;
        margin-left: 0.2rem;
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
  > li:nth-last-of-type(1) {
    border-bottom: none;
  }
}
</style>
