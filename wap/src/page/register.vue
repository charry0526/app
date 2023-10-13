<template>
  <div>
    <div class="wrapper">
      <div class="contain-box">
        <img ref="oginBg" class="login-bg" src="../assets/img/bg-one.jpg" alt="" srcset="">
        <div class="contain-main">
          <div class="logo-box">
            <img class="logo" src="../assets/img/LOGO-02.png" alt="">
          </div>
          <div class="register-form-item input-model" style="margin-top:0.11rem">
            <img class="register-ico" v-show="$state.theme != 'red'" src="../assets/ico/loginuser.png" alt="">
            <img class="register-ico" v-show="$state.theme == 'red'" src="../assets/ico/loginuser-red.png" alt="">
            <!-- <input class="register-input" placeholder="请输入手机号码" type="tel" pattern="[0-9]*" v-model="phone"> -->
            <!--         <label class="label-input">0</label>-->
            <input class="register-input input-phone" placeholder="Vui lòng nhập số điện thoại" type="tel"
                   pattern="[0-9]*" v-model="phone">

          </div>
          <!-- 获取验证码 -->
          <div class="register-form-item input-model">
            <img class="register-ico" v-show="$state.theme != 'red'" src="../assets/ico/vertify.png" alt="">
            <img class="register-ico" v-show="$state.theme == 'red'" src="../assets/ico/vertify-red.png" alt="">
            <input class="register-input" style="width:1.4rem" placeholder="Mã xác nhận" type="tel" pattern="[0-9]*"
                   v-model="code">
            <div v-if="codeshow" class="getcode" @click="checkCodeBox">
              Lấy mã xác minh
            </div>
            <div v-if="!codeshow" class="getcode">{{ count }}</div>
          </div>
          <div class="register-form-item input-model">
            <img class="register-ico" v-show="$state.theme != 'red'" src="../assets/ico/loginpwd.png" alt="">
            <img class="register-ico" v-show="$state.theme == 'red'" src="../assets/ico/loginpwd-pwd.png" alt="">
            <input class="register-input" placeholder="Mật khẩu là 6 ~ 12 chữ số, chữ cái hoặc ký hiệu" type="password"
                   pattern="[0-9]*" v-model="psd">

            <!-- <input class="register-input" placeholder="密码为6~12位数字、字母或符号" type="password" pattern="[0-9]*" v-model="psd"> -->
          </div>
          <div class="register-form-item input-model">
            <img class="register-ico" v-show="$state.theme != 'red'" src="../assets/ico/loginpwd.png" alt="">
            <img class="register-ico" v-show="$state.theme == 'red'" src="../assets/ico/loginpwd-pwd.png" alt="">
            <!-- <input class="register-input" placeholder="请再次确认密码" type="password" pattern="[0-9]*" v-model="psd2"> -->
            <input class="register-input" placeholder="Vui lòng xác nhận lại mật khẩu" type="password" pattern="[0-9]*"
                   v-model="psd2">

          </div>
          <div class="register-form-item input-model">
            <img class="register-ico" v-show="$state.theme != 'red'" src="../assets/ico/organization.png" alt="">
            <img class="register-ico" v-show="$state.theme == 'red'" src="../assets/ico/organization-red.png" alt="">
            <!-- <input class="register-input" placeholder="机构代码" type="tel" pattern="[0-9]*" v-model="invitecode"> -->
            <input class="register-input" placeholder="Mã giới thiệu" v-model="invitecode">

          </div>
          <div class="register-form-item agree-model">
            <i @click="isAgree"
               :class="agree?'glyphicon glyphicon glyphicon-ok-sign red':'glyphicon glyphicon-ok-circle'"></i>
            <!-- 我已阅读并同意 -->
            Tôi đã đọc và đồng ý
            <!-- <a @click="toagreeUrl" style="color:#fff">

              《Hợp đồng đăng ký》
            </a> -->
          </div>
          <div class="register-form-item submit-model" @click="gook">
            <!-- 立即注册 -->
            Đăng ký ngay
          </div>
          <div class="register-form-item " style="margin-top: .23rem;display:flex;justify-content:flex-end">
            <div :style="{'font-size':'.2rem', color:$state.theme =='red'?'#000':'#86CBD1'}">
              <!-- 已有账号？ -->
              Quên mật khẩu？
              <span
                :style="{color:$state.theme =='red'?'#BB1815':'#fff'}" @click="goLogin">
            <!-- 返回登录 -->
            Đăng nhập
            </span></div>
          </div>
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
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import {isNull, isPhone, pwdReg} from '@/utils/utils'
// import APIUrl from '@/axios/api.url'
import * as api from '@/axios/api'
// 引入对称加密方法
import { encAes, genRandKey } from '@/utils/aes'
// 引入加密模块
const JSEncrypt = require('encryptlong')

