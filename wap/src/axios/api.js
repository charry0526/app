import { post, get } from '@/axios/index'
// import APIUrl from '@/axios/api.url'

// var img_url = APIUrl.util.image // 这个就是图片上传的api url

// 就可以使用 post 和 get 了
// 获取产品配置信息
export function getProductSetting (options) {
  return post('/apis/api/admin/getProductSetting.do', options)
}
// 申购
export function xingusg (options) {
  return get('/apis/new/public/index.php/api/Newlist/index', options)
}
// 申购提交
export function xingusgs (options) {
  return post('/apis/new/public/index.php/api/Lists/add', options)
}

// 新股冻结资金
export function getprice (options) {
  return get('/apis/new/public/index.php/api/Lists/getprice', options)
}

// 申购提交列表
export function xingusgsList (options) {
  return get('/apis/new/public/index.php/api/Lists/index', options)
}

// 登录
export function login (options) {
  return post('/apis/api/user/login.do', options)
}

// 注册
export function register (options) {
  return post('/apis/api/user/reg.do', options)
}

// 注销登录
export function logout (options) {
  return post('/apis/api/user/logout.do', options)
}

// 验证是否注册
export function checkPhone (options) {
  return post('/apis/api/user/checkPhone.do', options)
}

// 更改密码 -- 忘记密码
export function forgetPas (options) {
  return get('/apis/api/user/updatePwd.do', options)
}

// 修改密码
export function changePassword (options) {
  return get('/apis/user/updatePwd.do', options)
}

// 获取验证码  -- 注册
export function getCode (options) {
  return get('/apis/api/sms/sendRegSms.do', options)
}

// 获取验证码  -- 忘记密码
export function sendForgetSms (options) {
  return get('/apis/api/sms/sendForgetSms.do', options)
}

// 获取图片验证码   -- 查看验证码
export function getCode2 (options) {
  return get('/apis/code/getCode.do', options)
}

// 验证图片验证码 -- 验证
export function checkCode (options) {
  return get('/apis/code/checkCode.do', options)
}

// /*** 首页 ****/
// 查询首页显示的指数
export function getIndexMarket (options) {
  return get('/apis/api/index/queryHomeIndex.do', options)
}

// 查询列表页显示的指数
export function getListMarket (options) {
  return get('/apis/api/index/queryListIndex.do', options)
}

// 查询指数是否可交易
export function getTransMarket (options) {
  return get('/apis/api/index/queryTransIndex.do', options)
}

// 获取大盘指数
export function getMarket (options) {
  return get('/apis/api/stock/getMarket.do', options)
}

// 股票列表数据
export function getStock (options) {
  return get('/apis/api/stock/getStock.do', options)
}

// 单只股票行情数据
export function getSingleStock (options) {
  return post('/apis/api/stock/getSingleStock.do', options)
}

// 单只指数行情数据
export function getSingleIndex (options) {
  return post('/apis/api/index/querySingleIndex.do', options)
}

// 添加自选
export function addOption (options) {
  return post('/apis/user/addOption.do', options)
}

// 删除自选
export function delOption (options) {
  return post('/apis/user/delOption.do', options)
}

// 获取期货列表
export function getFutures (options) {
  return get('/apis/api/futures/queryList.do', options)
}

// 获取首页显示的期货列表
export function getHomeFutures (options) {
  return get('/apis/api/futures/queryHome.do', options)
}

// 查询期货产品的交易状态
export function queryTrans (options) {
  return get('/apis/api/futures/queryTrans.do', options)
}

// 查询基币的汇率，对外暴露
export function queryExchange (options) {
  return get('/apis/api/futures/queryExchange.do', options)
}

// 查询单个期货产品的行情（行情源的数据）
export function querySingleMarket (options) {
  return get('/apis/api/futures/querySingleMarket.do', options)
}

// 期货下单
export function buyFutures (options) {
  return post('/apis/user/buyFutures.do', options)
}

// 下单
export function buy (options) {
  return post('/apis/user/buy.do', options)
}

// 指数下单
export function indexBuy (options) {
  return post('/apis/user/buyIndex.do', options)
}

// 用户平仓
export function sell (options) {
  return post('/apis/user/sell.do', options)
}

// 指数平仓
export function sellIndex (options) {
  return post('/apis/user/sellIndex.do', options)
}

