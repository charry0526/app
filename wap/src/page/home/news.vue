<template>
  <div class="contain">
    <div v-html="newDetail">

    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      newDetail: ''
    }
  },
  created () {
    this.newDetail = window.sessionStorage.getItem('newDetail')
    // console.log(this.newDetail, 'this.newDetail ')
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<style lang="less" scoped>
.contain {
  width: 92%;
  margin: 0 auto;
}
/deep/ p {
  font-size: 0.24rem;
  background: none;
  overflow: inherit;
  padding-top: .2rem;
  line-height: 0.35rem;
}
/deep/ a{
  white-space: pre-wrap;
  word-wrap: break-word;
}
/deep/ div{
  margin-bottom: .3rem;
}
/deep/ table{
  max-width: 100%;
}
/deep/img {
  max-width: 100%;
  object-fit: contain;
}
</style>