export default {
  data () {
    return {
      phone: '',
      code: '',
      code2: '',
      psd: '',
      psd2: '',
      encPassword: '', // 加密后的秘文
      prKey: '', // 前端加密的密钥
      invitecode: '',
      codeshow: true,
      count: '', // 倒计时
      clickFalg: 0, //  点击次数
      imgCode: '',
      adminUrl: '',
      dialogShow: false, // 显示弹窗
      ischeckImg: false,
      checkCodeState: true,
      dialogImgShow: false, // 图片显示
      logo: '',
      agree: false,
      logindialogShow: false, // 注册协议
      agreeUrl: '', // 注册协议地址
      siteInfo: {},
      imgCodeTime: 0,
      msgId: undefined
    }
  },
  mounted: function () {
    if (this.$route.query.code) {
      this.invitecode = this.$route.query.code
    }
    this.getInfoSite()
    let bodyBox = document.querySelector('.body-box')
    bodyBox.style.height = '100%'
  },
  methods: {
    async getInfoSite () {
      // 获取 logo
      let data = await api.getInfoSite()
      if (data.status === 0) {
        this.logo = data.data.siteLogoSm
        this.agreeUrl = data.data.regAgree
        this.siteInfo = data.data
        if (this.siteInfo.smsDisplay === false) {
          // this.code = '6666'
        }
        this.$store.state.siteInfo = this.siteInfo
        // this.invitecode = this.siteInfo.agentCode
      } else {
        Toast(data.msg)
      }
    },
    checkCodeBox () {
      if (isNull(this.phone)) {
        Toast('Xin vui lòng nhập một số điện thoại hợp lệ')
      } else {
        this.checkPhone()
      }
    },
    async checkCode () {
      let data = await api.checkCode({code: this.code2})
      this.ischeckImg = data
    },
    async checkImg () {
      if (!this.code2) {
        Toast('Mã xác minh bạn đã nhập sai, vui lòng nhập lại')
        this.checkCodeState = false
        return
      }
      // await this.checkCode()
      let data = await api.checkCode({code: this.code2})
      if (data === 'true' || data === true) {
        this.getcode()
        this.dialogShow = false
        this.checkCodeState = true
      } else {
        Toast('Mã xác minh bạn đã nhập sai, vui lòng nhập lại')
        this.checkCodeState = false
        this.adminUrl = process.env.API_HOST + '1'
        this.adminUrl = process.env.API_HOST
        if (this.adminUrl === undefined) {
          this.adminUrl = ''
        }
      }
    },
    async getcode () {
      // if(!this.checkCode()){
      //     // 验证图形码是否正确
      //     Toast('请输入正确图形验证码')
      //     return
      // }
      // 获取验证码
      // if (this.clickFalg !== 0) {
      //   this.clickFalg = 0
      //   return
      // }
      // this.clickFalg++
      //   var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      let reg = /^[0-9]{10}$/ // 手机号码验证
      if (isNull(this.phone)) {
        Toast('Số điện thoại di động không được để trống')
      } else {
        if (!reg.test(this.phone)) {
          console.log(this.phone)
          Toast('Vui lòng nhập đúng số điện thoại')
        } else {
          //   var sign  = this.$md5(this.phone+'W&WzL42v').toUpperCase()
          // let result = await api.getCode({ phoneNum: this.phone })
          const inter = this.msgId ? api.getseMessageCode : api.getMessageCode
          let result = await inter({phone: this.phone, msgId: this.msgId})
          if (result.status === 0) {
            this.msgId = result.data
            const TIME_COUNT = 60
            if (!this.timer) {
              this.count = TIME_COUNT
              this.codeshow = false
              this.clickFalg = 0
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.codeshow = true
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            } else {
              Toast(result.msg)
            }
          } else {
            Toast(result.msg)
          }
        }
      }
    },
    async checkPhone () {
      // 先验证是否已经注册
      // let data = await api.checkPhone({ phoneNum: this.phone })
      // if (data.status === 0) {
      //   // 如果用户已存在返回 0
      //   Toast('Người dùng đã được đăng ký, vui lòng đăng nhập')
      //   this.$router.push('/login')
      // } else {
      // this.dialogShow = false
      // this.adminUrl = process.env.API_HOST
      // if (this.adminUrl === undefined) {
      //   this.adminUrl = ''
      // }
      // this.gook()
      this.getcode()
      // }
    },
    async gook () {
      // 注册
      let reg = /^[0-9]{10}$/
      if (!this.agree) {
        Toast('Cần đồng ý với thỏa thuận đăng ký để đăng ký!')
      } else if (isNull(this.phone) || !reg.test(this.phone)) {
        Toast('Vui lòng nhập đúng số điện thoại')
      } else if (isNull(this.psd)) {
        Toast('xin vui lòng nhập mật khẩu')
      } else if (isNull(this.psd2)) {
        Toast('Vui lòng xác nhận mật khẩu của bạn')
      } else if (isNull(this.code)) {
        Toast('vui lòng nhập mã xác nhận')
      } else if (this.psd !== this.psd2) {
        Toast('Hai mật khẩu đã nhập không khớp')
        this.password = 0
        this.password2 = 0
      } else if (!pwdReg(this.psd)) {
        Toast('Mật khẩu là 6 ~ 12 chữ số, số, chữ cái hoặc ký hiệu')
      } else if (isNull(this.invitecode)) {
        Toast('Vui lòng nhập mã tổ chức')
      } else {
        // 通过接口获取公钥，后端有私钥进行解密
        let PKopts = {
          contents: this.phone
        }
        let pdata = await api.getPKConfig(PKopts)
        if (pdata.status === 0) {
          const pubKey = pdata.data
          // 获取公钥，后用公钥对随机密钥非对称加密
          this.publicKey = pubKey
          // 生成随机密钥，用随机密钥对称加密加密用户名，密码
          const randomKey = genRandKey()
          // 密码加密
          this.encPassword = encAes(this.psd, randomKey)
          // 前端随机密钥通过后端提供的公钥进行加密
          this.prKey = this.creatEncry(this.publicKey, randomKey)
        } else {
          this.$message.error('Thông tin sai, vui lòng gửi lại！')
        }
        // 提交注册请求参数拼接
        let opts = {
          phone: this.phone,
          yzmCode: this.code,
          msgId : this.msgId,
          userPwd: this.encPassword,
          agentCode: this.invitecode,
          pKey: this.prKey
        }
        let data = await api.register(opts)
        if (data.status === 0) {
          Toast('Đăng ký thành công, vui lòng đăng nhập')
          this.$router.push('/login')
        } else {
          Toast(data.msg)
        }
      }
    },
    // 非对称加密方法
    creatEncry (publicKey, param) {
      console.log('publicKey---: ', publicKey)
      const encryptor = new JSEncrypt.JSEncrypt()
      // 设置公钥
      encryptor.setPublicKey(publicKey)
      // 加密随机密钥
      return encryptor.encryptLong(param)
    },
    goLogin: function () {
      this.$router.push('/login')
    },
    refreshImg () {
      this.adminUrl = ''
      this.imgCodeTime = Date.now()
      this.dialogImgShow = false
      let this_ = this
      setTimeout(function () {
        this_.adminUrl = process.env.API_HOST
        if (this_.adminUrl === undefined) {
          this_.adminUrl = ''
        }
        this_.dialogImgShow = true
      }, 500)
    },
    isAgree () {
      let i = false
      let j = true
      this.agree = this.agree ? i : j
    },
    toagreeUrl () {
      this.$router.push('/agree')
    }
  }
}
</script>
<style lang="less" scoped>
body {
  background-color: #fff;
}

