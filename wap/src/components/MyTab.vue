<template>
  <div class="tabBox">
    <van-tabs v-model="active" class="myTab" background="#29282e" title-active-color="#e8972c" title-inactive-color="#fff"
      color="yellow" type="line" @click="onTabClick">
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id"></van-tab>
    </van-tabs>
    <div class="tabChildren" v-if="tabChildrenType === 'nav' && tabChildrenList.length">
      <div class="tabChildrenItem" v-for="(item, index) in tabChildrenList"
        :class="index === childrenActive[active] ? 'active' : ''" :key="item.navID"
        @click="childrenTabClick(index, item)">
        {{ item.name }}
      </div>
    </div>
    <div class="tabChildren isContent" :class="listType" v-if="tabChildrenType === 'content' && tabChildrenList.length">
      <div class="isContent_list" v-for="item in tabChildrenList" :key="item.navID">
        <div class="isContent_item">
          <span v-if="item.name_price">{{ item.name }}</span>
          <span>{{ item.plName }}</span>
        </div>
        <div class="isContent_item">
          <span class="text_red">{{ item.name_price }}</span>
          <span class="text_green">{{ item.pl_price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
export default {
  name: "MyTab",
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    listType: {
      type: String,
      default: "list",
    },
    activeFromIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: 0, //一级tab索引
      childrenActive: {}, //二级索引,这里用对象表示，初始化都是{[0]:0,[1]:0,,[2]:0}， 例如{[0]:0,[1]:1,,[2]:1} 第一个二级菜单下的第一个，第二个二级菜单下的第二个，第三个二级菜单下的第二个
      tabChildrenList: [], //二级菜单数据
      tabChildrenType: "", //二级菜单展现方式
    };
  },
  watch: {
    activeFromIndex(newVal, oldVal) {
      this.active = newVal
      this.tabChildrenType = this.tabList[this.active].childrenType;
      if (this.tabChildrenType) {
        this.tabChildrenList = this.tabList[this.active].children;
      }
      if (sessionStorage.getItem('childrenTabItemIndex')) {
        this.childrenActive = JSON.parse(sessionStorage.getItem('childrenTabItemIndex'))
      }
    },
  },
  mounted() {
    this.init(); //初始化二级数据
    //初始化二级的
    this.tabList.forEach((i, index) => {
      this.childrenActive[index] = 0;
    });
    console.log('tabList', this.tabList)
  },
  methods: {
    init(index) {
      //默认显示传递过来的tabList第一个的二级数据
      this.tabChildrenType = this.tabList[index || this.active].childrenType;
      if (this.tabChildrenType) {
        this.tabChildrenList = this.tabList[index || this.active].children;
      }
    },
    onTabClick(index, title) {
      //一级Tab，这里需要判断，是否有二级，若是有二级且是nav类型，这emit触发事件则在二级菜单
      this.init(index);
      let oneTabItemData = this.tabList[index];
      if (this.tabList[index].childrenType === "nav") {
        // console.log("二级tab可点击");
        let childrenTabIndex = this.childrenActive[index];
        let childrenTabItemData =
          this.tabList[index].children[childrenTabIndex];
        this.$emit("tabHandelClick", oneTabItemData, childrenTabItemData);
      } else {
        console.log("二级tab不可点击或是无二级");
        this.$emit("tabHandelClick", oneTabItemData);
      }
    },
    childrenTabClick(index, item) {
      //二级tab
      this.$set(this.childrenActive, this.active, index);
      this.childrenActive = JSON.parse(JSON.stringify(this.childrenActive));
      sessionStorage.setItem('childrenTabItemIndex', JSON.stringify(this.childrenActive));
      //传递数据给父元素
      let oneTabItemData = this.tabList[this.active];
      this.$emit("tabHandelClick", oneTabItemData, item);
    },
  },
};
</script>
    
<style lang="less" scoped>
.tabBox {
  margin-top: 10px;

  .myTab {
    border-bottom: 1px solid #707070;
  }

  .tabChildren {
    padding: 10px 15px 0 15px;
    flex-wrap: wrap;
    display: flex;
    border-bottom: 1px solid #707070;

    .tabChildrenItem {
      display: flex;
      height: 30px;
      align-items: center;
      font-size: 12px;
      background: #39383e;
      padding: 0 10px;
      border-radius: 20px;
      margin-right: 10px;
      margin-bottom: 10px;

      &.active {
        background: #fb9702;
        color: #fff;
      }
    }

    &.isContent {
      padding-bottom: 10px;

      &.MyCard {
        border: 0;
      }

      .isContent_list {
        flex: 1;
        display: flex;

        .isContent_item {
          font-size: 12px;

          span {
            padding: 0 8px 12px 0;
            display: inline-block;
            white-space: nowrap;

            &:nth-child(2) {
              padding-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.van-tabs__wrap {
  height: 37px !important;

  .van-tabs__nav {
    .van-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      &.van-tab--active {
        background: #3d3c41;
        border-radius: 8px 8px 0 0;
        border-bottom: 2px solid #e8972c;
      }
    }

    .van-tabs__line {
      display: none;
    }
  }
}
</style>