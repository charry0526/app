<style src="../../../src/assets/styles/common.css"/>
<style lang="less">
@import "../../assets/styles/index.less";
</style>
<style scoped>>
.app-wrapper {
  font-size: 12px;
  background-color: rgb(25 24 30);
}

.user-center {
  background-color: #000000;
}

.user-center>div {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #29282e;
}

.user-info {
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  height: 100px;
  background-color: rgb(26 25 31);
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
  margin-bottom: 5px;
}

.user-title p:last-child {
  font-size: 14px;
}

.nav-menu-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-menu-tab {
  padding-bottom: 8px;
}

.nav-menu-tab div {
  width: 72px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 15px;
  margin-right: 10px;
  background-color: rgb(57 56 62);
}

.nav-menu-tab .select {
  background-color: rgb(251 151 2) !important;
}

.nav-menu-title {
  padding: 8px 0 15px 0;
}

.nav-menu-title>div {
  height: 26px;
  line-height: 26px;
}

.app-child-list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.app-child-list>div {
  width: 25%;
  text-align: center;
  margin-bottom: 8px;
}

.app-child-list>div>div {
  margin-bottom: 8px;
}

.first-template {
  border-bottom: 1px solid rgb(78 76 85);
  border-top: 1px solid rgb(78 76 85);
  background-color: rgb(48 45 56) !important;
}

.first-template>.nav-menu-title {
  color: rgb(143 142 150);
}

.last-template {
  margin-top: 8px;
}


/*********************** 资产报告 ***********************/
.property-template {
  margin: 0 0 15px;
  padding: 0 15px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #1a191f;
}

.property-title {
  display: flex;
  justify-content: flex-start;
  color: #ffffff;
  align-items: center;
  padding: 10px 0 6px 0;
  border-bottom: 1px dashed #58575f;
  margin-bottom: 15px;
}

.property-icon {
  width: 26px !important;
  height: 26px !important;
  margin-right: 5px !important;
}

.property-detail-title {
  padding-bottom: 8px;
}