::v-deep .body-box {
  height: 100% !important
}

.wrapper {
  color: #888;
  height: 100%;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: .1rem;
}

.register-form {
  width: 6.14rem;
  height: 6.9rem;
  background-color: #3B3A3F; //#1B1C25;
  position: relative;
  // box-shadow: 0 0 .1rem .1rem #0002;
  box-shadow: 0 0 .1rem .1rem #3B3A3F;
  border-radius: .2rem;

  .register-avatar {
    width: 1.2rem;
    height: 1.2rem;
    background-color: #444656;
    border-radius: 50%;
    position: absolute;
    top: -.6rem;
    left: 2.46rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 .1rem .1rem #0002;

    img {
      width: .55rem;
      height: .58rem;
    }
  }
}

.register-form-item {
  width: 5.95rem;
  height: .83rem;
  border-radius: .265rem;
  margin: .2rem auto 0;

  &.input-model {
    background-color: #29282E; //#2A282D;
    padding: 0 .33rem;
    display: flex;
    align-items: center;

    img.register-ico {
      width: .2rem;
      height: .23rem;
    }

    .register-input {
      flex: 1;
      padding: 0 .2rem;
      height: 100%;
      font-size: .24rem;
      color: #F5F5F9;
      &::-webkit-input-placeholder {
        //color: #363636;
        color: #AEADB2;
      }
    }
  }

  &.agree-model {
    height: auto;
    margin-top: .3rem;
    font-size: .18rem;
    color: #86CBD1;
  }

  &.submit-model {
    height: .66rem;
    line-height: .66rem;
    margin-top: .3rem;
    background-color: #F39C0F; //#024DA1;
    border-radius: .33rem;
    color: #FFFFFF;
    font-size: .24rem;
    text-align: center;
  }
}

