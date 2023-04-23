const common = {
  loading: 'Đang tải', // 加载中
  allLoaded: 'tất cả được tải', // 已全部加载
  noData: 'Không có dữ liệu', // 暂无数据
  searchText: 'Tên/Mã/Bính âm viết tắt', // 名称/代码/拼音首字母
  strand: 'mắc cạn', // 股
  moneyUnit: 'nhân dân tệ' // 元
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
export default {
  ...home,
  ...common,
  ...orderList,
  ...optional
}
