<template>
  <div class="wrapper">
    <div class="form-block page-part">
      <mt-field label="Mật khẩu cũ" placeholder="Vui lòng nhập mật khẩu ban đầu" type="text" v-model="objPassword.oldPwd"></mt-field>
      <mt-field label="mật khẩu mới" placeholder="Vui lòng nhập mật khẩu mới nhất" type="password" v-model="objPassword.newPwd"></mt-field>
      <mt-field label="Xác nhận mật khẩu" placeholder="Vui lòng nhập mật khẩu của bạn ở đây" type="password" v-model="objPassword.config"></mt-field>

    </div>
    <div class="btnbox">
      <span class="text-center btnok" @click="toSure"> {{$t("config")}}</span>
    </div>

  </div>
</template>

<script>
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'
export default {
  components: {},
  props: {},
  data () {
    return {
      objPassword: {
        oldPwd: '',
        newPwd: '',
        config: ''
      }
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    async toSure () {
      let flag = true
      const { oldPwd, newPwd, config } = this.objPassword
      for (const key in this.objPassword) {
        if (!this.objPassword[key]) {
          flag = false
        }
      }
      if (!flag) return Toast('Vui lòng nhập thông tin đầy đủ')
      console.log(config, newPwd)
      if (config != newPwd) {
        return Toast('Hai mật khẩu không khớp')
      }
      let opts = {
        oldPwd,
        newPwd
      }
      let data = await api.forgetPas(opts)
      if (data.status === 0) {
        Toast('sửa đổi thành công!')
        this.$router.back(-1)
      } else {
        Toast(data.msg)
      }
    },
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .rule-box {
    padding: 0.2rem 0.3rem;

    .title {
      font-size: 0.3rem;
      height: 0.5rem;
      line-height: 0.5rem;
      margin-bottom: 0.2rem;
    }

    ul {
      li {
        color: #999;
        line-height: 0.5rem;
      }
    }
  }
  /deep/.mint-cell-title{
    line-height: .3rem;
  }
  .transaction {
    // padding-bottom: 0.2rem;
  }
</style>
