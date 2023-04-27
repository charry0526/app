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
    if (this.$state.theme == 'red') {
      document.body.classList.remove('black-bg')
      document.body.classList.add('red-bg')
    }
  },
  beforeDestroy () {
    if (this.$state.theme == 'red') {
      document.body.classList.remove('red-bg')
      document.body.classList.add('black-bg')
    }
  },

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
  display: block;
  max-width: 100% !important;
}
/deep/ img {
  max-width: 100% !important;
  object-fit: contain;
}
</style>