.glyphicon-ok-sign.red {
  color: #409EFF;
}

.getcode {
  font-size: .24rem;
}

.red-theme {
  .register-avatar {
    background-color: #222;
  }

  .register-form {
    background-color: #fff;
  }

  .register-form-item.input-model {
    background-color: #fff;
    border-color: #C9C9C9;
    border: .01rem solid #c9c9c9;
  }

  .register-form-item.agree-model {
    color: #000;

    a {
      color: #BB1815 !important;
    }
  }

  .register-form-item.submit-model {
    background-color: #BB1815;
  }
}

.label-input {
  margin: 0 0rem 0 0.1rem;
  color: #666;
}


body {
}

.mint-header {
  border: none;
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

.contain-box {
  // padding: 0 .2rem;
  // background-color: #28094B;
}

.login-bg {
  width: 100%;
  height: 4rem;
  object-fit: cover;
  margin-top: -40px;
}

.contain-main {
  background: #252429;
  width: 100%;
  // height:10rem;
  border-top-left-radius: .65rem;
  border-top-right-radius: .65rem;
  position: relative;
  margin: -0.9rem auto 0;

  .logo-box {
    display: flex;
    justify-content: center;
    padding-top: 0.8rem;
    margin-bottom: .68rem;

    .logo {
      width: 3rem;
      // height
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
  width: 6.9rem;
  height: .8rem;
  border-radius: .08rem;
  margin: .45rem auto 0;
  border: 0.04rem solid #5E5D65;

  &.input-model {
    background-color: #29282E; //#121319;
    padding: 0 .2rem;
    display: flex;
    align-items: center;

    img.login-ico {
      width: .28rem;
      height: .32rem;
      object-fit: contain;
    }

    img.showPasImg {
      width: .42rem;
      height: .28rem;
      object-fit: contain;
    }

    .login-input {
      flex: 1;
      padding: 0 .2rem;
      color: #F5F5F9;
      font-size: .1rem;

      &::-webkit-input-placeholder {
        color: #AEADB2;
      }
    }
  }

  &.submit-model {
    background-color: #F39A1A; //#024DA1;
    line-height: .7rem;
    height: 0.7rem;
    text-align: center;
    font-size: .28rem;
    color: #E8E6EA;
    border: none;
    margin-top: .2rem;
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
.goregister {
  background-color: transparent !important;
  color: #F5F4F9 !important;
  border: 0.04rem solid #66636A !important;
}

.tips {
  color: #D9D8DC;
  text-align: center;
  margin-top: 1rem;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 999999999s;
  transition: color 999999999s ease-out, background-color 999999999s ease-out;
  -webkit-transition-delay: 999999999s;
  -webkit-transition: color 999999999s ease-out, background-color 999999999s ease-out;
  -webkit-text-fill-color: #fff;
}
</style>
