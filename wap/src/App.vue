<template>
  <div
    id="app"
    :class="`${$state.theme === 'red' ? 'red-theme' : 'black-theme'}`"
  >
    <div :class="`header-box`" v-if="hasHeader">
      <mt-header :title="title">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        <template v-if="iconRight == 'search'">
<!--          <img
            slot="right"
            class="search-right"
            src="./assets/ico/fangdajing.png"
            alt=""
          />-->
        </template>
      </mt-header>
    </div>
    <div class="body-box" id="myDiv">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
html,body{
  background-color: #20272e;
}
</style>
<script>
export default {
  name: 'App',
  created () {
    let title = this.$route.meta.title || '首页'
    this.title = title

    if (this.$route.meta.hasHeader) {
      this.hasHeader = true
    } else {
      this.hasHeader = false
    }
    if (this.$route.meta.iconRight) {
      this.iconRight = this.$route.meta.iconRight
    } else {
      this.iconRight = 'default'
    }
    // this.$store.state.className = window.localStorage.getItem('styleName')?window.localStorage.getItem('styleName'):'red'
  },
  watch: {
    $route (val) {
      let title = val.meta.title || '首页'
      this.title = title

      if (val.meta.iconRight) {
        this.iconRight = val.meta.iconRight
      } else {
        this.iconRight = 'default'
      }
      if (val.meta.hasHeader) {
        this.hasHeader = true
      } else {
        this.hasHeader = false
      }
    }
  },
  data () {
    return {
      title: '首页',
      hasHeader: false,
      iconRight: 'default',
      network: true // 默认有网
    }
  },

  mounted () {
    if ('addEventListener' in window) {
      // 当前浏览器支持addEventListener方法
      // 检测断网
      if ('ononline' in window) {
        // 当前浏览器支持ononline属性
        window.addEventListener('online', () => {
          this.network = true
          this.$message.success('mạng trở lại bình thường')
        })
      } else {
        console.log('当前浏览器不支持ononline属性')
      }

    //   if ('onoffline' in window) {
    //     window.addEventListener('offline', () => {
    //       this.network = false
    //       this.$message.error('mạng bị ngắt kết nối')
    //     })
    //   } else {
    //     console.log('当前浏览器不支持onoffline属性')
    //   }
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .header-box {
    width: 100%;
    height: 1rem;
    /deep/.mint-header {
      height: 100%;
      background-color: rgba(20, 45, 55, 0.3);
      .is-left {
        .mintui {
          font-size: 20px;
        }
      }
      .mint-header-title {
        font-size: 0.36rem;
        color: rgba(255, 255, 255, 1);
      }
    }
    button {
      outline: none;
    }
  }
  .body-box {
    width: 100%;
    height: calc(100% - 1rem);
    box-sizing: border-box;
    overflow-y: auto;

  }
  &.red-theme {
    background: #e9e9e9;
    /deep/.mint-header {
      background: none;
      .mint-header-title {
        font-size: 0.36rem;
        color: #212121;
      }
      .mintui {
        color: #212121;
      }
    }
  }
  &.black-theme {
    // background: #16171d;
    background:#252429;//#2A282D;
  }
}
.search-right {
  width: 0.3rem;
  height: 0.3rem;
}
.mint-search-list {
  position: relative !important;
}
</style>
<style>
.van-toast{
  overflow-wrap: break-word !important;
  white-space:normal !important;
  word-break: normal !important;
}
</style>
