const common = {
  loading: 'Đang tải', // 加载中
  allLoaded: 'tất cả được tải', // 已全部加载
  noData: 'Không có dữ liệu', // 暂无数据
  searchText: 'Tên/Mã/Bính âm viết tắt', // 名称/代码/拼音首字母
  strand: 'mắc cạn', // 股
  moneyUnit: 'nhân dân tệ', // 元
  config: 'Chắc chắn', // 确定
  notLoggedL: 'chưa đăng nhập' // 未登录
}
// 提示
const tipObj = {
  fileTip: 'The photo you uploaded is too large, please choose a picture under 20M', // 您上传的照片过大，请选择20M以下的图片
  fileTip1: 'please enter your real name', // 请输入您的真实姓名
  fileTip2: 'Please enter your correct ID number', // 请输入您的正确的身份证号码
  fileTip3: 'Please upload your ID photo', // 请上传您的身份证照片
  fileTip4: 'Kích thước hình ảnh tải lên không được vượt quá 10M!' // 上传图片大小不能超过 10M!

}
// 首页
const home = {
  homeNavList1: 'Giá thị trường', // 行情
  homeNavList2: 'chức vụ', // 持仓
  homeNavList3: 'không bắt buộc', // 自选
  homeNavList4: 'của tôi', // 我的
  NewsList: 'danh sách tin tức', // 新闻列表
  search: 'tìm kiếm', // 搜索
  pleaseCheckTheOrder: 'Vui lòng kiểm tra đơn hàng' // 请查询订单
}
// 持仓
const orderList = {
  myPosition: 'chức vụ', // 我的持仓
  myClosingPosition: 'đóng một vị trí', // 我的平仓
  queryOrders: 'Thứ tự truy vấn Jianpin', // 根据股票简拼查询订单
  queryCodeOrders: 'thứ tự truy vấn mã', // 根据股票代码查询订单
  // 科创
  upToDate: 'cập nhật', // 最新
  buyingPrice: 'giá mua', // 买入价格
  nums: 'Số lượng', // 数量
  marketValue: 'giá trị thị trường', // 市值
  commission: 'phí xử lý', // 手续费
  stampDuty: 'tem đóng thuế', // 印花税
  warehouseRetentionFee: 'Phí lưu trữ', // 留仓费
  pointdifferenceFee: 'phí lây lan', // 点差费
  Floating: 'Lãi lỗ thả nổi', // 浮动盈亏
  TotalprofitAndLoss: 'tổng lãi lỗ', // 总盈亏
  closeAposition: 'đóng một vị trí', // 我要平仓
  ShortPinyinQueryPosition: 'Vị trí truy vấn pin đơn giản' // 可输入股票简拼查询持仓
}
// 自选
const optional = {
  optionalList1: 'Cổ phần', // 股票
  optionalList2: 'cập nhật', // 最新
  optionalList3: 'thăng trầm', // 涨跌幅
  optionalList4: 'xóa bỏ', // 删自选
  AddSelection: 'thêm tùy chọn', // 添加自选
  deleteSelection: 'xóa tùy chọn', // 删除自选
  placeOrder: 'đặt hàng', // 马上下单
  selectNumber: 'Chọn số lượng chia sẻ', // 选择股数
  purchaseRules: 'Mua tối thiểu là 1 cổ phiếu và mua tối đa là 100 cổ phiếu', // 最小购买股数1股，最大可购买数量100股
  minPur: 'Số lượng cổ phần tối thiểu được mua', // 最小购买股数
  maxPur: 'Số lượng mua tối đa', // 最大可购买数量
  paybond: 'trả tiền đặt cọc', // 支付保证金
  accountbalance: 'Số dư tài khoản', // 账户余额
  placorderwithliangrong: 'Đặt hàng' // 两融下单
}
const authentication = {
  authenticationFailed: 'Xác thực không thành công, vui lòng xác thực lại', // 认证失败，请重新认证
  failureReason: 'lý do thất bại', // 失败原因
  authenticationName: 'tên thật', // 真实姓名
  authenticationNamepla: 'vui lòng nhập tên thật của bạn', // 请输入您的真实姓名
  iDCard: 'số ID', // 身份证号
  iDCardpla: 'Vui lòng nhập số nhận dạng', // 请输入您的身份证号
  iDCardFront: 'đằng trước', // 身份证正面
  uploading: 'tải lên', // 正在上传中
  iDCardback: 'mặt sau', // 身份证背面
  ruleTitle: 'Quy tắc xác thực', // 认证规则
  ruleTip1: 'Người dùng mới phải vượt qua đánh giá xác thực tên thật sau khi đăng ký', // 新用户注册后必须通过实名认证审核
  ruleTip2: 'Sau khi tên và số ID được chứng nhận, chúng sẽ không bị sửa đổi, vui lòng liên hệ bộ phận chăm sóc khách hàng để sửa đổi', // 姓名和身份证号码一经认证不予修改，修改请联系客服
  ruleTip3: 'Tên thật phải trùng với tên tài khoản thẻ ngân hàng rút tiền' // 真实姓名必须和出金银行卡户名一致
}
const uesr = {
  userAuth: 'tài khoản', // 账户
  userName: 'tên nick', // 昵称
  assetStatus: 'tài sản', // 资产状况
  uesrTotle: 'Tổng tài sản', // 总资产
  recharge: 'nạp điện', // 充值
  withdraw: 'rút', // 提现
  AvailableFunds: 'tiền khả dụng', // 可用资金
  FreezeMargin: 'Ký quỹ đóng băng', // 冻结保证金
  Verified: 'Đã xác minh', // 实名认证
  examinationPassed: 'kiểm tra thông qua', // 审核通过
  NotReviewed: 'không được xem xét', // 未审核
  bank: 'Thẻ ngân hàng', // 银行卡
  RegisterbuyESOP: 'Đăng ký mua mã ESOP', // 注册购买 ESOP 代码
  changePassword: 'đổi mật khẩu', // 修改密码
  FundingDetails: 'chi tiết tài trợ', // 资金明细
  RechargeRecord: 'hồ sơ nạp tiền', // 充值记录
  WithdrawalsRecord: 'Hồ sơ rút tiền' // 提现记录
}
const cardBind={
  
}
const popup = {
  popupTip1: 'Dòng thanh lý bắt buộc là gì',
  popupTip2: '(Thượng Hải và Thâm Quyến) dòng thanh lý bắt buộc = (tiền khả dụng của tài khoản + ký quỹ đóng băng) *',
  popupTip3: '(Chỉ số) Dòng thanh lý cưỡng bức = (tiền khả dụng của tài khoản + ký quỹ bị đóng băng) *',
  popupTip4: '(Hợp đồng tương lai) dòng thanh lý bắt buộc = (tiền khả dụng của tài khoản + ký quỹ đóng băng) *',
  popupTip5: 'Khi tổng lãi và lỗ của các vị thế tài khoản Thượng Hải và Thâm Quyến của bạn là',
  popupTip6: 'Hệ thống sẽ buộc thanh lý',
  popupTip7: 'Khi tổng lãi và lỗ của các vị trí tài khoản chỉ mục của bạn là',
  popupTip9: 'Khi tổng lãi và lỗ của tài khoản tương lai của bạn là'
}
export default {
  ...home,
  ...common,
  ...orderList,
  ...optional,
  ...authentication,
  ...tipObj,
  ...uesr,
  ...popup
}
