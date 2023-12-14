<template>
  <div class="app-wrapper">
    <div class="searchBox">
      <van-search v-model="keyword" show-action placeholder="Mã chứng khoán hoặc chính tả đơn giản" @input="handleSearchInput(keyword)"
        @cancel="onCancel" background="none" :clearable="true" :autofocus="true">
        <template #action>
<!--          关闭-->
          <div @click="onCancel">Khóa</div>
        </template>
      </van-search>
    </div>
    <div class="page-main">
      <div class="infinite-list-wrapper" ref="wrapper">
        <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <div class="searchItem" v-for="(item, index) in searchList" :key="index" @click="searchItemClick">
            {{ item.name }}
          </div>
        </div>
        <p v-if="loading" class="infinite-list-wrapper_tips"><van-loading size="14px">Đang tải...</van-loading></p>
        <p v-if="noMore" class="infinite-list-wrapper_tips">Không có nhiều hơn</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Toast, Empty, Loading } from "vant";
import * as api from "@/axios/api";

import NavBar from "../../components/NavBar";
import { getStock } from "../../axios/api";

Vue.use(Search);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(Loading);

export default {
  data() {
    return {
      keyword: "",
      searchList: [],
      inputTimer: {},
      pageNum: 1,
      loading: false,
      noMore: false,
      lastPage: 0,
      pageSize: 300
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  components: {
    NavBar,
  },
  methods: {
    handleSearchInput() {
      clearTimeout(this.inputTimer.value);
      this.pageNum = 1;
      this.inputTimer.value = setTimeout(this.onSearch, 700);
    },
    onSearch(pageNum) {
      this.loading = true;
      let opt = {
        keyWords: this.keyword,
        pageNum: pageNum || this.pageNum,
        pageSize: this.pageSize
      }
      let data = api.getStock(opt);
      data.then(result => {
        this.loading = false;
        if (result.status === 0) {
          this.lastPage = Math.ceil(result.data.total / this.pageSize)
          if (this.searchList.length) {
            this.searchList = result.data.list
          } else {
            this.searchList.push(...result.data.list)
          }
        } else {
          Toast(result.msg)
        }
      });

    },
    onCancel() {
      this.$router.go(-1);
    },
    searchItemClick(item) {
      console.log(item);
    },
    //异步加载数据
    load() {
      let pass = false;
      if (
        this.pageNum === this.lastPage
      ) {
        pass = true;
      }

      if (pass) {
        this.onSearch(this.pageNum)
        this.loading = false;
        this.noMore = true;
        return;
      }

      this.onSearch(this.pageNum)
      this.pageNum += 1
      this.loading = false;
    },
  },

};
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";
.infinite-list-wrapper_tips{
  text-align: center;
  font-size: 14px;
}
.page-main {
  background: #1a191e;
  padding: 10px 0;

  .searchItem {
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
  }
}

.searchBox {
  background: #1a191e;
}
</style>
<style >
#app .body-box {
  height: 100vh !important;
}
</style>
