<template>
<!--  关于我们-->
  <van-nav-bar title="Theo dõi chúng tôi" left-arrow class="navbar" @click-left="onClickBack" />
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);
export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    onClickBack() {
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="less" >
.navbar {
  background: none;
  padding: 0;
  margin: 0;
  display: block;
}
</style>
<style lang="less">
.van-nav-bar__content {
  .van-nav-bar__left {
    padding-left: 8px;

    .van-icon {
      color: rgb(242, 241, 227) !important;
    }
  }

  .van-nav-bar__title {
    color: rgb(242, 241, 227) !important;
    font-size: 14px;
  }
}
</style>
