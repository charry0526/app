<template>
  <van-tabbar v-model="active" inactive-color="#fff " active-color="#f99420" class="footer_tabbar">
    <van-tabbar-item :to="item.path" v-for="item in navList" :key="item.id">
      <span>{{ item.name }}</span>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  name: "Footer",
  data() {
    return {
      active: 0,
      navList: [
        {
          id: 0,
          name: "首页",
          active: require("@/assets/images/tabBar/home@x2.png"),
          inactive: require("@/assets/images/tabBar/home2@2.png"),
          path: "/home"
        },
        {
          id: 1,
          name: "资讯",
          active: require("@/assets/images/tabBar/new@x2.png"),
          inactive: require("@/assets/images/tabBar/new2@x2.png"),
          path: "/article"
        },
        {
          id: 2,
          name: "资产",
          active: require("@/assets/images/tabBar/money@x2.png"),
          inactive: require("@/assets/images/tabBar/money2@x2.png"),
          path: "/property"
        },
        {
          id: 3,
          name: "订单",
          active: require("@/assets/images/tabBar/order@x2.png"),
          inactive: require("@/assets/images/tabBar/order2@x2.png"),
          path: "/orderlist"
        },
        {
          id: 4,
          name: "更多",
          active: require("@/assets/images/tabBar/more@X2.png"),
          inactive: require("@/assets/images/tabBar/more2@x2.png"),
          path: "/more"
        }
      ]
    };
  },
  mounted() {
    const path = this.$route.path;
    for (let i = 0; i < this.navList.length; i++) {
      if (path == this.navList[i].path) {
        this.active = this.navList[i].id
        break
      }
    }
  },
};
</script>


<style >
#app .body-box {
  height: 100% !important;
}
</style>
<style lang="less" scoped>
.footer_tabbar {
  height: 44px;
  background: url("../assets/images/tabBar/bottomBar@x2.png") no-repeat;
  background-size: 100% 100%;

  .van-tabbar-item {
    background: none;

    .van-tabbar-item__icon {
      img {
        height: 18px;
        width: 18px;
      }
    }

    .van-tabbar-item__text {
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
