<template>
  <div class="header">
    <router-link to="/">
      <div class="logo"><img class="logo" src="../assets/images/login/logo.png" alt=""></div>
    </router-link>
    <div class="header_nav">
      <router-link to="/search" class="header_nav_icon">
        <img src="../assets/images/header/search@x2.png" />
      </router-link>
      <router-link to="#"  class="header_nav_icon">
        <img @click="goLink()" src="../assets/images/header/kefu@x2.png" />
      </router-link>
      <router-link to="/user" class="header_nav_icon">
        <img src="../assets/images/header/user@x2.png" />
      </router-link>
    </div>
    <van-popup v-model="loginBox" position="bottom" :style="{ height: '80%' }" class="loginPopup">
      <div>
        <img src="../assets/images/login/logo.png" />
      </div>
      <div class="login_from">
        <div class="login_from_item">
          <div class="login_from_item_lable accountInput">账户</div>
          <input class="login_input" id="user" name="user" v-model="user" />
        </div>
        <div class="login_from_item">
          <div class="login_from_item_lable password">密码</div>
          <input class="login_input" id="password" name="password" :type="!isShowPW ? 'password' : 'text'"
            v-model="password" />
          <div class="showPassWord" @click="showPassWord">
            <img src="../assets/images/login/show@x2.png" v-if="!isShowPW" />
            <img src="../assets/images/login/hide@x2.png" v-else />
          </div>
        </div>
        <div class="login_submit" @click="login">登录</div>
        <div class="login_submit reg" @click="reg">注册</div>
        <div class="forget_password">
          <span @click="forget">忘记密码？</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Popup } from "vant";
import { Toast } from "vant";
import {clone} from "node-notifier/lib/utils";

Vue.use(Toast);
Vue.use(Popup);
export default {
  name: "Header",
  data() {
    return {
      isLogin: false,
      loginBox: false,
      isShowPW: false,
      user: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (!this.user) {
        Toast("请输入账户！");
        return;
      }
      if (!this.password) {
        Toast("请输入密码！");
        return;
      }
      Toast({
        className: "login_toast",
        icon: require("../assets/images/login/loading.gif"),
        onClose: () => {
          this.$router.push("/userInfo");
        },
      });
    },
    reg() {
      console.log("注册");
    },
    forget() {
      console.log("忘记密码");
    },
    goUserInfoPage() {
      if (!this.isLogin) {
        this.loginBox = true;
        return;
      }
      this.$router.push("/userInfo");
    },
    showPassWord() {
      this.isShowPW = !this.isShowPW;
    },
    goLink () {
      window.location.href = 'https://t.me/CSKH_SCHWAB'
    },
  },
};
</script>


<style lang="less" scoped>
.header {
  display: flex;
  padding: 10px 15px;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 999;
  background: #29282e;

  .logo {
    width: 150px;
    height: 40px;
    // background: #ff7b23;
    border-radius: 2px;
    line-height: 28px;
    text-align: center;
    font-size: 16px;
  }

  .header_nav {
    margin-left: auto;

    img {
      width: 24px;
      height: 24px;
      margin-left: 10px;
    }
  }

  .loginPopup {
    background: #29282e;
    border-radius: 33px;
    box-sizing: border-box;
    padding: 44px 15px 0 15px;

    .logon-img {
      width: 178px;
      height: 54px;
      margin-bottom: 40px;
      background: #f99420;
      margin: 0 auto;
      text-align: center;
      line-height: 54px;
      font-size: 30px;
      border-radius: 4px;
    }

    .login_from {
      margin-top: 40px;

      .login_from_item {
        margin-bottom: 26px;
        height: 38px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 6px;
        border: 2px solid #525158;
        border-radius: 4px;

        .login_from_item_lable {
          font-size: 14px;
          padding-left: 24px;

          &.accountInput {
            background: url("../assets/images/login/account@x2.png") left center no-repeat;
            background-size: 16px 16px;
          }

          &.password {
            background: url("../assets/images/login/password@x2.png") left center no-repeat;
            background-size: 16px 16px;
          }
        }

        .login_input {
          height: 100%;
          margin-left: 10px;
          margin-right: 10px;
          flex: 1;
          border: 0;
          background: none;
          font-size: 14px;
          font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB,
            Microsoft YaHei, Arial, sans-serif;
        }

        .showPassWord {
          img {
            width: 24px;
            height: 24px;
          }
        }
      }

      .login_submit {
        margin-top: 60px;
        height: 36px;
        text-align: center;
        background: #f99420;
        line-height: 36px;
        border-radius: 4px;
        margin-bottom: 8px;

        &.reg {
          margin-top: 0;
          background: none;
          border: 2px solid #525158;
        }
      }

      .forget_password {
        margin-top: 44px;
        text-align: center;
      }
    }
  }
}
</style>
