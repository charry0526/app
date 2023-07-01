import Vue from 'vue'
import App from './App'
import router from './router'
import Icon from 'vue-svg-icon/Icon.vue'
import Mint from 'mint-ui'
// import Resource from 'vue-resource' // 已卸载用axios代替
import store from './store/index'
import axios from './axios/index'
import ElementUI from 'element-ui'
import locales from 'element-ui/lib/locale/lang/vi'
import VueClipboard from 'vue-clipboard2' // 复制
import state from './event'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
// import md5 from 'js-md5'
import * as filters from '@/utils/utils'
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import VueI18n from 'vue-i18n'
import zh from './i18n/zh'
import en from './i18n/en'
import '../static/css/public2.css'
// import VueTouch from 'vue-touch'
import 'vant/lib/index.css'
import * as api from '@/axios/api'

Vue.use(animated)
Vue.use(ElementUI, { locales })
Vue.use(VueClipboard)
Vue.use(VueI18n)

// Vue.use(VueTouch, { name: 'v-touch' })
// // Vue.prototype.$md5 = md5
// VueTouch.config.swipe = {
//   threshold: 100 // 手指左右滑动距离
// }
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh', // 没有就设置默认值zh
  messages: {
    zh: zh,
    en: en
  }
})
Vue.use(Mint)
Vue.component('icon', Icon)
Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$state = state
Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (
      location.href.indexOf('?') !== -1 &&
      location.href.indexOf('goindex') === -1
    ) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}
Vue.prototype.setCookie = function (name, value, day) {
  if (day !== 0) {
    // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var curDate = new Date()
    var curTamp = curDate.getTime()
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1
    var passedTamp = curTamp - curWeeHours
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp
    var leftTime = new Date()
    leftTime.setTime(leftTamp + curTamp)
    document.cookie =
      name + '=' + escape(value) + ';expires=' + leftTime.toGMTString()
  } else {
    document.cookie = name + '=' + escape(value)
  }
}
Vue.prototype.getCookie = function (name) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
  // document.cookie = name + "=" + escape(value);
}
Vue.prototype.clearCookie = function () {
  this.setCookie('USER_TOKEN', '', -1)
}
Vue.prototype.checkCookie = function () {
  var user = this.getCookie('USER_TOKEN')
  if (user !== '') {
    alert('Welcome again ' + user)
  } else {
    user = prompt('Please enter your name:', '')
    if (user !== '' && user != null) {
      this.setCookie('USER_TOKEN', user, 365)
    }
  }
}

Vue.prototype.$moneyDot = function (value, isdot = true) {
  if (value == 0) {
    return value
  }
  let suffix = ''

  // console.log(isNaN(Number(value)), value)
  if (
    value &&
    value !== 'NULL' &&
    value !== 'undefined' &&
    isNaN(Number(value))
  ) {
    return value
  } else if (!value) {
    return '-'
  } else {
    let pSuffix = ''
    value = value.toString()
    let intPart = Math.floor(Math.abs(Number(value))) // 获取整数部分
    let intPartFormat = intPart
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    intPartFormat = pSuffix + intPartFormat
    let floatPart = '' // 预定义小数部分
    let value2Array = value.split('.')

    // =2表示数据有小数位
    if (value2Array.length === 2) {
      if (isdot == false) {
        return value2Array[0]
      }
      floatPart = value2Array[1].toString() // 拿到小数部分
      if (floatPart.length === 1) {
        // 补0,实际上用不着
        let returnValue = intPartFormat + '.' + floatPart + '0' + suffix
        if (Number(value) >= 0) {
          return returnValue
        } else {
          return '-' + returnValue
        }
      } else {
        if (Number(value) >= 0) {
          return intPartFormat + '.' + (floatPart + suffix).substring(0, 2)
        } else {
          return (
            '-' + intPartFormat + '.' + (floatPart + suffix).substring(0, 2)
          )
        }
      }
    } else {
      if (Number(value) >= 0) {
        return intPartFormat + floatPart + suffix
      } else {
        return '-' + intPartFormat + floatPart + suffix
      }
    }
  }
}
// router.beforeEach((to, from, next) => {
// console.log(to.path)
// store.state.select = to.path
// document.title = to.meta.title || '亿点通'
// // 判断是否登录
// console.log(document.cookie)
// // console.log(checkCookie(),'checkCookie()')
// if(!to.meta.requireAuth){
// next()
// return
// }
// if (document.cookie && to.meta.requireAuth) {
// if (to.path === '/login') {
// next({ path: '/' })
// } else {
// if (!to.query.url && from.query.url) {
// to.query.url = from.query.url
// }
// next()
// }
// }else{
// if (to.path === '/login') {
// next()
// } else {
// next({ path: '/login' })
// }
// }
// })
router.beforeEach((to, from, next) => {
  store.state.select = to.path
  document.title = to.meta.title
  api.getProductSetting().then(res => {

  }).catch((err) => {
    ElementUI.Message({
      message: 'mạng bị ngắt kết nối',
      type: 'error'
    })
  })
  // if (navigator.onLine) {
  //   // ElementUI.Message({
  //   //   message: 'mạng trở lại bình thường',
  //   //   type: 'success'
  //   // })
  // } else {
  //   ElementUI.Message({
  //     message: 'mạng bị ngắt kết nối',
  //     type: 'error'
  //   })
  // }
  next()
})
// // 设置title
// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {//如果设置标题，拦截后设置标题
//     if(store.state && store.state.siteInfo && store.state.siteInfo.siteName){
//       document.title =  store.state.siteInfo.siteName + '-' + to.meta.title
//     }else{
//       document.title =  to.meta.title
//     }
//   }
//   next()
// })
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  axios,
  i18n,
  render: h => h(App)
}).$mount('#app')
