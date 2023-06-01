<template>
  <div @touchmove.prevent class="box">
    <h1 class="title">电子签名</h1>
    <signature ref="signature" class="signature" />
    <div class="btn-box">
      <div @click="reset" class="reset">重置</div>
      <div @click="sava" class="baocun">保存</div>
    </div>
  </div>
</template>

<script>
import signature from '@/components/signature'
import Blackboard from '@/utils/sign'

export default {
  components: {
    signature
  },
  data () {
    return {
      blackboard: null,
      el: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.el = this.$refs.signature.$refs.canvas
      this.el.width = document.documentElement.clientWidth
      this.el.height = document.documentElement.clientHeight / 1.5
      this.blackboard = new Blackboard(this.el)
    })
  },
  methods: {
    reset () {
      this.blackboard.clear()
    },
    sava () {
      this.blackboard.downLoadImage(this.el, 'sign')
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  height: 100vh;
}
.title {
  margin: 0 auto 0.5rem;
  padding-top: 0.5rem;
  text-align: center;
  font-size: 0.5rem;
  font-weight: 700;
}
.btn-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.5rem;
}
.reset {
  width: 2rem;
  height: 0.66rem;
  line-height: 0.66rem;

  background-color: gray;
  border-radius: 0.33rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
}
.baocun {
  width: 2rem;
  height: 0.66rem;
  line-height: 0.66rem;

  background-color: #024da1;
  border-radius: 0.33rem;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
}
</style>
