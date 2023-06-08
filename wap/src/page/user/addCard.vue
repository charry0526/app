<template>
  <div class="wrapper">
    <!-- <div class="header">
      <mt-header :title="type+'银行卡'">
        <router-link to="/card" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div> -->
    <div class="box transaction">
      <div class="box-contain clearfix">
        <div class="empty text-center" style="margin-top: 0.3rem;">
          <!-- 您已通过实名认证 -->
          <i style="color:red;font-size: 1.2rem;margin-top:0.2rem" class="iconfont icon-chongzhi2"></i>
        </div>
      </div>
    </div>
    <div class="form-block page-part">
        <!-- <mt-field label="银行名称" placeholder="例:中国工商银行（全称）" type="text" v-model="bankName"></mt-field>
      <mt-field label="开户支行" placeholder="需要精确到分行或者支行" type="text" v-model="bankAddress"></mt-field>
      <mt-field label="银行卡号" placeholder="请输入银行卡号" v-model="bankNo"></mt-field> -->
      <mt-field @click.native="selectBank" label="Tên" placeholder="Ví dụ: Ngân hàng Công thương Việt Nam" :readonly="true" type="text" v-model="bankName"></mt-field>
      <mt-field label="Chi nhánh" placeholder="Cần chính xác đến tận chi nhánh" type="text" v-model="bankAddress"></mt-field>
      <mt-field label="Số tài khoản" placeholder="Vui lòng nhập số thẻ ngân hàng" v-model="bankNo"></mt-field>
    </div>
    <!-- <div class="form-block page-part">
        <mt-field label="持卡人姓名" placeholder="和银行卡绑定一致" type="text" v-model="username"></mt-field>
        <mt-field label="银行预留手机号" placeholder="请输入持卡人手机号" type="text" v-model="username"></mt-field>
    </div> -->
    <div class="rule-box">
      <div class="title">Gợi ý:：</div>
      <ul>
        <!-- <li>1.新用户注册后必须通过添加银行卡。</li>
        <li>2.用户只能添加一张本人银行卡。</li>
        <li>3.真实姓名必须和出金银行卡户名一致。</li> -->
         <li>1.Sau khi đăng ký, người dùng mới phải thêm thẻ ngân hàng。</li>
        <li>2.Người dùng chỉ có thể thêm một thẻ ngân hàng cá nhân。</li>
        <li>3.Tên thật phải trùng với tên tài khoản thẻ ngân hàng rút tiền。</li>
      </ul>
    </div>
    <div class="btnbox">
      <span class="text-center btnok" @click="toSure"> {{$t("config")}}</span>
    </div>
    <van-popup v-model="bankShow" round position="bottom">
      <van-picker
        title="Chọn thẻ ngân hàng"
        show-toolbar
        :columns="bankCol"
        confirm-button-text	="Xác nhận"
        cancel-button-text	="Hủy bỏ"
        value-key="name"
        @confirm="onConfirm"
        @cancel="bankShow = false"
      />
    </van-popup>
    <van-popup v-model="payShow"
               round
               position="bottom">
      <div class="section_1 flex-col">
        <div class="box_15 flex-row justify-between">
          <img @click="payShow=false"
               class="icon_1"
               referrerpolicy="no-referrer"
               src="@/assets/img/cha.jpg" />
        </div>
        <div class="input_1 flex-col Input">
          <van-field class="text_23 InputArea"
                     placeholder="Vui lòng nhập ngân hàng"
                     v-model="name"></van-field>
        </div>
        <button @click="sava"
                class="button_1 flex-col">
          <span class="text_24">Lưu</span>
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'
import { isNull, bankNoReg, isName } from '@/utils/utils'
import Picker from 'vant/lib/Picker'
import Popup from 'vant/lib/popup'
import Field from 'vant/lib/Field'

