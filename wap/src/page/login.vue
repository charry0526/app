<template>
  <div class="wrapper">
    <mt-header title="Đăng nhập tài khoản">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="contain-box">
      <img @load="imgOnload()" ref="loginBg" class="login-bg" src="../assets/img/login-bg.jpg" alt="" srcset="">
      <div class="contain-main">
        <div class="logo-box">
          <img class="logo"  src="../assets/img/1-01.png" alt="">
        </div>
        <div class="login-form-item input-model">
            <img v-show="$state.theme != 'red'" class="login-ico" src="../assets/ico/loginuser.png" alt="">
            <img v-show="$state.theme == 'red'" class="login-ico" src="../assets/ico/loginuser-red.png" alt="">
            <input
            class="login-input"
            placeholder="Tên tài khoản"
            type="tel" pattern="[0-9]*"
            v-model="phone"
            >
          </div>
          <div class="login-form-item input-model">
            <img v-show="$state.theme != 'red'" class="login-ico" src="../assets/ico/loginpwd.png" alt="">
            <img v-show="$state.theme == 'red'" class="login-ico" src="../assets/ico/loginpwd-pwd.png" alt="">
            <input class="login-input" type="password" placeholder="Mật khẩu" v-model="psd">
          </div>
          <div class="login-form-item submit-model" @click="gook">
            Đăng nhập
            <i v-show="isloading" style="color:#fff;" class="iconfont icon-jiazaizhong"></i>
          </div>
          <div class="login-form-item submit-model goregister" @click="toRegister">
            Đăng ký
          </div>
          <p class="tips">Quên mật khẩu？</p>
      </div>
    </div>
    <!-- <div class="login-form">
      <div class="login-avatar">
        <img class="login-ico" src="../assets/ico/wogerenziliao.png" alt="">
      </div>
      <div class="login-form-item input-model"
      style="margin-top:1.32rem;"
      >
        <img v-show="$state.theme != 'red'" class="login-ico" src="../assets/ico/loginuser.png" alt="">
        <img v-show="$state.theme == 'red'" class="login-ico" src="../assets/ico/loginuser-red.png" alt="">
        <input
        class="login-input"
        placeholder="Tên tài khoản"
        type="tel" pattern="[0-9]*"
        v-model="phone"
        >
      </div>
      <div class="login-form-item input-model">
        <img v-show="$state.theme != 'red'" class="login-ico" src="../assets/ico/loginpwd.png" alt="">
        <img v-show="$state.theme == 'red'" class="login-ico" src="../assets/ico/loginpwd-pwd.png" alt="">
        <input class="login-input" type="password" placeholder="Mật khẩu" v-model="psd">
      </div>
      <div class="login-form-item submit-model" @click="gook">
        Đăng nhập
        <i v-show="isloading" style="color:#fff;" class="iconfont icon-jiazaizhong"></i>
      </div>
      <div class="login-form-item extra-model">
        <div :style="{color:$state.theme =='red'?'#BB1815':'#86CBD1'}">
          <span style="color:#0E6580">
            Quên mật khẩu？
            </span><span @click="toRegister">
              Đăng ký
            </span></div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { isNull, isPhone } from '@/utils/utils'
import * as api from '@/axios/api'

