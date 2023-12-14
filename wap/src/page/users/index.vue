<style scoped>
@import "../../assets/styles/index.less";
</style>
<style src="../../../src/assets/styles/common.css"/>
<style scoped>>
#app .body-box {
  height: 100% !important;
}

.app-wrapper {
  font-size: 12px;
  background-color: rgb(25 24 30);
}

.app-wrapper a{
  color: #FFFFFF;
}

.user-center {
  background-color: #000000;
}

.user-center>div {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #29282e;
  margin-bottom: 8px;
}

.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 20px 0;
}

.user-avatar {
  margin-right: 30px;
}

.user-avatar img {
  border-radius: 50%;
  height: 75px;
  width: 75px;
}

.user-title p:first-child {
  font-size: 18px;
  color: #f99420;
  margin-bottom: 10px;
}

.user-title p:last-child {
  font-size: 14px;
}

.user-info-title {
  padding: 15px 0;
  font-size: 14px;
  border-bottom: solid 1px rgb(82 81 88);
  margin-bottom: 0 !important;
}

.user-auth {
  padding: 30px 0;
  text-align: center;
}

.auth-p {
  line-height: 20px;
}

.user-auth .button {
  background: rgb(251 151 2) !important;
  font-size: 14px;
  margin: 10px auto auto;
  line-height: 32px;
  border-radius: 4px;
  height: 32px;
  width: 171px;
  border: 0;
}

.user-info-box {
  padding-bottom: 15px;
}

