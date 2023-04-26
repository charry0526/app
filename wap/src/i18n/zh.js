const common = {
  loading: 'Đang tải', // 加载中
  allLoaded: 'Tất cả được tải', // 已全部加载
  noData: 'Không có dữ liệu', // 暂无数据
  searchText: 'Tên/Mã/Bính âm viết tắt', // 名称/代码/拼音首字母
  strand: 'Mắc cạn', // 股
  moneyUnit: 'Nhân dân tệ', // 元
  config: 'Hoàn thành', // 确定
  notLoggedL: 'Chưa đăng nhập' // 未登录
}
// 提示
const tipObj = {
  fileTip: 'The photo you uploaded is too large, please choose a picture under 20M', // 您上传的照片过大，请选择20M以下的图片
  fileTip1: 'Please enter your real name', // 请输入您的真实姓名
  fileTip2: 'Please enter your correct ID number', // 请输入您的正确的身份证号码
  fileTip3: 'Please upload your ID photo', // 请上传您的身份证照片
  fileTip4: 'Kích thước hình ảnh tải lên không được vượt quá 10M!' // 上传图片大小不能超过 10M!

}
// 首页
const home = {
  homeNavList1: 'Bảng giá', // 行情
  homeNavList2: 'Tài sản', // 持仓
  homeNavList3: 'Tự chọn', // 自选
  homeNavList4: 'Của tôi', // 我的
  NewsList: 'Tin tức', // 新闻列表
  search: 'Tìm kiếm', // 搜索
  pleaseCheckTheOrder: 'Vui lòng kiểm tra đơn hàng' // 请查询订单
}
const tabbar = {
  tabbar1: 'Trang đầu',
  tabbar2: 'Bảng giá',
  tabbar3: 'Tài sản',
  tabbar4: 'Tự chọn',
  tabbar5: 'Của tôi'

}
// 持仓
const orderList = {
  myPosition: 'Tài sản', // 我的持仓
  myClosingPosition: 'Bán ra', // 我的平仓
  queryOrders: 'Thứ tự truy vấn Jianpin', // 根据股票简拼查询订单
  queryCodeOrders: 'Thứ tự truy vấn mã', // 根据股票代码查询订单
  // 科创
  upToDate: 'Cập nhật', // 最新
  buyingPrice: 'Giá mua', // 买入价格
  nums: 'Số lượng', // 数量
  marketValue: 'Giá trị thị trường', // 市值
  commission: 'Phí xử lý', // 手续费
  stampDuty: 'Tem đóng thuế', // 印花税
  warehouseRetentionFee: 'Phí lưu trữ', // 留仓费
  pointdifferenceFee: 'Phí lây lan', // 点差费
  Floating: 'Lãi lỗ thả nổi', // 浮动盈亏
  TotalprofitAndLoss: 'Tổng lãi lỗ', // 总盈亏
  closeAposition: 'Bán ra', // 我要平仓
  ShortPinyinQueryPosition: 'Vị trí truy vấn pin đơn giản' // 可输入股票简拼查询持仓
}
// 自选
const optional = {
  optionalList1: 'Cổ phần', // 股票
  optionalList2: 'Cập nhật', // 最新
  optionalList3: 'Thăng trầm', // 涨跌幅
  optionalList4: 'Xóa bỏ', // 删自选
  AddSelection: 'Thêm tùy chọn', // 添加自选
  deleteSelection: 'Xóa tùy chọn', // 删除自选
  placeOrder: 'Dặt hàng', // 马上下单
  selectNumber: 'Chọn số lượng chia sẻ', // 选择股数
  purchaseRules: 'Mua tối thiểu là 1 cổ phiếu và mua tối đa là 100 cổ phiếu', // 最小购买股数1股，最大可购买数量100股
  minPur: 'Số lượng cổ phần tối thiểu được mua', // 最小购买股数
  maxPur: 'Số lượng mua tối đa', // 最大可购买数量
  paybond: 'Trả tiền đặt cọc', // 支付保证金
  accountbalance: 'Số dư tài khoản', // 账户余额
  placorderwithliangrong: 'Đặt hàng' // 两融下单
}
const authentication = {
  authenticationFailed: 'Xác thực không thành công, vui lòng xác thực lại', // 认证失败，请重新认证
  failureReason: 'Lý do thất bại', // 失败原因
  authenticationName: 'Tên theo CCCD', // 真实姓名
  authenticationNamepla: 'Vui lòng nhập tên thật của bạn', // 请输入您的真实姓名
  iDCard: 'Số CCCD:', // 身份证号
  iDCardpla: 'Vui lòng nhập số nhận dạng', // 请输入您的身份证号
  iDCardFront: 'Ảnh mặt trước CCCD', // 身份证正面
  uploading: 'Tải lên', // 正在上传中
  iDCardback: 'Ảnh mặt sau CCCD', // 身份证背面
  ruleTitle: 'Quy tắc xác thực', // 认证规则
  ruleTip1: 'Người dùng cần xác thực tên thật sau khi đăng ký', // 新用户注册后必须通过实名认证审核
  ruleTip2: 'Sau khi tên và CCCD được xác thực sẽ không được sửa đổi, hãy liên hệ bộ phận CSKH để sửa đổi khi cần thiết', // 姓名和身份证号码一经认证不予修改，修改请联系客服
  ruleTip3: 'Tên thật phải khớp với tên tài khoản ngân hàng được liên kết rút tiền' // 真实姓名必须和出金银行卡户名一致
}
const uesr = {
  userAuth: 'Tài khoản', // 账户
  userName: 'Tên nick', // 昵称
  assetStatus: 'Tài sản', // 资产状况
  uesrTotle: 'Tổng tài sản', // 总资产
  recharge: 'Nạp tiền', // 充值
  withdraw: 'Rút tiền', // 提现
  AvailableFunds: 'SỐ DƯ KHẢ DỤNG', // 可用资金
  FreezeMargin: 'TỔNG SỐ KÝ QUỸ', // 冻结保证金
  Verified: 'Đã xác minh', // 实名认证
  examinationPassed: 'Kiểm tra thông qua', // 审核通过
  NotReviewed: 'Không được xem xét', // 未审核
  bank: 'Liên kết ngân hàng', // 银行卡
  RegisterbuyESOP: 'Đăng ký mua mã ESOP', // 注册购买 ESOP 代码
  changePassword: 'Dổi mật khẩu', // 修改密码
  FundingDetails: 'Lịch sử giao dịch', // 资金明细
  RechargeRecord: 'Lịch sử nạp tiền', // 充值记录
  WithdrawalsRecord: 'Lịch sử rút tiền' // 提现记录
}
const cardBind = {
  cashText: 'Số tiền có thể rút ( VND )',
  cashText2: 'Hoàn thành',
  cashText3: '1 : Để thực hiện rút tiền , vui lòng xác thực tên thật và liên kết tài khoản ngân hàng chính chủ.',
  cashText4: '2 : Thời gian rút tiền từ 09:00 đến 17:00 trừ ngày thứ 7 chủ nhật, ngày lễ .',
  cashText5: '3 : Số tiền rút tối thiểu cho mỗi lần rút 100.000 VND.',
  cashText6: '4 : Thời gian hoàn thành giao dịch rút trong vòng 24 giờ tính từ lúc lệnh rút được thông qua,tùy thuộc vào ngân hàng thụ hưởng.',
  cashText7: 'Lưu ý :Số tiền rút không được vượt quá số dư khả dụng trong tài khoản của bạn.'
}
const openaccount = {
  process1: 'Đăng ký',
  process2: 'Xác nhận',
  process3: 'Tiền gửi',
  process4: 'Mua bán'
}
const popup = {
  popupTip1: 'Dòng thanh lý bắt buộc là gì',
  popupTip2: '(Thượng Hải và Thâm Quyến) dòng thanh lý bắt buộc = (tiền khả dụng của tài khoản + TỔNG SỐ KÝ QUỸ) *',
  popupTip3: '(Chỉ số) Dòng thanh lý cưỡng bức = (tiền khả dụng của tài khoản + ký quỹ bị đóng băng) *',
  popupTip4: '(Hợp đồng tương lai) dòng thanh lý bắt buộc = (tiền khả dụng của tài khoản + TỔNG SỐ KÝ QUỸ) *',
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
  ...popup,
  ...tabbar,
  ...openaccount,
  ...cardBind
}
