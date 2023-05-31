<template>
    <div>
       <canvas ref="canvas" id="canvas" width="300" height="300"></canvas>
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
    this.$nextTick(() => {
      this.el = this.$refs.canvas
      new Blackboard(this.el)
      // console.log(this.el, Blackboard)
    })
  },
  methods: {
  }

}
</script>
<style lang="less" scoped>
</style>