.user-info-template {
  padding: 0 !important;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.user-info-template>div {
  background-color: #3f3e43;
}

.icon-title>div,
.info-list>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-title,
.info-list>div {
  padding: 15px 10px;
  border-bottom: solid 1px rgb(82 81 88);
}

.info-list>div>div:last-child {
  margin-left: 8px;
  flex: 1;
  text-align: right;
  color: rgb(251 151 2);
}

.icon-title .image-text>div {
  display: flex;
  font-size: 14px;
  align-items: center;
}

.icon-title .image-text>div:first-child {
  margin-right: 8px;
}

.no-border-bottom {
  border-bottom: none !important;
}
/deep/ .el-upload__input{
  display: none;
}
/deep/ .el-upload{
  display: flex;
}
</style>
<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main user-center">
      <div class="user-info">
        <div class="user-avatar">
          <el-upload
              class="avatar-uploader"
              name="upload_file"
              action="/apis/user/upload.do"
              :show-file-list="false"
              :with-credentials='true'
              :on-success="handleAvatarSuccess">
            <div v-if="$store.state.userInfo.avatar" class="avatar-box">
              <img :src="$store.state.userInfo.avatar" alt="" />
            </div>
            <div v-else class="default-avatar-box">
              <img   src="../../assets/ico/wogerenziliao.png" alt="" />
            </div>
          </el-upload>
        </div>
        <div class="user-title">
          <p>{{ $store.state.userInfo.nickName }}</p>
          <p>{{ $store.state.userInfo.phone }}</p>
        </div>
      </div>

      <div class="user-info-title">实名认证</div>
      <div class="user-auth">
        <p class="auth-p"  v-if="$store.state.userInfo.isActive !== 2">
          暂未实名认证，请认证，下方是实名认证的入口，点击跳转实名页面
        </p>
        <p class="auth-p" v-else>
          已实名认证，点击跳转认证详情页面
        </p>
        <template v-if="$store.state.userInfo.isActive !== 2">
          <div class="button" @click="goPage('/authentication')">实名认证</div>
        </template>
        <template v-else>
          <div class="button" @click="goPage('/authentication')">已认证</div>
        </template>
      </div>

      <div class="user-info-title">帐号信息</div>
      <div class="user-info-box">
        <div class="user-info-template">
          <div class="icon-title between-box" @click="isShowInfoClick(1)">
            <div class="image-text">
              <div><img src="../../assets/images/users/user.png" alt="" /></div>
              <div>个人信息</div>
            </div>
            <div>
              <img src="../../assets/images/users/down.png" alt="" v-if="isShowUserInfo" />
              <img src="../../assets/images/users/more.png" alt="" v-else />
            </div>
          </div>
          <div class="info-list" v-if="isShowUserInfo">
            <div>
              <div>用户昵称</div>
              <div>{{ $store.state.userInfo.nickName }}</div>
            </div>
            <div>
              <div>真实姓名</div>
              <div>{{ $store.state.userInfo.realName }}</div>
            </div>
            <div>
              <div>手机号码</div>
              <div>{{ $store.state.userInfo.phone }}</div>
            </div>
            <div>
              <div>代理名称</div>
              <div>{{ $store.state.userInfo.agentName }}</div>
            </div>
            <div>
              <div>地址信息</div>
              <div style="text-align: left !important; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{ $store.state.userInfo.regAddress }}</div>
            </div>
          </div>
          <div class="icon-title between-box" @click="goPage('/card')">
            <div class="image-text">
              <div><img src="../../assets/images/users/card.png" alt="" /></div>
              <div>银行卡管理</div>
            </div>
            <div><img src="../../assets/images/users/more.png" alt="" /></div>
          </div>
          <div class="icon-title between-box no-border-bottom" @click="goPage('/changePassword')">
            <div class="image-text">
              <div>
                <img src="../../assets/images/users/changePassword.png" alt="" />
              </div>
              <div>修改密码</div>
            </div>
            <div><img src="../../assets/images/users/more.png" alt="" /></div>
          </div>
        </div>
      </div>

      <div class="user-info-title">应用信息</div>
      <div class="user-info-box">
        <div class="user-info-template">
          <div class="icon-title between-box" @click="isShowInfoClick(2)">
            <div class="image-text">
              <div>
                <img src="../../assets/images/users/setting.png" alt="" />
              </div>
              <div>系统信息</div>
            </div>
            <div>
              <img src="../../assets/images/users/down.png" alt="" v-if="isShowSystemInfo" />
              <img src="../../assets/images/users/more.png" alt="" v-else />
            </div>
          </div>

          <div class="info-list" v-if="isShowSystemInfo">
            <div>
              <div>版本信息</div>
              <div>1.3.00</div>
            </div>
            <div>
              <div><router-link to="/about">关于我们</router-link></div>
              <div></div>
            </div>
          </div>

          <div class="icon-title between-box no-border-bottom" @click="toRegister">
            <div class="image-text" >
              <div>
                <img src="../../assets/images/users/loginout.png" alt="" />
              </div>
              <div>退出登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import * as api from "@/axios/api";
import {Toast} from "mint-ui";

export default {
  name: "user-center",
  components: {Footer},
  data() {
    return {
      isShowUserInfo: false,
      isShowSystemInfo: false,
      appInfo: [],
    };
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    // 退出登录
    async toRegister () {
      // 注销登陆
      this.clearCookie()
      let data = await api.logout()
      if (data.status === 0) {
        this.$router.push('/login')
      } else {
        Toast(data.msg)
      }
      this.$router.push('/login')
    },
    goPage(url){
      if(!url)
      {
        return;
      }
      this.$router.push(url)
    },
    isShowInfoClick(id) {
      if (id === 1) {
        this.isShowUserInfo = !this.isShowUserInfo
      } else {
        this.isShowSystemInfo = !this.isShowSystemInfo
      }
    },
    async getUserInfo () {
      let data = await api.getUserInfo()
      if (data.status === 0) {
        this.getProductSetting()
        this.$store.state.userInfo = data.data
      } else {
        Toast(data.msg)
      }
      this.$store.state.user = this.user
    },

    async getProductSetting () {
      let data = await api.getProductSetting()
      if (data.status === 0) {
        this.$store.state.settingForm = data.data
      } else {
        this.$message.error(data.msg)
      }
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.url
      this.editInfo()
    },

    async editInfo () {
      await api.setUserInfo({avatar: this.imageUrl, id: this.$store.state.userInfo.id})
      this.$store.state.userInfo.avatar = this.imageUrl
    }
  },
};
</script>
