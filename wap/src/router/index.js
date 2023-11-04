import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/home'
import Buy from '@/page/home/buy'
import Alertdetail from '@/page/home/components/alert' // 公告详情
import Register from '@/page/register'
import Forget from '@/page/toForget' // 忘记密码
import Login from '@/page/login'
import List from '@/page/list/list'
import Searchlist from '@/page/list/list-search'
import IndexSearchlist from '@/page/list/indexlist-search' // 指数查询
import SearchMylist from '@/page/list/my-list-search'
import ListDetail from '@/page/list/detail'
import ListDetail2 from '@/page/list/detail2'
import MyList from '@/page/list/my-list'
import Inquiry from '@/page/home/inquiry'
import User from '@/page/user/user'
import OrderList from '@/page/user/order-list'
import holdOrderList from '@/page/user/search-order/hold-stockCode'
import holdOrderList2 from '@/page/user/search-order/hold-stockSpell'
import sellOrderList from '@/page/user/search-order/sell-stockCode'
import sellOrderList2 from '@/page/user/search-order/sell-stockSpell'
import Detail from '@/page/user/detail'
import Card from '@/page/user/card'
import Esop from '@/page/user/esop'
import Credist from '@/page/user/credist'

import Authentication from '@/page/user/authentication'
import Aggre from '@/page/user/agreement'
import Recharge from '@/page/user/recharge'
import RechargeSure from '@/page/user/recharge-sure'
import RechargeList from '@/page/user/rechargelist'
import Cash from '@/page/user/cash'
import Cashlist from '@/page/user/cashlist'
import AddCard from '@/page/user/addCard'
import Setting from '@/page/user/my'
import Transfer from '@/page/user/transfer'
import IndexList from '@/page/list/index-list'
import indexBuy from '@/page/home/index-buy'
import TwoBuy from '@/page/home/two-buy'
import TwoBuyNew from '@/page/home/two-buy-new'
import SubWarehouseBuy from '@/page/home/sub-warehouse-buy'
import futuresBuy from '@/page/home/futures-buy'
import Agree from '@/page/registerAgree'
import Trage from '@/page/tradeAgree'
import OpenAccount from '@/page/openaccount'
import FundsList from '@/page/funds/funds-list'
import News from '@/page/home/news'
import changePassword from '@/page/user/changePassword'
import custome from '@/page/custome'
import Maintenance from '@/page/maintenance'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      meta: {
        // title: '首页',
        title: 'Trang đầu',
        requireAuth: true
      },
      component: Home
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      meta: {
        // title: '首页',
        title: '',
        requireAuth: true
      },
      component: Maintenance
    }, {
      path: '/buy',
      name: 'buy',
      meta: {
        // title: '购买',
        title: 'Trang đầu',
        requireAuth: true,
        hasHeader: true
      },
      component: Buy
    }, {
      path: '/register',
      name: 'register',
      meta: {
        // title: '注册'
        title: 'Đăng ký'
      },
      component: Register
    }, {
      path: '/toForget',
      name: 'toForget',
      meta: {
        // title: '忘记密码'
        title: 'Quên mật khẩu'
      },
      component: Forget
    }, {
      path: '/login',
      name: 'login',
      meta: {
        // title: '账户登录',
        title: 'Đăng nhập tài khoản',
        hasHeader: false
      },
      component: Login
    }, {
      path: '/openaccount',
      name: 'openaccount',
      meta: {
        // title: 'mở một tài khoản',
        title: 'Đăng nhập tài khoản',
        hasHeader: true
      },
      component: OpenAccount
    }, {
      path: '/list',
      name: 'list',
      meta: {
        // title: '行情',
        title: 'Bảng giá',
        requireAuth: false,
        hasHeader: true
      },
      component: List
    }, {
      path: '/indexsearchlist',
      name: '指数查询',
      meta: {
        // title: '指数查询'
        title: 'Truy vấn chỉ mục'
      },
      component: IndexSearchlist
    }, {
      path: '/indexlist',
      name: 'indexlist',
      meta: {
        // title: '指数列表',
        title: 'Danh sách chỉ mục',
        requireAuth: false
      },
      component: IndexList
    }, {
      path: '/searchlist',
      name: '个股查询',
      meta: {
        // title: '个股查询'
        title: 'Truy vấn chứng khoán cá nhân'
      },
      component: Searchlist
    }, {
      path: '/searchmylist',
      name: 'searchmylist',
      meta: {
        // title: '自选查询',
        title: 'Truy vấn tùy chọn',
        requireAuth: true
      },
      component: SearchMylist
    }, {
      path: '/mylist',
      name: 'mylist',
      meta: {
        // title: '自选列表',
        title: 'Danh sách theo dõi',
        requireAuth: true,
        hasHeader: true

      },
      component: MyList
    }, {
      path: '/listdetail',
      name: 'listdetail',
      meta: {
        title: 'Thông tin chi tiết',
        requireAuth: false,
        hasHeader: true
      },
      component: ListDetail
    }, {
      path: '/listdetail2',
      name: 'listdetail2',
      meta: {
        title: 'Thông tin chi tiết',
        requireAuth: false,
        hasHeader: true
      },
      component: ListDetail2
    },
    {
      path: '/indexBuy',
      name: 'indexBuy',
      meta: {
        // title: '指数购买',
        title: 'Chỉ số mua',
        requireAuth: false,
        hasHeader: true,
        iconRight: 'search'
      },
      component: indexBuy
    },
    {
      path: '/twoBuy',
      name: 'TwoBuy',
      meta: {
        // title: '两融交易',
        title: 'Hai giao dịch tài chính',
        requireAuth: false,
        hasHeader: true,
        iconRight: 'search'
      },
      component: TwoBuy
    },
    {
      path: '/twoBuyNew',
      name: 'TwoBuyNew',
      meta: {
        // title: '两融交易',
        title: 'Hai giao dịch tài chính',
        requireAuth: false,
        hasHeader: true,
        iconRight: 'search'
      },
      component: TwoBuyNew
    },
    {
      path: '/subWarehouseBuy',
      name: 'SubWarehouseBuy',
      meta: {
        // title: '分仓交易',
        title: 'Chia nhỏ giao dịch',
        requireAuth: false,
        hasHeader: true,
        iconRight: 'search'
      },
      component: SubWarehouseBuy
    }, {
      path: '/futuresBuy',
      name: 'futuresBuy',
      meta: {
        // title: '期货购买',
        title: 'Mua tương lai',
        requireAuth: false,
        hasHeader: true
      },
      component: futuresBuy
    }, {
      path: '/inquiry',
      name: 'inquiry',
      meta: {
        // title: '询价',
        title: 'Cuộc điều tra',
        requireAuth: true
      },
      component: Inquiry
    }, {
      path: '/user',
      name: 'user',
      meta: {
        // title: '我的',
        title: 'Của tôi',
        requireAuth: true
        // hasHeader: true
      },
      component: User
    },
    {
      path: '/transfer',
      name: 'transfer',
      meta: {
        // title: '资金互转',
        title: 'Chuyển tiền lẫn nhau',
        requireAuth: true
      },
      component: Transfer
    }, {
      path: '/orderlist',
      name: 'orderlist',
      meta: {
        // title: '持仓',
        title: 'Tài sản',
        requireAuth: false,
        hasHeader: true
      },
      component: OrderList
    },
    {
      path: '/holdorderlist',
      name: 'holdorderlist',
      meta: {
        // title: '查询持仓',
        title: 'Vị trí truy vấn',
        requireAuth: true,
        hasHeader: true
      },
      component: holdOrderList
    }, {
      path: '/holdorderlist2',
      name: 'holdorderlist2',
      meta: {
        // title: '查询持仓',
        title: 'Vị trí truy vấn',
        requireAuth: true,
        hasHeader: true
      },
      component: holdOrderList2
    }, {
      path: '/sellorderlist',
      name: 'sellorderlist',
      meta: {
        // title: '查询平仓',
        title: 'Truy vấn để đóng một vị trí',
        requireAuth: true,
        hasHeader: true
      },
      component: sellOrderList
    }, {
      path: '/sellorderlist2',
      name: 'sellorderlist2',
      meta: {
        // title: '查询平仓',
        title: 'Truy vấn để đóng một vị trí',
        requireAuth: true,
        hasHeader: true
      },
      component: sellOrderList2
    }, {
      path: '/detail',
      name: 'detail',
      meta: {
        // title: '资金明细',
        title: 'Lịch sử giao dịch',
        requireAuth: true,
        hasHeader: true
      },
      component: Detail
    }, {
      path: '/card',
      name: 'card',
      meta: {
        // title: '银行卡',
        title: 'Liên kết ngân hàng',
        requireAuth: true,
        hasHeader: true
      },
      component: Card
    }, {
      path: '/esop',
      name: 'esop',
      meta: {
        title: 'Esop',
        requireAuth: true,
        hasHeader: true
      },
      component: Esop
    },
    {
      path: '/credist',
      name: 'credist',
      meta: {
        title: 'Credist',
        requireAuth: true,
        hasHeader: true
      },
      component: Credist
    },
    {
      path: '/authentication',
      name: 'authentication',
      meta: {
        // title: '认证',
        title: 'Xác thực',
        requireAuth: true,
        hasHeader: true
      },
      component: Authentication
    }, {
      path: '/aggre',
      name: 'aggre',
      meta: {
        // title: '合作协议',
        title: 'Thỏa thuận hợp tác',
        requireAuth: true
      },
      component: Aggre
    }, {
      path: '/recharge',
      name: 'recharge',
      meta: {
        // title: '充值',
        title: 'Nạp tiền',
        requireAuth: true,
        hasHeader: true

      },
      component: Recharge
    }, {
      path: '/rechargeSure',
      name: 'rechargeSure',
      meta: {
        // title: '确认充值',
        title: 'Xác nhận nạp tiền',
        requireAuth: true,
        hasHeader: true

      },
      component: RechargeSure
    }, {
      path: '/rechargelist',
      name: 'rechargelist',
      meta: {
        // title: '充值记录',
        title: 'Lịch sử nạp tiền',
        requireAuth: true,
        hasHeader: true
      },
      component: RechargeList
    }, {
      path: '/cash',
      name: 'cash',
      meta: {
        // title: '提现',
        title: 'Rút',
        requireAuth: true,
        hasHeader: true
      },
      component: Cash
    }, {
      path: '/addCard',
      name: 'addCard',
      meta: {
        // title: '添加银行卡',
        title: 'Thêm thẻ ngân hàng',
        requireAuth: true,
        hasHeader: true

      },
      component: AddCard
    }, {
      path: '/cashlist',
      name: 'cashlist',
      meta: {
        // title: '提现记录',
        title: 'Lịch sử rút tiền',
        requireAuth: true,
        hasHeader: true

      },
      component: Cashlist
    }, {
      path: '/setting',
      name: 'setting',
      meta: {
        // title: '设置',
        title: 'Cài đặt',
        requireAuth: true
      },
      component: Setting
    }, {
      path: '/agree',
      name: 'agree',
      meta: {
        // title: '注册协议',
        title: 'Thỏa thuận đăng ký',
        requireAuth: true
      },
      component: Agree
    }, {
      path: '/trade',
      name: 'trade',
      meta: {
        // title: '交易⻛险揭示书',
        title: 'Tiết lộ Rủi ro Giao dịch',
        requireAuth: true
      },
      component: Trage
    },
    {
      path: '/alertdetail',
      name: 'alertdetail',
      meta: {
        // title: '公告详情',
        title: 'Chi tiết thông báo',
        requireAuth: true
      },
      component: Alertdetail
    },
    {
      path: '/funds',
      name: 'funds',
      meta: {
        // title: '配资主页',
        title: 'Trang chủ tài trợ',
        requireAuth: true,
        hasHeader: true,
        iconRight: 'setting'
      },
      component: () => import('../page/funds/index')
    },
    {
      path: '/days',
      name: 'days',
      meta: {
        // title: '按天配资',
        title: 'Cấp vốn theo ngày',
        requireAuth: true,
        hasHeader: true,
        iconRight: 'setting'
      },
      component: () => import('../page/funds/days')
    },
    {
      path: '/xingu',
      name: 'xingu',
      meta: {
        // title: '新股申购',
        title: 'IPO',
        requireAuth: true,
        hasHeader: true,
        iconRight: 'setting'
      },
      component: () => import('../page/funds/xingu')
    },
    {
      path: '/searchStock',
      name: 'searchStock',
      meta: {
        // title: '查询股票',
        title: 'Kiểm tra chứng khoán',
        requireAuth: true,
        hasHeader: true
      },
      component: () => import('../page/list/search')
    },
    {
      path: '/notify',
      name: 'notify',
      meta: {
        // title: '消息记录',
        title: 'Nhật ký tin nhắn',
        requireAuth: true,
        hasHeader: true
      },
      component: () => import('../page/user/notify')
    }, {
      path: '/fundslist',
      name: 'fundslist',
      meta: {
        // title: '分仓配资',
        title: 'Phân bổ vị trí phụ',
        requireAuth: false,
        hasHeader: true
      },
      component: FundsList
    },
    {
      path: '/news',
      name: 'news',
      meta: {
        // title: '详情',
        title: 'Chi tiết',
        requireAuth: false,
        hasHeader: true
      },
      component: News
    }, {
      path: '/changePassword',
      name: 'changePassword',
      meta: {
        title: 'Đổi mật khẩu',
        requireAuth: false,
        hasHeader: true
      },
      component: changePassword
    }, {
      path: '/custome',
      name: 'custome',
      meta: {
        title: 'Tư vấn khách hàng',
        requireAuth: false,
        hasHeader: true
      },
      component: custome
    },
    {
      // 会匹配所有路径
      path: '*',
      redirect: '/home'
    }
  ]
})