// 期货平仓
export function sellFutures (options) {
  return post('/apis/user/sellFutures.do', options)
}

// /***用户中心***/
// 用户资金户转
export function AmtChange (options) {
  return post('/apis/user/transAmt.do', options)
}

// 用户详情
export function getUserInfo (options) {
  return post('/apis/user/getUserInfo.do', options)
}

// 添加银行卡
export function addBankCard (options) {
  return post('/apis/user/bank/add.do', options)
}

// 修改银行卡
export function updateBankCard (options) {
  return post('/apis/user/bank/update.do', options)
}

// 获取银行卡信息
export function getBankCard (options) {
  return post('/apis/user/bank/getBankInfo.do', options)
}

// 获取我的持仓单
export function getOrderList (options) {
  return post('/apis/user/position/list.do', options)
}

// 获取我的持仓单 - 指数
export function getIndexOrderList (options) {
  return post('/apis/user/index/position/list.do', options)
}

// 获取我的持仓单 - 期货
export function getFuturesOrderList (options) {
  return post('/apis/user/futures/position/list.do', options)
}

// 获取我的自选列表
export function getMyList (options) {
  return post('/apis/user/option/list.do', options)
}

// 实名认证
export function userAuth (options) {
  return post('/apis/user/auth.do', options)
}

// 资金明细
export function cashDetail (options) {
  return post('/apis/user/cash/list.do', options)
}

// 提现记录
export function rechargeList (options) {
  return post('/apis/user/recharge/list.do', options)
}

// 充值记录
export function withdrawList (options) {
  return post('/apis/user/withdraw/list.do', options)
}

// 充值
export function inMoney (options) {
  return post('/apis/user/recharge/inMoney.do', options)
}

// 提现
export function outMoney (options) {
  return post('/apis/user/withdraw/outMoney.do', options)
}

// 取消提现
export function canceloutMoney (options) {
  return post('/apis/user/withdraw/cancel.do', options)
}
// 信用金------------------
export function moneyCredit (options) {
  return post('/apis/user/moneyCredit/loan.do', options)
}
//信用金详情
export function moneyCreditInfo (options) {
  return post('/apis/user/moneyCredit/details.do', options)
}
// 用户信用金饼图
export function pieChart (options) {
  return post('/apis/user/pieChart/loan.do', options)
}
// 信用金充值
export function topUp (options) {
  return post('/apis/user/topupMoney/topUp.do', options)
}

// k线图
export function getMinK (options) {
  return post('/apis/api/stock/getMinK.do', options)
}

// k线图
export function getMinKEcharts (options) {
  return post('/apis/api/stock/getMinK_Echarts.do', options)
}

// 是否已添加自选
export function isOption (options) {
  return post('/apis/user/isOption.do', options)
}

// 获取网站设置信息
export function getSetting (options) {
  return post('/apis/api/admin/getSetting.do', options)
}

// 获取指数网站设置信息
export function getIndexSetting (options) {
  return post('/apis/api/admin/getIndexSetting.do', options)
}

// 获取期货网站设置信息
export function getFuturesSetting (options) {
  return post('/apis/api/admin/getFuturesSetting.do', options)
}

// 获取首页banner
export function getBannerByPlat (options) {
  return post('/apis/api/site/getBannerByPlat.do', options)
}

// 公告列表
export function getArtList (options) {
  return post('/apis/api/art/list.do', options)
}

// 公告详情
export function getArtDetail (options) {
  return post('/apis/api/art/detail.do', options)
}

// 获取支付渠道
export function getPayInfo (options) {
  return post('/apis/api/site/getPayInfo.do', options)
}

// 获取单个渠道信息
export function getPayInfoDetail (options) {
  return post('/apis/api/site/getPayInfoById.do', options)
}

// 获取网站设置信息
export function getInfoSite (options) {
  return post('/apis/api/site/getInfo.do', options)
}

// k线图 分时
export function getMinuteLine (options) {
  return post('/apis/api/realTime/findStock.do', options)
}

// 新增渠道  支付宝扫码
export function getjuhe1 (options) {
  return post('/apis/user/pay/juhe1.do', options)
}

// H5支付
export function getjuheH5 (options) {
  return post('/apis/user/pay/juheh5.do', options)
}

// 支付渠道
export function payLInk (url, options) {
  return post(url, options)
}

// 图片上传 uploadimg
export function uploadimg (options) {
  return post('/apis/user/upload.do', options)
}

