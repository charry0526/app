<style scoped>
.app-wrapper {
  background-color: #1a191f;
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
.article-list-detail > div:last-child{
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
</style>
<template>
  <div class="app-wrapper">
    <Header />
    <div class="page-main">
      <div class="article-list-container">
        <div class="article-list-detail" v-for="article in articleList" @click="pageNews(article.content)">
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
                <div style="display: flex; align-items: center; margin-right: 5px;">
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
    </div>

    <Footer />
  </div>
</template>


<script>
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import * as api from "@/axios/api";
import { apikey } from "@/utils/shuhaikeji";
import moment from "moment";
export default {
  name: "articlePage",
  components: {
    Footer,
    Header,
  },
  data() {
    return {
      page:1,
      limit:10,
      articleList: [],
      totalPage:0
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      let obj = {
        apikey,
        page:this.page,
        limit:this.limit,
      };
      const res = await api.allNewList(obj);
      try{
        res.data.map((item) => {
          let articleInfo = {
            title:item.title,
            content:item.maincontent,
            sourcenews:item.sourcenews,
            date:moment(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
            year:moment(item.created_at).format('YYYY'),
            day:moment(item.created_at).format('DD'),
            month:moment(item.created_at).format('MM'),
          }
          this.articleList.push(articleInfo);
        })
        this.totalPage = res.meta.total_count;
      }catch(error)
      {
        console.log(error);
      }
    },
    pageNews(content) {
      this.$router.push({
        path: '/news'
      })
      window.sessionStorage.setItem('newDetail', content)
    },
  },
};
</script>
