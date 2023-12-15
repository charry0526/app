<template>
  <div class="app-wrapper">
    <div class="page-main">
      <div class="about_top">
        <div class="about_top_logo"><img  class="logo" src="../../assets/img/logo-03.png" alt=""></div>
        <div class="about_top_info">
          <div class="name">Công ty CP CK Charles Schwab Việt Nam</div>
          <div class="dec">
            Charles Schwab Việt Nam là công ty tiên phong trong lĩnh vực giao dịch trực tuyến cho các nhà đầu tư cá nhân và hiện là một phần của Charles Schwab Corporation – tập đoàn cung cấp dịch vụ tài chính và quản lý tài sản lớn Top 5 trên thế giới được công nhận về khả năng quản lý tài sản vượt trội, dịch vụ tư vấn, đội ngũ chuyên gia phân tích thị trường và hàng loạt những nghiên cứu đột phá. Với mục tiêu nâng cấp trải nghiệm giao dịch của khách hàng bằng sáng tạo công nghệ đỉnh cao, Charles Schwab đang xây dựng trên các nền tảng và giải pháp dịch vụ kỹ thuật số mạnh mẽ của mình để giúp khách hàng chuyển đổi và phát triển trong nền kinh tế kỹ thuật số mới.
          </div>
        </div>
      </div>
<!--      公司信息描述-->
      <div class="company">Mô tả thông tin công ty</div>
      <div class="companyInfo tel">1900998882</div>
      <div class="companyInfo email">cskh@stockvn-schwab.com</div>
      <div class="companyInfo url">www.xxxx.com</div>
      <div class="companyInfo add">
        Landmark 81 có địa chỉ tại số 720A Điện Biên Phủ, Phường 22, quận Bình Thạnh, Thành phố Hồ Chí Minh.
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

  .logo {
    width: 93px;
    height: 70px;
   // background: #ff7b23;
    border-radius: 2px;
    line-height: 28px;
    text-align: center;
    font-size: 16px;
  }
  .about_top {
    margin-top: 30px;
    display: flex;
    align-items: center;

    .about_top_logo {
      height: 68px;
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
