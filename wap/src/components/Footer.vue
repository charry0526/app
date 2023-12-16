<template>
  <van-tabbar v-model="active" inactive-color="#fff " active-color="#f99420" class="footer_tabbar" id="footer_tabbar">
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
          name: "Bảng giá",
          active: require("@/assets/images/tabBar/home@x2.png"),
          inactive: require("@/assets/images/tabBar/home2@2.png"),
          path: "/home"
        },
        {
          id: 1,
          name: "Thông tin",
          active: require("@/assets/images/tabBar/new@x2.png"),
          inactive: require("@/assets/images/tabBar/new2@x2.png"),
          path: "/article"
        },
        {
          id: 2,
          name: "Tài sản",
          active: require("@/assets/images/tabBar/money@x2.png"),
          inactive: require("@/assets/images/tabBar/money2@x2.png"),
          path: "/property"
        },
        {
          id: 3,
          name: "Đặt lệnh",
          active: require("@/assets/images/tabBar/order@x2.png"),
          inactive: require("@/assets/images/tabBar/order2@x2.png"),
          path: "/orderlist"
        },
        {
          id: 4,
          name: "Khác",
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
    this.$nextTick(() => {
      console.log(2222)
      // 获取当前窗口的可视区域高度
      var viewportHeight = window.innerHeight;

      // console.log("可视区域高度：" + viewportHeight);
      //  获取窗口对象
      const windowObj = window;
      //  定义一个函数来处理可见区域高度变化
      function handleVisibilityHeightChange(event) {
        console.log("Visible  height:", event.target.innerHeight);
        var element = document.getElementById("footer_tabbar");
        element.style.top = `${(event.target.innerHeight || viewportHeight) - 50}px`;
      }
      windowObj.addEventListener("resize", handleVisibilityHeightChange);
      //  在页面加载完成后，立即调用handleVisibilityHeightChange
      windowObj.addEventListener("load", () => {
        handleVisibilityHeightChange(event);
      });
    });

  },

};
</script>


<style >
#app .body-box {
  height: 100% !important;
}

.footer_tabbar {
  position: fixed !important;
  z-index: 9999;
}
</style>
<style lang="less" scoped>
.footer_tabbar {
  height: 50px;
  background: url("../assets/images/tabBar/bottomBar@x2.png") no-repeat;
  background-size: 100% 100%;
  bottom: 0;
  // bottom: auto;
  width: 100%;
  left: 0;

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