// 查询点差费率
export function findSpreadRateOne (options) {
  return post('/apis/api/user/findSpreadRateOne.do', options)
}

// ==================最新修改内容：日线、添加自选等，2020年7月10日15:37:20======================
// 期货分钟-k线图
export function getFuturesMinKEcharts (options) {
  return post('/apis/api/stock/getFuturesMinK_Echarts.do', options)
}

// 指数分钟-k线图
export function getIndexMinKEcharts (options) {
  return post('/apis/api/stock/getIndexMinK_Echarts.do', options)
}

// 股票日线图
export function getDayK (options) {
  return post('/apis/api/stock/getDayK.do', options)
}

// 期货日线图
export function getFuturesDayK (options) {
  return post('/apis/api/stock/getFuturesDayK.do', options)
}

export function getHistory (code) {
  return get('/apis/chart3api/history?symbol=' + code + '&resolution=D&from=0&to=99999999999')
}

// 指数日线图
export function getIndexDayK (options) {
  return post('/apis/api/stock/getIndexDayK.do', options)
}

// 查询期货详情
export function queryFuturesByCode (options) {
  return get('/apis/api/futures/queryFuturesByCode.do', options)
}

// ==================最新修改内容：新版-新闻资讯、交易大厅，2020年8月26日10:39======================

// 查询期货详情
export function queryNewsList (type) {
  return get(`/apis/api/news/getNewsList.do?pageNum=1&pageSize=15&type=${type}`, {})
}

// 配资申请-用户配资列表
export function getUserApplyList (options) {
  return post('/apis/user/funds/getUserApplyList.do', options)
}

// -----分仓配资----- 2020 08 30

export function getFundsSetting (options) {
  return post('/apis/user/funds/getFundsSetting.do', options)
}

// 查询配资类型杠杆
export function getFundsTypeList (options) {
  return post('/apis/user/funds/getFundsTypeList.do', options)
}

// 配资申请-添加
export function addFundsApply (options) {
  return post('/apis/user/funds/addFundsApply.do', options)
}
// 分仓下单
export function buyFunds (options) {
  return post('/apis/user/funds/buyFunds.do', options)
}

// 配资申请-用户操盘中子账户
export function getUserSubaccount (options) {
  return post('/apis/user/funds/getUserSubaccount.do', options)
}

// 获取消息列表
export function getNoticeList (options) {
  return post('/apis/user/cash/getMessagelist.do', options)
}

// 分仓交易-获取我的配资持仓单
export function getFundsOrderList (options) {
  return post('/apis/user/funds/fundsList.do', options)
}

// 分仓交易-配资平仓
export function sellFunds (options) {
  return post('/apis/user/funds/sellFunds.do', options)
}

// 新股-提出列表
export function Newlist (options) {
  return get('/apis/api/admin/getEsopList.do', options)
}
// 新股-申请列表
export function ListsAdd (options) {
  return post('/apis/api/admin/addESOP_sq.do', options)
}
// // 新股-提出操作
// export function Newlist (options) {
//   return get('/apis/admin/Newlist/index', options)
// }
// 新股-赞同
export function endorseList (options) {
  return get('/apis/api/admin/getEsopList_sq.do', options)
}
// 首页-新闻
export function allNewList (options) {
  return get('/wifeed/api/tin-tuc/thi-truong', options)
}
// 股票列表
export function bestandslisteList (options) {
  return get('/wifeed/api/tin-tuc/co-phieu', options)
}
// 获取验证码
export function getMessageCode (options) {
  return get('/apis/api/admin/sendMessages.do', options)
}
// 重新获取验证码
export function getseMessageCode (options) {
  return get('/apis/api/admin/resendMessages.do', options)
}
//
export function wifeedDutop (options) {
  return get('/wifeed/api/du-lieu-gia-eod/ohcl', options)
}
// 设置客服地址
export function setCusAddress (options) {
  return get('/api/admin/setCSAddress.do', options)
}

// 获取客服地址
export function getCusAddress (options) {
  return get('/apis/api/admin/getCSAddress.do', options)
}
// 修改用户信息
export function setUserInfo (options) {
  return get('/apis/api/admin/setAvatar.do', options)
}
// 获取加密公钥
export function getPKConfig (options) {
  return post('/apis/api/user/getUPKConfig.do', options)
}