</style>
<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main user-center">
      <div style="padding: 30px 15px 20px 15px;">
          <div class="user-info">
            <!-- <el-upload
                class="avatar-uploader"
                name="upload_file"
                :action="admin+'/apis/user/upload.do'"
                :show-file-list="false"
                :with-credentials='true'
                :on-success="handleAvatarSuccess"
                :on-error='handleError'
                :before-upload="beforeAvatarUpload"> -->
              <div class="user-avatar">
                <img :src="$store.state.userInfo.avatar ? $store.state.userInfo.avatar : '../../assets/images/users/default.png'" alt="" />
              </div>
            <!-- </el-upload> -->

            <div class="user-title">
              <p><a href="#/user" style="color: #f99420;">{{ $store.state.userInfo.nickName }}</a></p>
              <p>{{ $store.state.userInfo.phone }}</p>
            </div>
          </div>
      </div>

      <div class="nav-menu-box nav-menu-tab">
        <div :class="[navActive === 1 ? 'select' : '']" @click="navActive = 1">公共产品</div>
        <div :class="[navActive === 2 ? 'select' : '']" @click="navActive = 2; getPropertyInfo();">我的资产</div>
      </div>

      <template v-if="navActive === 1">
        <div v-for="(menuInfo, index) in morePageMenu"
          :class="['nav-app-template', (index === 0 ? 'first-template' : ''), (index === (morePageMenu.length - 1) ? 'last-template' : '')]">
          <div class="nav-menu-box nav-menu-title">
            <div v-if="menuInfo.icon">
              <img :src="getIconUrl(menuInfo.icon)" alt="" />
            </div>
            <div>
              {{ menuInfo.title }}
            </div>
          </div>
          <div class="app-child-list">
            <template v-for="childInfo in menuInfo.child">
              <div @click="goPage(childInfo.url ? childInfo.url : '')">
                <div>
                  <img :src="getIconUrl(childInfo.icon)" alt="" />
                </div>
                <div>
                  {{ childInfo.title }}
                </div>
              </div>
            </template>
          </div>
        </div>


      </template>

      <template v-if="navActive === 2">
        <div class="">
          <div class="property-template">
            <div class="property-title">
              <div class="property-icon"><img src="../../assets/images/others/Assetinformation.png" alt="" /></div>
              <div>资产信息</div>
            </div>
            <div class="between-box property-detail-title">
              <div>总资产</div>
              <div>{{ $moneyDot((propertyInfo.userAmt + propertyInfo.enableAmt)) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>可用资产</div>
              <div>{{ $moneyDot(propertyInfo.enableAmt) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>总保证金</div>
              <div>{{ $moneyDot(propertyInfo.margin) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>总冻结资产</div>
              <div>{{ $moneyDot(propertyInfo.freezeAmount) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>总损益</div>
              <div>{{ $moneyDot(propertyInfo.shareholdingProperty) }}</div>
            </div>
          </div>
          <div class="property-template">
            <div class="property-title">
              <div class="property-icon"><img src="../../assets/images/others/securitiesassets.png" alt="" /></div>
              <div>证券资产</div>
            </div>
            <div class="between-box property-detail-title">
              <div>总持股市值</div>
              <div>{{ $moneyDot(propertyInfo.shareholdingAmt) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>总持股数量</div>
              <div>{{ $moneyDot(propertyInfo.shareholdingNumber) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>总持股损益</div>
              <div>{{ $moneyDot(propertyInfo.shareholdingProperty) }}</div>
            </div>
          </div>
          <div class="property-template">
            <div class="property-title">
              <div class="property-icon"><img src="../../assets/images/others/debt.png" alt="" /></div>
              <div>债务</div>
            </div>
            <div class="between-box property-detail-title">
              <div>信用金额度</div>
              <div>{{ $moneyDot(propertyInfo.creditLimit) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>信用金可贷金额</div>
              <div>{{ $moneyDot(propertyInfo.creditAvailableLimit) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>信用金已贷金额</div>
              <div>{{ $moneyDot(propertyInfo.creditBorrowedAmt) }}</div>
            </div>
            <div class="between-box property-detail-title">
              <div>信用金已还金额</div>
              <div>{{ $moneyDot(propertyInfo.creditStillAmt) }}</div>
            </div>
          </div>
        </div>
      </template>

    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import * as api from "@/axios/api";
export default {
  components: { Footer, Header },
  data() {
    return {
      navActive: 1,
      morePageMenu: [
        {
          title: '推荐功能',
          child: [
            {
              title: '充值',
              icon: 'others/CommonFunctions/topup.png',
              url: '/recharge'
            },
            {
              title: '提现',
              icon: 'others/CommonFunctions/withdraw.png',
              url: '/cash'
            },
            {
              title: '信用贷',
              icon: 'others/CommonFunctions/creditloan.png',
              url: '/credist'
            },
            {
              title: '红利股',
              icon: 'others/CommonFunctions/bonustocks.png',
              url: '/esop'
            }
          ]
        },
        {
          title: '现金交易',
          icon: 'others/cashTransaction/cash.png',
          child: [
            {
              title: '充值记录',
              icon: 'others/cashTransaction/Rechargerecord.png',
              url: '/rechargelist'
            },
            {
              title: '提现记录',
              icon: 'others/cashTransaction/withdraw.png',
              url: '/cashlist'
            },
            // {
            //   title: '订单记录',
            //   icon: 'others/cashTransaction/order.png',
            //   url: '/order?'
            // },
            {
              title: '交易记录',
              icon: 'others/cashTransaction/TransactionRecord.png',
              url: '/detail'
            },
            {
              title: '信贷记录',
              icon: 'others/cashTransaction/credit.png',
              url: '/user/creditRecord'
            },
            {
              title: '还款记录',
              icon: 'others/cashTransaction/RepaymentHistory.png',
              url: '/user/repaymentRecord'
            }
          ]
        },
        {
          title: '其他功能',
          icon: 'others/Otherfunctions/app.png',
          child: [
            {
              title: '银行卡管理',
              icon: 'others/Otherfunctions/card.png',
              url: '/card'
            },
            {
              title: '修改密码',
              icon: 'others/Otherfunctions/changePassword.png',
              url: '/changePassword'
            },
            {
              title: '实名认证',
              icon: 'others/Otherfunctions/Verified.png',
              url: '/authentication'
            },
            {
              title: '关于我们',
              icon: 'others/Otherfunctions/about.png',
              url: '/about'
            }
          ]
        },
      ],
      userInfo: {},
      propertyInfo: {
        userAmt: 0,
        enableAmt: 0,
        margin: 0,
        freezeAmount: 0,
        shareholdingProperty: 0,
        shareholdingAmt: 0,
        shareholdingNumber: 0,
        creditLimit: 0,
        creditAvailableLimit: 0,
        creditBorrowedAmt: 0,
        creditStillAmt: 0,
      },
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    goPage(url) {
      if (!url) {
        return;
      }
      this.$router.push(url)
    },
    getIconUrl(icon) {
      return require('../../assets/images/' + icon)
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
    getPropertyInfo() {
      let obj = {
        pKey: sessionStorage.getItem('pKey')
      }
      let res = api.getUserProperty(obj);
      res.then(result => { this.propertyInfo = result.data; });
    }
  },
};
</script>
