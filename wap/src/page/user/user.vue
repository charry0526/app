<template>
  <div class="page wrapper">
    <!-- <div class="header">
      <mt-header title="">
        <router-link to="" slot="left">
          <span v-if="$store.state.userInfo.accountType == 1" class="status">(模拟)</span>
          <span @click="hideNumber" class="status">资产状况
                        <i v-show="$store.state.hide" class="iconfont icon-yanjing1"></i>
                        <i v-show="!$store.state.hide" class="iconfont icon-yanjing"></i>
                    </span>
        </router-link>
        <mt-button @click="tosetting" class="setting" slot="right">
          <i class="iconfont icon-shezhi"></i>
        </mt-button>
      </mt-header>
    </div> -->
    <div class="account-info">

      <div class="account-info_avatar">
        <el-upload
          :action="admin+'/apis/user/upload.do'"
          :before-upload="beforeAvatarUpload"
          :on-error='handleError'
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :with-credentials='true'
          class="avatar-uploader"
          name="upload_file">
          <div v-if="$store.state.userInfo.avatar" class="avatar-box">
            <img :src="$store.state.userInfo.avatar" alt=""/>
          </div>
          <div v-else class="default-avatar-box">
            <img alt="" src="../../assets/ico/wogerenziliao.png"/>
          </div>
        </el-upload>
      </div>

      <div class="account-info_detail">
        <div class="account-name">
          {{ $t('userName') }}：{{
            $store.state.userInfo.nickName || $t('notLoggedL')
          }}
        </div>
        <div class="account-phone">
          {{ $t('userAuth') }}：{{
            $store.state.userInfo.phone || $t('notLoggedL')
          }}
        </div>
      </div>
      <div class="account-info_ctl" @click="hideNumber">
        {{ $t('assetStatus') }}
        <i v-show="$store.state.hide" class="iconfont icon-yanjing"></i>
        <i v-show="!$store.state.hide" class="iconfont icon-yanjing1"></i>
      </div>
    </div>
    <div class="account-container">
      <!-- <div class="account-header">
        <h2 class="title">账户总 资产  <span class="sub-title">( 沪深账户 <i
          v-if="this.$store.state.settingForm.indexDisplay">+ 指数账户</i> <i
          v-if="this.$store.state.settingForm.futuresDisplay"> + 期货账户</i>)</span></h2>
        <div>
          <p v-if="this.$store.state.settingForm.indexDisplay && !this.$store.state.settingForm.futuresDisplay "
            class="account">¥{{$store.state.hide?'****':Number($store.state.userInfo.userAmt +
            $store.state.userInfo.userIndexAmt).toFixed(2)}}</p>
          <p v-else-if="!this.$store.state.settingForm.indexDisplay && this.$store.state.settingForm.futuresDisplay"
            class="account">¥{{$store.state.hide?'****':Number($store.state.userInfo.userAmt +
            $store.state.userInfo.userFuturesAmt).toFixed(2)}}</p>
          <p v-else-if="!this.$store.state.settingForm.indexDisplay && !this.$store.state.settingForm.futuresDisplay"
            class="account">¥{{$store.state.hide?'****':Number($store.state.userInfo.userAmt).toFixed(2)}}</p>
          <p v-else-if="this.$store.state.settingForm.indexDisplay && this.$store.state.settingForm.futuresDisplay"
            class="account">¥{{$store.state.hide?'****':Number($store.state.userInfo.userAmt +
            $store.state.userInfo.userIndexAmt + $store.state.userInfo.userFuturesAmt).toFixed(2)}}</p>
        </div>
        <div class="iconfont">
          <mt-button class="btn-red pull-right" size="small" type="danger" @click="toCash">提现</mt-button>
          <mt-button class="btn-red pull-right" size="small" type="danger" @click="toRecharge">充值</mt-button>
        </div>
        <mt-progress
          :value="$store.state.userInfo.userAmt/($store.state.userInfo.userAmt + $store.state.userInfo.userIndexAmt)*100"
          :bar-height="5"></mt-progress>
      </div> -->
      <div class="account-preview">
        <div class="acc-pre-left">
          <img
            v-show="$state.theme != 'red'"
            alt=""
            src="../../assets/img/vnd.png"
          />
          <img
            v-show="$state.theme == 'red'"
            alt=""
            src="../../assets/img/vnd-red.png"
          />

          <span class="ti">{{ $t('uesrTotle') }}</span>

          <span class="de">
            <div>
              <!-- <p
                 class="account">{{$moneyDot(Number((1000000+603900902.40)/1000000).toFixed(2))}}M</p> -->
              <p
                v-if="
                  this.$store.state.settingForm.indexDisplay &&
                    !this.$store.state.settingForm.futuresDisplay
                "
                class="account"
              >
                {{
                  $store.state.hide
                    ? '****'
                    : $moneyDot(
                    Number(
                      ($store.state.userInfo.userAmt +
                        $store.state.userInfo.userIndexAmt) /
                      1000000
                    ).toFixed(2)
                  ) + 'M'
                }}
              </p>
              <p
                v-else-if="
                  !this.$store.state.settingForm.indexDisplay &&
                    this.$store.state.settingForm.futuresDisplay
                "
                class="account"
              >
                {{
                  $store.state.hide
                    ? '****'
                    : $moneyDot(
                    Number(
                      ($store.state.userInfo.userAmt +
                        $store.state.userInfo.userFuturesAmt) /
                      1000000
                    ).toFixed(2)
                  ) + 'M'
                }}
              </p>
              <p
                v-else-if="
                  !this.$store.state.settingForm.indexDisplay &&
                    !this.$store.state.settingForm.futuresDisplay
                "
                class="account"
              >
                {{
                  $store.state.hide
                    ? '****'
                    : $moneyDot(
                    Number($store.state.userInfo.userAmt / 1000000).toFixed(
                      2
                    )
                  ) + 'M'
                }}
              </p>
              <p
                v-else-if="
                  this.$store.state.settingForm.indexDisplay &&
                    this.$store.state.settingForm.futuresDisplay
                "
                class="account"
              >
                {{
                  $store.state.hide
                    ? '****'
                    : $moneyDot(
                    Number(
                      ($store.state.userInfo.userAmt +
                        $store.state.userInfo.userIndexAmt +
                        $store.state.userInfo.userFuturesAmt) /
                      1000000
                    ).toFixed(2)
                  ) + 'M'
                }}
              </p>
            </div>
          </span>
        </div>
        <div class="acc-pre-center">
          <div>
            {{ $t('userAuth') }}:
            <p style="margin-top:.3rem;font-size: .25rem;">
              <!-- 303 900 902.40 -->
              {{
                $store.state.hide
                  ? '****'
                  : $moneyDot($store.state.userInfo.userAmt, false) + ' đ'
                    ? $moneyDot($store.state.userInfo.userAmt, false) + ' đ'
                    : $moneyDot($store.state.userInfo.userAmt, false) + ' đ'
              }}
            </p>
          </div>
          <!-- <div>指数账户: <span>￥{{$store.state.hide?'****':$store.state.userInfo.userIndexAmt}}</span></div> -->
          <!-- <div>期货账户: <span>￥{{$store.state.hide?'****':Number($store.state.userInfo.userFuturesAmt).toFixed(2)}}</span></div> -->
        </div>
        <div class="acc-pre-right">
          <div class="redbtn btn" @click="toRecharge">{{ $t('recharge') }}</div>
          <div class="bluebtn btn" @click="toCash">{{ $t('withdraw') }}</div>
        </div>
      </div>
      <div v-for="item in account" :key="item.key">
        <div v-if="item.isDisplay" class="account-box">
          <div class="header" @click="item.isShow = item.isShow ? false : true">
            <!-- <i v-if="item.isShow" class="iconfont jian"></i>
            <i v-else class="iconfont jia"></i> -->
            <div class="header-left">
              <img
                v-if="item.isShow && $state.theme == 'red'"
                class="iconfont"
                src="../../assets/ico/jian-red.png"
              />
              <img
                v-else-if="item.isShow && $state.theme != 'red'"
                class="iconfont"
                src="../../assets/ico/jian.png"
              />
              <img
                v-else-if="!item.isShow && $state.theme != 'red'"
                class="iconfont"
                src="../../assets/ico/jia.png"
              />
              <img v-else class="iconfont" src="../../assets/ico/jia-red.png"/>
              <span :style="{ color: $state.theme == 'red' ? '#000' : '#fff' }"
              >
                Tài sản của tôi
                <!-- TÀI SẢN CỦA TÔI {{ $t("userAuth") }} -->
                </span
                >
              <span v-if="item.name == '指数'"
              >({{
                  $store.state.hide
                    ? '****'
                    : $store.state.userInfo.userIndexAmt
                      ? $store.state.userInfo.userIndexAmt + ' đ'
                      : $store.state.userInfo.userIndexAmt
                }})</span
              >
              <span v-if="item.name == '我的'"
              >({{
                  $store.state.hide
                    ? '****'
                    : $store.state.userInfo.userAmt
                      ? $moneyDot($store.state.userInfo.userAmt) + ' đ'
                      : $store.state.userInfo.userAmt
                }})</span
              >
              <span v-if="item.name == '期货'"
              >({{
                  $store.state.hide
                    ? '****'
                    : Number($store.state.userInfo.userFuturesAmt).toFixed(2)
                }})
              </span>
            </div>
            <!-- <a class="pull-right" @click="toTransfer(1)">
              <span :style="{color:$state.theme == 'red'?'#000':'#fff'}">资金互转<i class="iconfont icon-you"></i></span>
            </a> -->
          </div>

          <div v-show="item.isShow" class="content">
            <ul class="content-ul">
              <li>
                <!-- <i class="iconfont icon-zijin1"></i> -->
                <img class="zijin1" src="../../assets/ico/icon1.png"/>
                <div>
                  <div class="name">{{ $t('uesrTotle') }}</div>
                  <p v-if="item.name == '指数'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.userIndexAmt, false) + 'đ'
                    }}

                  </p>
                  <p v-if="item.name == '我的'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.userAmt, false) + 'đ'
                    }}

                  </p>
                  <p v-if="item.name == '期货'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot(
                        Number(
                          $store.state.userInfo.userFuturesAmt
                        ).toFixed(2), false
                      ) + 'đ'
                    }}

                  </p>
                </div>
              </li>
              <li>
                <!-- <i class="iconfont icon-keyongzijin"></i> -->
                <img class="zijin1" src="../../assets/ico/icon2.png"/>
                <div>
                  <div class="name">{{ $t('AvailableFunds') }}</div>
                  <p v-if="item.name == '指数'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.enableIndexAmt, false) + ' đ'
                    }}
                  </p>
                  <p v-if="item.name == '我的'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.enableAmt, false) + ' đ'
                    }}
                  </p>
                  <p v-if="item.name == '期货'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.enableFuturesAmt, false) +
                        ' đ'
                    }}
                  </p>
                </div>
              </li>
              <li>
                <img class="zijin1" src="../../assets/ico/icon3.png"/>
                <div>
                  <div class="name">{{ $t('FreezeMargin') }}</div>
                  <p v-if="item.name == '指数'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.allIndexFreezAmt, false) + ' đ'
                    }}
                  </p>
                  <p v-if="item.name == '我的'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.allFreezAmt, false) + ' đ'
                    }}
                  </p>
                  <p v-if="item.name == '期货'" class="number yellow">
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.allFuturesFreezAmt, false) +
                        ' đ'
                    }}
                  </p></div>
              </li>
              <li>
                <img class="zijin1" src="../../assets/ico/icon4.png"/>
                <div>
                  <div class="name">{{ $t('TotalprofitAndLoss') }}</div>
                  <p
                    v-if="item.name == '指数'"
                    :class="
                    $store.state.userInfo.allIndexProfitAndLose < 0
                      ? 'number red'
                      : $store.state.userInfo.allIndexProfitAndLose > 0
                      ? 'number green'
                      : 'number'
                  "
                  >
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.allIndexProfitAndLose, false) +
                        ' đ'
                    }}
                  </p>
                  <p
                    v-if="item.name == '我的'"
                    :class="
                    $store.state.userInfo.allProfitAndLose < 0
                      ? 'number red'
                      : $store.state.userInfo.allProfitAndLose > 0
                      ? 'number green'
                      : 'number'
                  "
                  >
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot($store.state.userInfo.allProfitAndLose, false) + ' đ'
                    }}
                  </p>
                  <p
                    v-if="item.name == '期货'"
                    :class="
                    $store.state.userInfo.allFuturesProfitAndLose < 0
                      ? 'number red'
                      : $store.state.userInfo.allFuturesProfitAndLose > 0
                      ? 'number green'
                      : 'number'
                  "
                  >
                    {{
                      $store.state.hide
                        ? '****'
                        : $moneyDot(
                        Number(
                          $store.state.userInfo.allFuturesProfitAndLose
                        ).toFixed(2), false
                      ) + ' đ'
                    }}
                  </p></div>
              </li>
              <!-- <li>
                <i class="iconfont icon-dongjiezijin"></i>
                <div class="name">新股冻结保证金</div>
                <p>{{shengoudj.djzj}}</p>
              </li> -->
            </ul>
          </div>
        </div>
        <!-- <div v-show="item.isShow"
             class="pcx"
             style="padding: 0.12rem 0.4rem 0.15rem;">

          <div style="background:#1A1E29;line-height: .4rem;">

            Giá trị thị trường CK
            <span v-if="item.name == '指数'"
                  style="font-weight:bold;font-size:0.26rem;">{{$store.state.hide?'****':$moneyDot(Number(($store.state.userInfo.enableIndexAmt + $store.state.userInfo.allIndexFreezAmt) * indexSettingInfo.forceSellPercent).toFixed(2))}} </span>
            <span v-if="item.name == '我的'"
                  style="font-weight:bold;font-size:0.26rem;">{{$store.state.hide?'****':$moneyDot(Number(($store.state.userInfo.enableAmt + $store.state.userInfo.allFreezAmt) * settingInfo.forceStopPercent).toFixed(2))}} </span>
            <span v-if="item.name == '期货'"
                  style="font-weight:bold;font-size:0.26rem;">{{$store.state.hide?'****':$moneyDot(Number(($store.state.userInfo.enableFuturesAmt + $store.state.userInfo.allFuturesFreezAmt) * futuresSettingInfo.forceSellPercent).toFixed(2))}} </span>

          </div>
        </div> -->
      </div>
    </div>
    <!-- <div class="panel">
      <div class="panel-head">
        <span class="font-w">分仓配资</span>
      </div>
      <div class="panel-body">
        <div class="row">
          <div @click="goFunds(3)" class="col-xs-3">
            <i class="iconfont icon-rongzi2"></i>
            新股申购
          </div>
          <div @click="goFunds(1)" class="col-xs-3">
            <i class="iconfont icon-rongzi2"></i>
            配资主页
          </div>
          <div @click="goFunds(2)" class="col-xs-3">
            <i class="iconfont icon-rongzi2"></i>
            按天配资
          </div>
          <div @click="goFundsList(1)" class="col-xs-3">
            <i class="iconfont icon-rongzi2"></i>
            我的配资
          </div>
          <div @click="goFundsList(2)" class="col-xs-3">
            <i class="iconfont icon-rongzi2"></i>
            配资持仓
          </div>
          <div @click="goFundsList(3)" class="col-xs-3">
            <i class="iconfont icon-rongzi2"></i>
            配资平仓
          </div>
        </div>
      </div>
    </div> -->
    <div class="panel">
      <div class="panel-head">
        <span class="font-w">{{ $t('myPosition') }}</span>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-xs-4" @click="goOrderList(1)">
            <div class="img-box"><img alt="" class="row-icon" src="../../assets/ico/icon5.png"/></div>
            {{ $t('myPosition') }}
          </div>
          <div class="col-xs-4 tai-row" @click="goOrderList(1)">
            <!-- <i class="iconfont icon-rongzilishi"></i> -->
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon6.png"/>
            </div>

            {{ $t('myClosingPosition') }}
          </div>

          <div
            v-if="this.$store.state.settingForm.indexDisplay"
            class="col-xs-4"
            @click="goEsop()"
          >
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon7.png"/>
            </div>
            ESOP
          </div>
          <!-- 信用金 -->
          <div
            v-if="this.$store.state.settingForm.indexDisplay"
            class="col-xs-4"
            @click="goCredit()"
          >
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon5.png"/>
            </div>
            信用金
          </div>
          <!-- <div v-if="this.$store.state.settingForm.indexDisplay" @click="goOrderList(2)" class="col-xs-3">
            <i class="iconfont icon-geguyingkui"></i>
            指数平仓
          </div>
          <div v-if="this.$store.state.settingForm.futuresDisplay" @click="goOrderList(4)" class="col-xs-3">
            <i class="iconfont icon-jiaoyitixing"></i>
            期货持仓
          </div>
          <div v-if="this.$store.state.settingForm.futuresDisplay" @click="goOrderList(4)" class="col-xs-3">
            <i class="iconfont icon-qihuo1"></i>
            期货平仓
          </div> -->
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <ul class="row">
          <li class="col-xs-4" @click="toAuthentication">
            <div class="img-box"><img alt="" class="row-icon" src="../../assets/ico/icon9.png"/></div>
            <span>{{ $t('Verified') }}</span>
          </li>
          <li class="col-xs-4 tai-row" @click="goCard">
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon8.png"/>
            </div>
            {{ $t('bank') }}
          </li>
          <li class="col-xs-4 tai-row" @click="goEsop">
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon2.png"/>
            </div>
            {{ $t('RegisterbuyESOP') }}
          </li>
          <li class="col-xs-4 tai-row" @click="gochangepass">
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon4.png"/>
            </div>
            {{ $t('changePassword') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <ul class="row">
          <li class="col-xs-4" @click="goDetail">
            <div class="img-box"><img alt="" class="row-icon" src="../../assets/ico/icon1.png"/></div>
            <!-- <span>{{ $t("Verified") }}</span> -->
            <span>Lịch sử giao dịch</span>
          </li>
          <li class="col-xs-4 tai-row" @click="toRechargeList">
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon2.png"/>
            </div>
            <!-- {{ $t("bank") }} -->

            <span>Lịch sử nạp tiền</span>
          </li>
          <li class="col-xs-4 tai-row" @click="toCashList">
            <div class="img-box">
              <img alt="" class="row-icon" src="../../assets/ico/icon3.png"/>
            </div>
            <!-- {{ $t("RegisterbuyESOP") }} -->
            <span>Lịch sử rút tiền</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="other">
      <!-- <ul class="after">
        <li @click="toAuthentication">
          <span>
            <img
              src="../../assets/ico/shimin.png"
              style="width:.28rem;height:.24rem;margin-right: 0.15rem;"
            />
            {{ $t("Verified") }}
            <span
              class="renzhen done"
              v-if="$store.state.userInfo.isActive == 2"
            >
              <i class="iconfont el-icon-circle-check"></i>
              {{ $t("examinationPassed") }}
            </span>
            <span
              class="renzhen ing"
              v-if="
                $store.state.userInfo.isActive == 0 ||
                  $store.state.userInfo.isActive == 3
              "
              style="color:red;font-size: 0.7rem;"
            >
              <i class="iconfont el-icon-circle-close"></i>
              {{ $t("NotReviewed") }}
            </span>
            <icon name="right66" class="right" slot="icon"></icon>
          </span>
        </li>
        <li @click="goCard">
          <span>
            <img
              src="../../assets/ico/yinhangka.png"
              style="width:.28rem;height:.24rem;margin-right: 0.15rem;"
            />
            {{ $t("bank") }}
            <icon name="right66" class="right" slot="icon"></icon>
          </span>
        </li>
        <li @click="goEsop">
          <span>
            <img
              src="../../assets/ico/yinhangka.png"
              style="width:.28rem;height:.24rem;margin-right: 0.15rem;"
            />
            {{ $t("RegisterbuyESOP") }}
            <icon name="right66" class="right" slot="icon"></icon>
          </span>
        </li>
        <li @click="gochangepass">
          <span>
            <img
              src="../../assets/ico/gaimima.png"
              style="width:.24rem;height:.24rem;margin-right: 0.15rem;"
            />
            {{ $t("changePassword") }}
            <icon name="right66" class="right" slot="icon"></icon>
          </span>
        </li>
      </ul> -->
      <!-- <ul class="after">
        <li @click="goDetail">
          <span>
            <img
              src="../../assets/img/103.png"
              style="width:.27rem;height:.24rem;margin-right: 0.15rem;"
            />
            {{ $t("FundingDetails") }}
            <icon name="right66" class="right" slot="icon"></icon>
          </span>
        </li>
        <li @click="toRechargeList">
          <span>
            <img
              src="../../assets/img/101.png"
              style="width:.27rem;height:.27rem;margin-right: 0.15rem;"
            />
            {{ $t("RechargeRecord") }}
            <icon name="right66" class="right" slot="icon"></icon>
          </span>
        </li>
        <li @click="toCashList">
          <span>
            <img
              src="../../assets/img/102.png"
              style="width:.24rem;height:.24rem;margin-right: 0.15rem;"
            />
            {{ $t("WithdrawalsRecord") }}
            <icon name="right66" class="right" slot="icon"></icon>
          </span>
        </li>
      </ul> -->

      <mt-popup
        v-model="focePromptPopup"
        class="mint-popup-white"
        popup-transition="popup-fade"
      >
        <div class="clearfix">
          <a class="pull-right" @click="focePromptPopup = false"
          ><i class="iconfont icon-weitongguo"></i
          ></a>
        </div>
        <p class="font-title">{{ $t('popupTip1') }}？</p>
        <!--  账户可用资金 +  -->
        <p v-if="$store.state.settingForm.stockDisplay" class="font-bold">
          {{ $t('popupTip2') }}
          {{ settingInfo.forceStopPercent ? settingInfo.forceStopPercent : 0 }}
        </p>
        <p v-if="$store.state.settingForm.indexDisplay" class="font-bold">
          {{ $t('popupTip3') }}
          {{
            indexSettingInfo.forceSellPercent
              ? indexSettingInfo.forceSellPercent
              : 0
          }}
        </p>
        <p v-if="$store.state.settingForm.futuresDisplay" class="font-bold">
          {{ $t('popupTip4') }}
          {{
            futuresSettingInfo.forceSellPercent
              ? futuresSettingInfo.forceSellPercent
              : 0
          }}
        </p>
        <p v-if="$store.state.settingForm.stockDisplay">
          {{
            $t('popupTip5')
          }}<span class="green number"
        >-{{
            Number(
              ($store.state.userInfo.enableAmt +
                $store.state.userInfo.allFreezAmt) *
              settingInfo.forceStopPercent
            ).toFixed(2)
          }}</span
        >{{ $t('popupTip6') }}
        </p>
        <p v-if="$store.state.settingForm.indexDisplay">
          {{
            $t('popupTip7')
          }}<span class="green number"
        >-{{
            Number(
              ($store.state.userInfo.allIndexFreezAmt +
                $store.state.userInfo.enableIndexAmt) *
              indexSettingInfo.forceSellPercent
            ).toFixed(2)
          }}</span
        >{{ $t('popupTip6') }}
        </p>
        <p v-if="$store.state.settingForm.futuresDisplay">
          {{
            $t('popupTip9')
          }}<span class="green number"
        >-{{
            Number(
              ($store.state.userInfo.allFuturesFreezAmt +
                $store.state.userInfo.enableFuturesAmt) *
              futuresSettingInfo.forceSellPercent
            ).toFixed(2)
          }}</span
        >{{ $t('popupTip6') }}
        </p>
      </mt-popup>
      <div class="btnbox" style="margin-bottom:70px">
        <span class="text-center btnok loginout" @click="toRegister">
          Đăng xuất</span
        >
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script type="text/ecmascript-6">
import {Toast} from 'mint-ui'
// import '@/assets/style/bg.less'
import foot from '../../components/foot/foot'
// import { hideNumberTo } from '@/utils/utils'
import * as api from '@/axios/api'

export default {
  components: {
    foot
  },
  data () {
    return {
      user: {
        img: ''
      },
      defaultUser: {
        img: require('../../assets/img/default-head.png')
      },
      changeHideStatus: false,
      userAmt: '',
      settingInfo: {}, // 设置信息
      indexSettingInfo: {}, // 设置信息 指数
      futuresSettingInfo: {}, // 设置信息 期货
      focePromptPopup: false, // 强制平仓提示框
      buttonBottom: 0,
      account: [
        {name: '我的', link: 'stock', isShow: true, isDisplay: false}
        // { name: '指数', link: 'index', isShow: false, isDisplay: false },
        // { name: '期货', link: 'futures', isShow: false, isDisplay: false }
      ],
      showChangeBtn: false, // 是否显示资金互转按钮
      styleName: 'black',
      shengoudj: '',
      admin: '',
      imageUrl: ''
    }
  },
  watch: {
    //   changeHideStatus(newval){
    //     //   this.userAmt = hideNumberTo(this.$store.state.userInfo.userAmt)
    //   }
  },
  computed: {},
  created () {
    this.getUserInfo()
    this.styleName = window.localStorage.getItem('styleName') ? window.localStorage.getItem('styleName') : 'red'
  },
  mounted () {
    this.getSettingInfo()
    this.getIndexSettingInfo()
    this.getFuturesSetting()
    this.getCardDetail()
    this.getprice()
    this.changeHideStatus = this.$store.state.hide
    if (this.$store.state.settingForm.indexDisplay || this.$store.state.settingForm.futuresDisplay) {
      this.showChangeBtn = true
    }
    this.admin = process.env.API_HOST
    if (this.admin === undefined) {
      this.admin = ''
    }
  },
  methods: {
    async getprice () {
      let opt = {}
      let data = await api.getprice(opt)
      this.shengoudj = data.data
      console.log(this.shengoudj, '申购')
    },
    goFunds (type) {
      if (type == 1) {
        this.$router.push('/funds')
      }
      if (type == 2) {
        this.$router.push('/days')
      }
      if (type == 3) {
        this.$router.push('/xingu')
      }
    },
    changeStyle () {
      if (this.styleName === 'red') {
        this.styleName = 'black'
        this.$store.state.className = 'black'
        window.localStorage.setItem('styleName', 'black')
      } else {
        this.styleName = 'red'
        this.$store.state.className = 'red'
        window.localStorage.setItem('styleName', 'red')
      }
      window.location.reload()
    },
    async getProductSetting () {
      let data = await api.getProductSetting()
      if (data.status === 0) {
        this.$store.state.settingForm = data.data
        // if(this.$store.state.userInfo.accountType != 1){
        this.account[0].isDisplay = data.data.stockDisplay
        // this.account[1].isDisplay = data.data.indexDisplay
        // this.account[2].isDisplay = data.data.futuresDisplay
        // }else{
        //     this.account[0].isDisplay = true
        //     this.account[1].isDisplay = true
        //     this.account[2].isDisplay = true
        // }
      } else {
        this.$message.error(data.msg)
      }
    },
    hideNumber () {
      this.changeHideStatus = this.$store.state.hide
      let i = false
      let j = true
      this.$store.state.hide = this.$store.state.hide ? i : j
    },

    goOrderList: function (val) {
      //   this.$router.push('/orderlist')
      this.$router.push('/orderlist?index=' + val)
    },
    goFundsList: function (val) {
      this.$router.push('/fundslist?index=' + val)
    },
    //
    goDetail: function () {
      this.$router.push('/detail')
    },
    goCard: function () {
      this.$router.push('/card')
    },
    goEsop () {
      this.$router.push('/esop')
    },
    //信用金
    goCredit () {
      this.$router.push('/credist')
    },
    //
    toAggre: function () {
      this.$router.push('/aggre')
    },

    //
    toAuthentication: function () {
      this.$router.push('/authentication')
    },
    toRecharge () {
      // 充值
      this.$router.push('/recharge')
    },
    toCash () {
      // 提现
      this.$router.push('/cash')
    },
    //

    async toRegister () {
      // 注销登陆
      this.clearCookie()
      let data = await api.logout()
      if (data.status === 0) {
        // Toast(data.msg)
        this.$router.push('/login')
      } else {
        Toast(data.msg)
      }
    },
    tosetting () {
      this.$router.push('/setting')
    },
    toCashList () {
      this.$router.push('/Cashlist')
    },
    toRechargeList () {
      this.$router.push('/rechargelist')
    },
    toTransfer (val) {
      this.$router.push({
        path: '/transfer',
        query: {
          type: val
        }
      })
    },
    gochangepass () {
      this.$router.push('/changePassword')
    },
    async getCardDetail () {
      // 获取银行卡信息
      let data = await api.getBankCard()
      if (data.status === 0) {
        this.$store.state.bankInfo = data.data
      } else {
        // Toast(data.msg)
      }
    },
    async getSettingInfo () {
      let data = await api.getSetting()
      if (data.status === 0) {
        // 成功
        this.settingInfo = data.data
      } else {
        Toast(data.msg)
      }
    },
    async getIndexSettingInfo () {
      // 网站设置信息 指数
      let data = await api.getIndexSetting()
      if (data.status === 0) {
        // 成功
        this.indexSettingInfo = data.data
      } else {
        Toast(data.msg)
      }
    },
    async getFuturesSetting () {
      // 网站设置信息 期货
      let data = await api.getFuturesSetting()
      if (data.status === 0) {
        // 成功
        this.futuresSettingInfo = data.data
      } else {
        Toast(data.msg)
      }
    },
    async getUserInfo () {
      // 获取用户信息
      //   let showcookie = this.getCookie('USER_TOKEN');
      let data = await api.getUserInfo()
      if (data.status === 0) {
        this.getProductSetting()
        this.$store.state.userInfo = data.data
      } else {
        Toast(data.msg)
      }
      this.$store.state.user = this.user
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.url
      this.editInfo()
    },
    handleError () {

    },
    beforeAvatarUpload (file) {
      console.log(file)
    },
    async editInfo () {
      let data = await api.setUserInfo({avatar: this.imageUrl, id: this.$store.state.userInfo.id})
      this.$store.state.userInfo.avatar = this.imageUrl
    }
  }
}
</script>

<style lang="less" scoped>
// @bgColor: #fff;
@bgColor: #2a282d;
@fontColor: #fff;
@borderColor: #676b6f;
body {
  background: #000;
}

.page .head {
  width: 100%;
  // height: 0;
  // padding-top: 44%;
  height: 2.8rem;
  background-image: url("../../assets/img/header.png");
  background-size: 100% 100%;
}

.wrapper {
  background-color: @bgColor;
}

.after {
  .iconfont {
    vertical-align: middle;
    margin-right: 0.15rem;
  }
}

.setting {
  margin-right: 0.2rem;
}

.status {
  font-size: 0.24rem;
  // margin-left: 0.2rem;
  .iconfont {
    margin-left: 0.2rem;
    font-size: 0.24rem;
  }
}

.user {
  .user-top {
    padding: 0 0.4rem;
    // width: 96%;
    // height: 1.96rem;
    margin: 0 auto;
    background: #2e3237;
    // border-radius: 0.11rem;
    box-shadow: 0.014rem 0.014rem 0.014rem rgba(103, 107, 111, 0.38);
    // margin-top: -0.945rem;
    position: relative;
    margin-bottom: 0.16rem;
    padding-bottom: 0.2rem;
    margin-top: 0.1rem;

    .user-header {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 100%;
      background: #000;
      position: absolute;
      left: 50%;
      top: -0.68rem;
      margin-left: -0.68rem;

      .green {
        color: green;
      }
    }

    .user-img {
      width: 1.3rem;
      height: 1.3rem;
      background-color: @bgColor;
      border-radius: 100%;
      margin: 0 auto;
      margin-top: 0.014rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-box {
      // padding-top: 1.08rem;
      font-size: 0.33rem;
      color: @fontColor;
      font-weight: 700;
      height: 0.68rem;
      line-height: 0.695rem;

      .btn-red {
        // width: 1.418rem;
        width: 2.418rem;
        height: 0.68rem;
        font-size: 0.29rem;
        line-height: 0.68rem;
        padding: 0;
        border-radius: 0.028rem;
        background: #b60c0d;
      }
    }
  }
}

.other {
  margin: 0.12rem 0.28rem;

  ul {
    position: relative;
    background-color: #1f2636;
    border-radius: 4px;
    overflow: hidden;
    padding: 0 0.2rem;

    li {
      position: relative;
      height: 0.92rem;
      line-height: 0.92rem;
      // padding: 0 0.4rem;
      font-size: 0.26rem;
      background-color: #1f2636;
      position: relative;
      border-bottom: 1px solid #3f444a;
    }

    li:last-child {
      border-bottom: none;
    }
  }

  .after {
    margin-bottom: 0.125rem;
  }
}

.renzhen {
  position: relative;
  padding: 0 0.1rem;
  font-size: 0.18rem;
  height: 0.35rem;
  line-height: 0.35rem;
  display: inline-block;
  vertical-align: middle;
  padding-left: 0.3rem;

  .iconfont {
    font-size: 0.18rem;
    vertical-align: middle;
    position: absolute;
    left: 0.05rem;
    top: 0.05rem;
  }

  &.ing {
    background-color: #e6003e;
  }

  &.done {
    background-color: #04823e;
  }
}

.other ul li svg {
  width: 16px;
  height: 15px;
  line-height: 25px;
  margin-top: 0.28rem;
  color: #ccc;
}

.other ul li svg:first {
  float: left;
  margin-right: 0.39rem;
}

.my-Assets {
  .img-box {
    width: 1.3rem;
    height: 1.3rem;
  }

  .assets-box {
    line-height: 0.5rem;
    margin-top: 0.2rem;

    .iconfont {
      margin-right: 0.2rem;
    }
  }

  font-size: 0.25rem;
  padding: 0.2rem 0 0.3rem;
}

.user-header {
  padding: 0rem 0.3rem 0;
  background: #2e3237;
  margin-bottom: 0.15rem;

  .box:nth-child(1) {
    margin-right: 6%;
  }

  .box {
    padding: 0.26rem 0.25rem 0.3rem;
    padding: 0.26rem 0.25rem 0.2rem;
    background-color: #c6c8d4;
    width: 47%;
    float: left;
    color: #2f2f2f;
    border-radius: 0.2rem 0.2rem 0.1rem 0.1rem;

    .name {
      font-size: 0.26rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
    }

    .account {
      font-size: 0.3rem;
      font-weight: bold;
    }

    .name2 {
      font-size: 0.23rem;
      margin-top: 0.2rem;

      span {
        padding-left: 0.1rem;
      }
    }
  }
}

.loginout {
  color: #999;
  font-size: 0.3rem;
  background: none;
}

.btnbox .btnok {
  background: none;
  font-size: 0.28rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #606060;
}

.btnbox {
  width: 100%;
  padding: 0 0.3rem;
}

.mint-popup-1 {
  color: #333;
  width: 200px;
  border-radius: 8px;
  padding: 10px;
  transform: translate(-50%, 0);

  h1 {
    font-size: 20px;
    color: #26a2ff;
  }

  p {
    margin-bottom: 10px;
  }

  top: 3.2rem;
}

.mint-popup-1::before {
  triangle: 10px top #fff;
  content: "";
  position: absolute;
  top: -20px;
  right: 50px;
}

.mint-popup-white {
  padding: 0.3rem 0.28rem;

  .font-title {
    font-size: 0.26rem;
    margin-bottom: 0.12rem;
  }

  .font-bold {
    font-weight: bold;
  }

  .number {
    margin: 0 0.1rem;
    font-weight: bold;
    font-size: 0.26rem;
  }

  p {
    line-height: 0.4rem;
  }
}

// 总资产
.account-header {
  padding: 0.2rem 0.2rem 0;
  position: relative;
  background-color: #1f2636;

  .iconfont {
    position: absolute;
    right: 0.2rem;
    // top: 50%;
    top: 1.1rem;
    font-size: 0.8rem;
    color: #ff5722;
    margin-top: -0.4rem;

    .btn-red {
      margin-left: 0.2rem;
      padding: 0.08rem 0.2rem;
      background: #ff5722;
    }
  }

  .title {
    font-size: 0.28rem;
    margin-bottom: 0.26rem;
  }

  .sub-title {
    color: #7e8c8d;
    font-size: 0.2rem;

    i {
      font-style: normal;
    }
  }

  .account {
    color: #b60c0d;
    font-size: 0.4rem;
    font-weight: 600;
    font-family: lightnumber;
  }
}

.account-box {
  // margin-bottom: 0.12rem;
  padding: 0 0.2rem;
  // padding: 0 0.35rem;
  background-color: #302f35; // #1f2636;
  .header {
    font-size: 0.22rem;
    line-height: 0.7rem;
    height: 0.7rem;
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;
    }

    img.iconfont {
      color: #f5ca07;
      width: 0.3rem;
      height: 0.3rem;
      display: inline-block;
      margin-right: 0.2rem;

      &.jian {
        background-image: url(../../assets/ico/jian.png);
      }
    }

    .iconfont {
      font-size: 0.24rem;
      vertical-align: middle;
      margin: 0 0.05rem;
    }
  }

  .content {
    padding: 0 0.2rem 0.18rem;

    li {
      width: 50%;
      float: left;
      padding: 0.2rem 0.2rem 0.04rem 0.56rem;
      line-height: 0.36rem;
      position: relative;

      &:nth-child(2) {
        .iconfont {
          color: #2f97fc;
        }
      }

      &:nth-child(3) {
        .iconfont {
          color: #17b780;
        }
      }

      &:nth-child(3) {
        .iconfont {
          color: #ff7602;
        }
      }

      .iconfont {
        position: absolute;
        top: 0.38rem;
        left: 0;
        font-size: 0.42rem;
        color: #fd4256;
      }

      .name {
        color: #888;
        font-size: 0.22rem;
      }

      .number {
        font-size: 0.27rem;
        font-family: lightnumber;
      }
    }
  }
}

.mt-progress {
  height: 5px;
  line-height: 5px;
  margin-top: 0.3rem;
  border-radius: 0.2rem;
  // padding: 0 0.2rem;
  /deep/ .mt-progress-runway {
    border-radius: 0.2rem;
    background-color: #ff7602;
  }

  /deep/ .mt-progress-progress {
    border-radius: 0.2rem;
    background-color: #bb3d4c;
  }
}

.panel {
  margin: 0.2rem 0.28rem;
  padding: 0 0.2rem;
  background-color: #302f35; //#1f2636;
  border: 0.05rem solid #38363B;

  .panel-head {
    height: 0.88rem;
    line-height: 0.88rem;
    padding-top: 0.1rem;
    text-align: center;
    font-weight: bold;
    border: none;

    .font-w {
      font-size: 0.28rem;
      // font-weight: 600;
      // color: #000;
    }
  }

  .panel-body {
    padding: 0.3rem 0rem;
    text-align: center;

    .row {
      width: 100%;
      margin: 0 auto;
      /* justify-content: space-between; */
      gap: 0.2rem;
      row-gap: 0;
      flex-wrap: nowrap;
      align-items: start;
    }

    .tai-row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }

    .img-box {
      background-color: #505050;
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.1rem;
      margin-bottom: 0.2rem;
    }

    .row-icon {
      width: 0.4rem;
      height: 0.4rem;
      object-fit: contain;
    }

    .iconfont {
      display: block;
      font-size: 20px;
      color: #138db2;
    }

    .font {
      font-size: 0.3rem;
      color: #000;
      font-weight: 600;
      line-height: 0.5rem;
    }

    .col-xs-4 {
      // width: auto;
      padding: 0;
    }
  }
}

.account-info {
  padding: 0.28rem;
  display: flex;
  justify-content: space-between;

  &_avatar {
    width: 1.13rem;
    height: 1.13rem;
    line-height: 1.13rem;
    border-radius: 50%;
    // background-color: #444656;
    display: flex;
    align-items: center;
    justify-content: center;

    .avatar-box {
      width: 1.13rem;
      height: 1.13rem;
      line-height: 1.13rem;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .default-avatar-box {
      width: 1.13rem;
      height: 1.13rem;
      line-height: 1.13rem;
      border-radius: 50%;
      background-color: #444656;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 0.55rem;
        height: 0.58rem;
      }
    }

  }

  &_detail {
    padding-left: 0.22rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;

    .account-phone {
      font-size: 0.3rem;
      // color: #fff;
      color: #ec9e2f;
    }

    .account-name {
      color: #636a93;
    }
  }

  &_ctl {
    margin-top: 0.1rem;
  }
}

.account-container {
  // margin: .28rem;
  width: 6.9rem;
  margin: 0.28rem auto;
  border-radius: 5px;
  overflow: hidden;
  background-color: #302f35; //#1f2636;
  border: 0.05rem solid #38363B;

  .pcx {
    margin: 0.2rem;
    // background-color: #1F2636;
    background: #1a1e29;
  }

  .account-preview {
    display: flex;
    padding: 0.3rem 0.2rem 0.28rem;

    .acc-pre-left {
      width: 1.92rem;
      height: 1.92rem;
      background-image: url("../../assets/ico/round.png");
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      align-items: center;
      position: relative;

      img {
        width: 0.36rem;
        height: 0.36rem;
        margin-bottom: 0.1rem;
      }

      span.ti {
        font-size: 0.24rem;
        color: #ccc;
        margin-bottom: 0.1rem;
      }

      span.de {
        font-size: 0.24rem;
        color: #009c46;
        font-family: lightnumber;

        .account {
          font-family: lightnumber;
        }
      }

      &::after {
        display: block;
        content: "";
        width: 0.67rem;
        height: 2.21rem;
        position: absolute;
        top: -0.16rem;
        right: -0.44rem;
        background-image: url("../../assets/ico/round-r.png");
        background-size: cover;
      }
    }

    .acc-pre-center {
      margin-left: 0.45rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-family: lightnumber;
      color: #ccc;

      p {
        color: #fff;
        font-family: lightnumber;
        font-weight: 300;
        text-align: center;
      }
    }

    .acc-pre-right {
      flex: 1;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .btn {
        width: 1.3rem;
        color: #fff;
        padding: 0.06rem 0.15rem;
        border-radius: 0.6rem;
        font-size: 0.25rem;
      }

      .redbtn {
        background-color: #f5991d; //#e6003e;
      }

      .bluebtn {
        background-color: #505050; //#024da1;
      }
    }
  }
}

.red-theme {
  .wrapper {
    background-color: #e9e9e9;
  }

  .account-info_avatar {
    background-color: #b5b5b5;
  }

  .account-phone {
    color: #000;
  }

  .account-name {
    color: #999999;
  }

  .account-info_ctl {
    color: #858585;
  }

  .account-container {
    background-color: #fff;

    span.ti {
      color: #000 !important;
    }
  }

  .acc-pre-center {
    color: #333 !important;

    p {
      color: #333 !important;
    }
  }

  .acc-pre-right {
    .bluebtn {
      background-color: #222 !important;
    }
  }

  .account-box {
    background-color: #fff;
  }

  .name {
    color: #12354e !important;
  }

  .number {
    color: #e6003e !important;
  }

  .pcx {
    background-color: #e7e7e8;

    div {
      background-color: transparent !important;
      color: #000;
    }
  }

  .panel {
    background-color: #fff;
    color: #000;

    .panel-head {
      border-bottom-color: #cbcbcb;
    }

    .iconfont {
      color: #e6003e;
    }

    .font-w {
      color: #000;
    }
  }

  .other {
    .after {
      background-color: #fff;

      li {
        background-color: #fff;
        color: #000;
        border-bottom-color: #cbcbcb;

        .renzhen {
          color: #fff;
        }

        svg {
          color: #222;
        }
      }
    }
  }
}

.content-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    width: 50%;
  }

  li {
    padding-left: 0;
    padding-right: 0;
    display: flex;
    align-items: center;
  }

  li:nth-of-type(1), li:nth-of-type(3) {
    padding-left: 0;
  }

  li:nth-of-type(2) {
    padding-right: 0;
  }
}

.zijin1 {
  width: 0.4rem;
  margin-right: 0.2rem;
  object-fit: contain;
}

/deep/ .el-upload__input {
  display: none;
}

/deep/ .el-upload {
  display: flex;
}
</style>
