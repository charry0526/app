<template>
  <div class="wrap">
    <iframe
      :height="height"
      id="iframe"
      :src="address"
      @load="loaded"
      frameborder="0"
    />
  </div>
</template>
<script>
import * as api from '@/axios/api'

export default {
  async created () {
    await this.getAddress()
    // await this.couHeigt()
  },
  data () {
    return {
      address: '',
      height: null
    }
  },
  methods: {
    async couHeigt () {
      console.log(2)
      const iframe = document.querySelector('#iframe')
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', function () {
          // iframe加载完毕以后执行操作
          console.log(
            'iframe已加载完毕',
            document.getElementsByTagName('iframe')[0]
          )
        })
      } else {
        iframe.onload = function () {
          setTimeout(() => {
            // 获取第三方页面的高度
            console.log(
              'iframe已加载完毕!',
              document.getElementsByTagName('iframe')[0].ownerDocument.body
                .clientHeight
            )
            this.height =
              document.getElementsByTagName('iframe')[0].ownerDocument.body
                .clientHeight + 200
          }, 1000)
        }
      }
    },
    async getAddress () {
      this.address = ''
      // 'https://www.baidu.com/'
      // 'https://uniapp.dcloud.net.cn/api/other/authorize.html#authorize'
      const res = await api.getCusAddress()
      if (res.status === 0) {
        this.address = res.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  height: calc(100vh - 50px);
}
#iframe {
  width: 100%;
  height: 100%;
}
</style>
