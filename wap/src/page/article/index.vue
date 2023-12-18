<style scoped>
@import "../../assets/styles/index.less";
.app-wrapper {
  background-color: #1a191f !important;
}
.header{
  background-color: #29282e;
}
.article-list-container {
  padding: 0 15px;
  margin-top: 15px;
  background-color: #29282e;
  font-size: 12px;
  border-radius: 15px;
  color: #ffffff;
}
.article-list-detail {
  display: flex;
  padding: 8px 0;
  justify-content: flex-start;
  align-items: baseline;
  border-bottom: 1px solid rgb(76, 75, 83);
}
.article-detail-date {
  text-align: right;
  margin-right: 8px;
}
.article-list-detail .month {
  color: #f99420;
  white-space: nowrap;
}
.article-list-detail .source-date {
  color: #f99420;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.article-list-detail .source-date > div {
  align-items: center;
  display: flex;
  height: 18px;
  line-height: 18px;
}
.article-list-detail .source-date .icon-img-source {
  max-height: 100%;
}
.article-list-detail .source-date .icon-img-date {
  max-height: 14px;
}
.article-list-detail > div:last-child {
  flex: 1;
}
.article-detail-date-time {
  color: rgb(105 105 107);
}
.article-detail-title {
  font-size: 14px;
  line-height: 22px;
  display: -webkit-box; /* Safari */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.infinite-list-wrapper_tips {
  text-align: center;
  font-size: 14px;
  margin: 15px 0;
}
</style>
<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main">
      <div class="article-list-container infinite-list-wrapper" ref="wrapper">
        <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <div
            class="article-list-detail"
            v-for="(article, index) in articleList"
            @click.stop="pageNews(article.content)"
            :key="index"
          >
            <div class="article-detail-date">
              <div>{{ article.year }}</div>
              <div class="month">
                <span style="font-size: 20px; font-weight: bold">{{
                  article.month
                }}</span>
                / <span>{{ article.day }}</span>
              </div>
            </div>
            <div>
              <div class="article-detail-title">{{ article.title }}</div>
              <div class="source-date">
                <div>
                  {{ article.sourcenews }}
                </div>
                <div class="">
                  <div
                    style="display: flex; align-items: center; margin-right: 5px;"
                  >
                    <img
                      class="icon-img-date"
                      src="../../assets/images/news/time@x2.png"
                    />
                  </div>
                  <div class="article-detail-date-time">
                    {{ article.date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="loading" class="infinite-list-wrapper_tips"><van-loading size="14px">loading...</van-loading></p>
        <p v-if="noMore" class="infinite-list-wrapper_tips">没有更多了</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Vue from "vue";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import * as api from "@/axios/api";
import { apikey } from "@/utils/shuhaikeji";
import moment from "moment";
import { Search, Toast, Empty, Loading } from "vant";
Vue.use(Search);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(Loading);

export default {
  name: "articlePage",
  components: {
    Footer,
    Header
  },
  data() {
    return {
      page: 1,
      limit: 10,
      articleList: [],
      // totalPage: 0,
      loading: false,
      noMore: false,
      lastPage: 0
    };
  },
  mounted() {
    // this.getArticleList()
  },
  computed: {
    // noMore() {
    //   return this.count >= 60;
    // },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    async getArticleList(page) {
      this.loading = true;
      let obj = {
        apikey,
        page: page || this.page,
        limit: this.limit
      };
      const res = await api.allNewList(obj);
      let articleInfo=[]
      res.data.map(item => {
        articleInfo.push({
          title: item.title,
          content: item.maincontent,
          sourcenews: item.sourcenews,
          date: moment(item.created_at).format("DD/MM/YYYY hh:mm:ss"),
          year: moment(item.created_at).format("YYYY"),
          day: moment(item.created_at).format("DD"),
          month: moment(item.created_at).format("MM")
        });
      });

      if (this.articleList.length) {
        this.articleList.push(...articleInfo);
      } else {
        this.articleList = articleInfo;
      }
      this.lastPage = res.meta.total_count;
      this.loading = false;
    },
    pageNews(content) {
      console.log(content);
      window.sessionStorage.setItem("newDetail", content);
      this.$router.push({
        path: "/news"
      });
    },
    //异步加载数据
    load() {
      let pass = false;
      if (this.page === this.lastPage) {
        pass = true;
      }

      if (pass) {
        this.onSearch(this.page);
        this.loading = false;
        this.noMore = true;
        return;
      }

      this.getArticleList(this.page);
      this.page += 1;
    }
  }
};
</script>