import { bankCol } from '@/utils/data.js'
export default {
  components: {
    // Picker,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Field.name]: Field

  },
  props: {},
  data () {
    return {
      name: '',
      payShow: false,
      bankShow: false,
      bankCol: bankCol,
      bankName: '',
      bankNo: '',
      bankAddress: '', // 支行地址
      type: '添加'
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    this.type = this.$route.query.type ? '修改' : '添加'
    if (this.$store.state.bankInfo) {
      this.bankName = this.$store.state.bankInfo.bankName
      this.bankNo = this.$store.state.bankInfo.bankNo
      this.bankAddress = this.$store.state.bankInfo.bankAddress
    }
  },
  methods: {
    sava () {
      if (!this.name) {
        return Toast('Vui lòng nhập')
      }
      this.bankName = this.name
      this.payShow = !this.payShow
      this.name = ''
    },
    selectBank () {
      // this.payShow = !this.payShow
      this.bankShow = !this.bankShow
    },
    onConfirm ({name}, index) {
      if (index == 10) {
        this.bankShow = !this.bankShow
        this.payShow = !this.payShow
        return false
      }
      this.bankName = name
      this.bankShow = !this.bankShow
    },

    async toSure () {
      // Toast('银行卡已存在')
      // return false
      // 添加银行卡
      if (isNull(this.bankNo) || !bankNoReg(this.bankNo)) {
        Toast('Vui lòng nhập số thẻ ngân hàng')
      } else if (isNull(this.bankName) || !isName(this.bankName)) {
        Toast('Vui lòng nhập tên ngân hàng')
      } else if (isNull(this.bankAddress) || !isName(this.bankAddress)) {
        Toast('Vui lòng nhập chi nhánh mở tài khoản')
      } else {
        let opts = {
          bankName: this.bankName,
          bankNo: this.bankNo,
          bankAddress: this.bankAddress
        }
        if (this.$route.query.type === 'edit') {
          let data = await api.updateBankCard(opts)
          if (data.status === 0) {
            Toast('sửa đổi thành công!')
            this.$router.push('/card')
          } else {
            Toast(data.msg)
          }
        } else {
          let data = await api.addBankCard(opts)
          if (data.status === 0) {
            Toast('Thêm thành công!')
            this.$router.push('/card')
          } else {
            Toast(data.msg)
          }
        }
      }
    },
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .rule-box {
    padding: 0.2rem 0.3rem;

    .title {
      font-size: 0.3rem;
      height: 0.5rem;
      line-height: 0.5rem;
      margin-bottom: 0.2rem;
      color: #DF9F3E;
    }

    ul {
      li {
        color: #999;
        line-height: 0.5rem;
      }
    }
  }

  .transaction {
    // padding-bottom: 0.2rem;
  }
  /deep/.mint-cell-title{
    // width:40%;
    // text-align: right;
  }
  .section_1 {
  background-color: rgba(255, 255, 255, 1);
  padding: 1rem .2rem;
  .box_15 {

    .icon_1 {
      position: absolute;
      right: .3rem;
      top: .3rem;
      width: .4rem;
      height: .4rem;
    }
  }
  .input_1 {
    background-color: rgba(255, 255, 255, 1);
    // border-radius: 8px;
    border: .03rem solid rgba(205, 205, 205, 1);
    margin: .3rem 0 0 4px;
    padding-left: .3rem;
    width: 90%;
    border-radius: .5rem;
    // height: 1rem;
    // padding-right: 25px;
    margin:0 auto;
    .text_23 {
      overflow-wrap: break-word;
      color: rgba(187, 187, 187, 1);
      font-size: .2rem;
      font-weight: NaN;
      text-align: left;
      white-space: nowrap;
      // line-height: 40px;
      // padding: 0 0 0 0px;
      background: none;
      border: 0;
      flex: auto;
    }
    .van-field__body {
      // height: 84px;
    }
  }
  .button_1 {
    width: 80%;
    background-color: rgba(56, 129, 242, 1);
    border-radius: .5rem;
    border: .1rem solid rgba(56, 129, 242, 1);
    margin: 1rem auto .2rem;
    padding: .2rem;
    .text_24 {
      width: 100%;
      overflow-wrap: break-word;
      color: rgba(255, 255, 255, 1);
      font-size: .2rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      white-space: nowrap;
      // line-height: 40px;
    }
  }
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.justify-between {
  justify-content: space-between;
}
::v-deep .van-field__body {
  height: 100% !important;
}
::v-deep .van-overlay {
  z-index: 20010000 !important;
}
::v-deep .van-popup {
  z-index: 20010000 !important;
}
</style>
