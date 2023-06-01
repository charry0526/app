<template>
    <div>
       <canvas ref="canvas" id="canvas"></canvas>
    </div>
    <!-- <template>
  <div @touchmove.prevent class="box">
    <signature />
  </div>
</template>

<script>
import signature from '@/components/signature'
export default {
  components: {
    signature
  }

}
</script>
<style lang="less" scoped>

.box {
  margin: 0;
  place-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
}
</style> -->

</template>
<script>
import Blackboard from '@/utils/sign'
export default {
  data () {
    return {

    }
  },
  created () {
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.el = this.$refs.canvas
    //   this.el.width = document.documentElement.clientWidth
    //   this.el.height = document.documentElement.clientHeight
    //   /* eslint-disable no-new */
    //   new Blackboard(this.el)
    //   // console.log(this.el, Blackboard)
    // })
  },
  methods: {
  }

}
</script>
<style lang="less" scoped>
#canvas{
  width:100%;
  height:100%;
   /*ios，如果不行可以加一个透明遮罩层*/
    -webkit-touch-callout:none;
    touch-callout:none;

    /*安卓*/
    -webkit-user-select: none;
    user-select: none;
}
</style>
