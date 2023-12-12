<template>
  <div class="app-wrapper">
    <NavBar />
    <div class="page-main">
      <div class="about_top">
        <div class="about_top_logo">logo</div>
        <div class="about_top_info">
          <div class="name">APP名称 3.28.2</div>
          <div class="dec">
            这是一个APP的功能描述，最最多2行，知道吗知道吗知道吗知道吗知道吗知道吗知道吗知道吗知道吗
          </div>
        </div>
      </div>
      <div class="company">这是个公司名称</div>
      <div class="companyInfo tel">400-123-455</div>
      <div class="companyInfo email">002312123@qq.com</div>
      <div class="companyInfo url">www.xxxx.com</div>
      <div class="companyInfo add">
        广东省广州市天河区林和西路888号中国市长大厦88楼88号
      </div>
    </div>
  </div>
</template>
  
<script>
// import { NavBar } from "../../components/index.js";
import NavBar from "../../components/NavBar";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
  },
  methods: {},
};
</script>

<style scoped></style>
<style lang="less" scoped>
@import "../../assets/styles/index.less";

.page-main {
  padding: 0 15px;

  .about_top {
    margin-top: 30px;
    display: flex;
    align-items: center;

    .about_top_logo {
      height: 68px;
      width: 68px;
      background: #ff7b23;
      text-align: center;
      line-height: 68px;
      border-radius: 10px;
      margin-right: 15px;
    }

    .about_top_info {
      flex: 1;

      .name {
        font-size: 16px;
        padding-bottom: 8px;
      }

      .dec {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* 设置最大显示行数 */
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        line-height: 20px;
        opacity: 0.7;
        font-size: 12px;
      }
    }
  }

  .company {
    margin-top: 32px;
    font-size: 16px;
    color: rgb(255, 155, 46);
    margin-bottom: 15px;
  }

  .companyInfo {
    padding-left: 22px;
    font-size: 14px;
    margin-bottom: 10px;

    &.tel {
      background: url("../../assets/images/about/telephone@x2.png") no-repeat;
      background-size: 14px 14px;
    }

    &.email {
      background: url("../../assets/images/about/email@x2.png") 0 2px no-repeat;
      background-size: 14px 14px;
    }

    &.url {
      background: url("../../assets/images/about/url@x2.png") 0 3px no-repeat;
      background-size: 14px 14px;
    }

    &.add {
      background: url("../../assets/images/about/address@x2.png") 0 5px no-repeat;
      background-size: 14px 14px;
      line-height: 24px;
    }
  }
}
</style>
  