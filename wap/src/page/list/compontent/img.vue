<template>
  <div class="img">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">1y</mt-tab-item>
      <mt-tab-item id="2">6m</mt-tab-item>
      <mt-tab-item id="3">3m</mt-tab-item>
      <!-- <mt-tab-item id="4">YTD</mt-tab-item> -->
      <mt-tab-item id="4">1d</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <chart5 :selected="selected" :data="data" :code="code" :id="1"></chart5>
      </mt-tab-container-item>
      
      <mt-tab-container-item id="2">
        <chart5 :selected="selected" :data="data" :code="code" :id="2"></chart5>
      </mt-tab-container-item>

      <mt-tab-container-item id="3">
        <chart5 :selected="selected" :data="data" :code="code" :id="3"></chart5>
      </mt-tab-container-item>

      <!-- <mt-tab-container-item id="4">
        <chart5 :selected="selected" :data="data" :code="code"></chart5>
      </mt-tab-container-item> -->

      <mt-tab-container-item id="4">
        <chart5 :selected="selected" :data="data" :code="code" :id="4"></chart5>
      </mt-tab-container-item>

      <!-- <mt-tab-container-item id="6">
        <chart5 :selected="selected" :data="data" :code="code" :id="6"></chart5>
      </mt-tab-container-item> -->
      
      <!-- <mt-tab-container-item id="2">
        <chart2 :selected="selected" :code="code"></chart2>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <chart3 :selected="selected" :code="code"></chart3>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <chart4 :selected="selected" :code="code"></chart4>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <chart5 :selected="selected" :code="code"></chart5>
      </mt-tab-container-item> -->
    </mt-tab-container>
  </div>
</template>

<script>
import chart1 from './chart.vue'
import chart2 from './chart-1.vue'
import chart3 from './chart-2.vue'
import chart4 from './chart-3.vue'
import chart5 from './chart-day.vue'

import * as api from '@/axios/api'

export default {
  components: {
    chart1,
    chart2,
    chart3,
    chart4,
    chart5
  },
  props: {
    imgList: {
      type: Object,
      default: function () {}
    },
    code: {
      type: String,
      default: function () {}
    }
  },
  data () {
    return {
      selected: '1',
      data:{},
    }
  },
  watch: {
    selected () {
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.loadData();
  },
  methods: {
    async loadData(){
      this.data = await api.getHistory(this.code)

    }
  }
}
</script>
<style lang="less" scoped>
  .mint-navbar {
    background: none;

    .mint-tab-item.is-selected {
      border: none;
    }
  }

  .img {
    min-height: 5rem;
    width: 100%;
    height: 100%;
  }
</style>