export default {
  data () {
    return {
      isloading: false,
      phone: '',
      code: '',
      psd: '',
      isChecked: true, // 自动登录
      isDisabled: false,
      codeshow: true,
      count: '', // 倒计时
      clickFalg: 0, //  点击次数
      logo: '' // 设置信息
    }
  },
  created: function () {
    this.$setgoindex()
  },
  mounted: function () {
    this.getInfoSite()
    this.phone = this.$store.state.userInfo.phone
    let header = document.querySelector('.mint-header')
    let bodyBox = document.querySelector('.body-box')
    header.style.backgroundColor = 'transparent'
    bodyBox.style.height = '100%'
    // this.$nextTick(() => {
    //     console.log(this.$refs.loginBg)
    // })
  },
  methods: {
    imgOnload () {
      this.$nextTick(() => {
        let imgheight = this.$refs.loginBg.height
        let containMainHeight = document.querySelector('.contain-main')
        var containStyles = window.getComputedStyle(containMainHeight)
        var containStyleMarTop = (containStyles.marginTop.replace('px', '')) * 1
        containMainHeight.style.height = (window.innerHeight - imgheight + Math.abs(containStyleMarTop)) + 'px'
      })
    },
    async getInfoSite () {
      // 获取 logo
      let data = await api.getInfoSite()
      if (data.status === 0) {
        this.logo = data.data.siteLogoSm
      } else {
        Toast(data.msg)
      }
    },
    async checkPhone () {
      // 先验证是否已经注册
      let data = await api.checkPhone({ phoneNum: this.phone })
      if (data.status === 0) {
        // 如果用户已存在返回 0
        this.loginIN()
      } else {
        // Toast('用户还未注册,请先注册')
        Toast('Người dùng chưa đăng ký, vui lòng đăng ký trước')
        // this.$router.push('/register')
      }
    },
    gook () {
      // 登录
      if (this.clickFalg !== 0) {
        this.clickFalg = 0
        return
      }
      this.clickFalg++
      if (isNull(this.phone) || !isPhone(this.phone)) {
        Toast('Vui lòng nhập đúng số điện thoại')
      } else if (isNull(this.psd)) {
        Toast('xin vui lòng nhập mật khẩu')
      } else {
        this.checkPhone()
      }
    },
    async loginIN () {
      let opts = {
        phone: this.phone,
        userPwd: this.psd
      }
      this.isloading = true
      let data = await api.login(opts)
      console.log(data)
      this.clickFalg = 0
      if (data.status === 0) {
        this.$store.state.userInfo.phone = this.phone
        this.$store.state.userInfo.token = data.data.cookie
        this.clickFalg = 0
        // this.clearCookie()
        this.setCookie(data.data.key, data.data.token)
        this.$router.push('/home')
      } else {
        Toast(data.msg)
      }
      this.isloading = false
    },
    handleDisabled: function () {
      this.isChecked = !this.isChecked
      if (this.isChecked === true) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    toRegister () {
      // 注册
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="less" scoped>
  body {
    background-color: #16171d;
  }

  .wrapper {
    color: #888;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    border-radius: .1rem;
    background-color: #131313;

  }
  .contain-box{
    width:7rem;
    // padding: 0 .2rem;
    background-color: #28094B;
    margin:0 auto
  }
  .login-bg{
    width: 100%;
    margin-top: -40px;
  }
  .contain-main{
    background-color: #1F1E23;
    width:100%;
    // height:10rem;
    border-top-left-radius: .8rem;
    border-top-right-radius: .8rem;
    margin-top: -0.3rem;
    position: relative;
    .logo-box{
      display: flex;
      justify-content: center;
      padding-top: .8rem;
      margin-bottom: 1rem;
        .logo{
          width: 2rem;
          object-fit: contain;
        }
      }
    }

  // .login-form {
  //   display: block;
  //   width: 6.13rem;
  //   height: 5.58rem;
  //   // background-color: #1B1C25;
  //   background-color: #3B3A3F;
  //   position: relative;
  //   // box-shadow: 0 0 .1rem .1rem #0002;
  //   box-shadow: 0 0 .1rem .1rem #3B3A3F;
  //   border-radius: .2rem;
  //   .login-avatar {
  //     width: 1.2rem;
  //     height: 1.2rem;
  //     background-color: #444656;
  //     border-radius: 50%;
  //     position: absolute;
  //     top: -.6rem;
  //     left: 2.46rem;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     box-shadow: 0 0 .1rem .1rem #0002;
  //     img {
  //       width: .55rem;
  //       height: .58rem;
  //     }
  //   }
    .login-form-item {
      width: 90%;
      height: .8rem;
      border-radius: .1rem;
      margin: .45rem auto 0;

      border: 0.04rem solid #66636A;
      &.input-model {
        background-color: #252429;//#121319;
        padding: 0 .2rem;
        display: flex;
        align-items: center;
        img.login-ico {
          width: .2rem;
          height: .23rem;
        }
        .login-input {
          flex: 1;
          padding: 0 .2rem;
          color:#F5F5F9;
          &::-webkit-input-placeholder {
            color: #AEADB2;
          }
        }
      }
      &.submit-model {
        background-color: #F39C0F;//#024DA1;
        line-height: .8rem;
        text-align: center;
        color: #ffffff;
        border:none;
      }
      &.extra-model {
        margin-top: .24rem;
        display: flex;
        justify-content: space-between;
        font-size: .2rem;
      }
    }
  // }
  // .red-theme{
  //   .login-avatar{
  //     background-color: #222222;
  //   }
  //   .login-form{
  //     background-color: #fff;
  //   }
  //   .login-form-item.input-model{
  //     background-color: #fff;
  //     border: 1px solid #C9C9C9;
  //   }
  //   .login-form-item.submit-model{
  //     background-color: #BB1815;
  //   }
  // }
  .goregister{
    background-color: transparent !important;
    color: #F5F4F9 !important;
    border: 0.04rem solid #66636A !important;
  }
  .tips{
    color: #D9D8DC;
    text-align: center;
    margin-top: 1rem;
  }
</style>
