<template>
  <div
    style="position: fixed;
    bottom: 0;
    width: 100%;"
    :class="`footer ${$state.theme === 'red' ? 'red-theme' : 'black-theme'}`"
  >
    <mt-tabbar v-model="select">
      <mt-tab-item id="home" :class="$store.state.select == '/home' ? 'on' : ''">
        <!-- <i v-if="$store.state.select == '/home'" class="iconfont icon-zhuiocn02"></i>
        <i v-else class="iconfont icon-zhuiocn"></i> -->
        <img
          class="foot-icon"
          v-if="$store.state.select == '/home'"
          :src="require(`../../../static/img/news/foot/home-active.png`)" alt=""
        >
        <img
          class="foot-icon"
          v-else
          :src="require(`../../../static/img/news/foot/home.png`)" alt=""
        >

        <p v-if="$store.state.select == '/home'" :style="{color: $state.theme === 'black' ? '#EE9827' : '#C11815'}">{{$t("tabbar1")}}<!-- 首页 --></p>
        <p v-else :style="{color: $state.theme === 'black' ? '#FFFFFF' : '#656565'}">{{$t("tabbar1")}}</p>

      </mt-tab-item>
      <mt-tab-item id="list" :class="$store.state.select == '/list' || $store.state.select == '/indexlist'? 'on' : ''">
        <!-- <i v-if="$store.state.select == '/list'" class="iconfont icon-hangqing"></i>
        <i v-else class="iconfont icon-hangqing-copy"></i> -->
        <img
          class="foot-icon"
          v-if="$store.state.select == '/list'"
          :src="require(`../../../static/img/news/foot/hangqing-active.png`)" alt=""
        >
        <img
          class="foot-icon"
          v-else
          :src="require(`../../../static/img/news/foot/hangqing.png`)" alt=""
        >
        <p v-if="$store.state.select == '/list'" :style="{color: $state.theme === 'black' ? '#EE9827' : '#C11815'}">{{$t("tabbar2")}}<!-- 行情 --></p>
        <p v-else :style="{color: $state.theme === 'black' ? '#FFFFFF' : '#656565'}">{{$t("tabbar2")}}</p>

      </mt-tab-item>
      <mt-tab-item id="orderlist" :class="$store.state.select == '/orderlist' ? 'on' : ''">
        <!-- <i v-if="$store.state.select == '/orderlist'" class="iconfont icon-hangqing2"></i>
        <i v-else class="iconfont icon-hangqing-unselectedx"></i> -->
        <img
          class="foot-icon"
          v-if="$store.state.select == '/orderlist'"
          :src="require(`../../../static/img/news/foot/chicang-active.png`)" alt=""
        >
        <img
          class="foot-icon"
          v-else
          :src="require(`../../../static/img/news/foot/chicang.png`)" alt=""
        >
        <p v-if="$store.state.select == '/orderlist'" :style="{color: $state.theme === 'black' ? '#EE9827' : '#C11815'}">{{$t("tabbar3")}}<!-- 行情 --></p>
        <p v-else :style="{color: $state.theme === 'black' ? '#FFFFFF' : '#656565'}">{{$t("tabbar3")}}</p>
      </mt-tab-item>
      <mt-tab-item id="mylist" :class="$store.state.select == '/mylist' ? 'on' : ''">
        <!-- <i v-if="$store.state.select == '/mylist'" class="iconfont icon-xuanze3" style="font-size: 0.40rem; padding-top: 0.04rem;"></i>
        <i v-else class="iconfont icon-xuanze" style="font-size: 0.40rem; padding-top: 0.04rem;"></i> -->
        <img
          class="foot-icon"
          v-if="$store.state.select == '/mylist'"
          :src="require(`../../../static/img/news/foot/zixuan-active.png`)" alt=""
        >
        <img
          class="foot-icon"
          v-else
          :src="require(`../../../static/img/news/foot/zixuan.png`)" alt=""
        >
        <p v-if="$store.state.select == '/mylist'" :style="{color: $state.theme === 'black' ? '#EE9827' : '#C11815'}">{{$t("tabbar4")}}<!-- 行情 --></p>
        <p v-else :style="{color: $state.theme === 'black' ? '#FFFFFF' : '#656565'}">{{$t("tabbar4")}}</p>

      </mt-tab-item>
      <mt-tab-item id="user" :class="$store.state.select == '/user' ? 'on' : ''">
        <!-- <i v-if="$store.state.select == '/user'" class="iconfont icon-peoplefill"></i>
        <i v-else class="iconfont icon-my"></i> -->
        <img
          class="foot-icon"
          v-if="$store.state.select == '/user'"
          :src="require(`../../../static/img/news/foot/user-active.png`)" alt=""
        >
        <img
          class="foot-icon"
          v-else
          :src="require(`../../../static/img/news/foot/user.png`)" alt=""
        >
        <p v-if="$store.state.select == '/user'" :style="{color: $state.theme === 'black' ? '#EE9827' : '#C11815'}">{{$t("tabbar5")}}<!-- 行情 --></p>
        <p v-else :style="{color: $state.theme === 'black' ? '#FFFFFF' : '#656565'}">{{$t("tabbar5")}}</p>

      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import eventBus from '@/event.js'
export default {
  data () {
    return {
      select: '',
      theme: 'black'
    }
  },
  mounted: function () {
    this.select = this.$store.state.select
  },
  watch: {
    select: {
      handler: function (newval, oldval) {
        // console.log("======"+this.$store.state.select)
        console.log(newval)
        let tabList = ['home', 'list', 'orderlist', 'mylist', 'user']
        if (tabList.includes(newval)) {
          this.$store.state.select = newval
          this.select = newval
          this.$router.push(newval)
        }
      }
    }
  }
}
</script>
<style lang="css" scoped>
  .black-theme{
    background-color: #040506;
  }
  .red-theme{
    background-color: #ffffff;
  }
  .foot-icon{
    width: 0.4rem;
    margin-top: 0.1rem;
    margin-bottom: 0.02rem;
  }
  /* .mint-tabbar > .mint-tab-item,
  .mint-tabbar > .mint-tab-item.is-selected {
    color: #ff9600;
  } */
  .mint-tabbar {
    /* background: #ffffff; */
    height: 0.97rem;
  }

  .footer .mint-tabbar {
    /* background: #13161b; */
    background: none;
    box-shadow: 0px 0px 10px #c7c7c7;
    box-shadow: 0px 0px 4px rgba(6, 0, 1, 0.2);
  }

  .mint-tab-item-label .iconfont {
    display: block;
    font-size: 0.5rem;
    margin-top: 0.05rem;
    height: 0.5rem;
  }

  .mint-tab-item-label .icon-recharge,
  .mint-tab-item-label .icon-rechargefill {
    font-size: 0.46rem;
  }

  .mint-tab-item-label .icon-xuanze,
  .mint-tab-item-label .icon-xuanze2 {
    font-size: 0.38rem;
    padding-top: 0.02rem;
  }

  .mint-tab-item-label .icon-chicang {
    font-size: 0.36rem;
    margin-top: 0.1rem;
  }
  .red-theme .mint-tabbar{
    background-color: #ffffff !important;
  }
  .black-theme .mint-tabbar{
    /* background-color: #040506 !important; */
    background: linear-gradient(#3A373E, #2C2A2F);
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
  }

</style>
