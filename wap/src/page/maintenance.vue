<template>
    <div :class="`wrapper ${$state.theme === 'red' ? 'red-theme' : 'black-theme'}`">
        <!-- <img src="../../static/img/wh.jpg" alt=""> -->
        <img :src="imgUrl" alt="">
    </div>
</template>
<script>
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'
import { getFundsTypeList } from '../axios/api'

export default {
    components: {
    },
    props: {},
    data() {
        return {
            imgUrl: '',
        }
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted: function () {//可操作dom元素
        this.$nextTick(function () {
            //获取传递的参数
            console.log('111',this.$route.query.imgUrl)
            if(this.$route.query.imgUrl){
                this.imgUrl = this.$route.query.imgUrl
            }
        })
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
img{
    width: 100vw;
    height: 100%;
    position: absolute;
}
</style>
  