//首页tabList
export const tabList = [
  {
    id: "0",
    name: "关注列表"
    // childrenType: "content",
    // children: [
    //   {
    //     name: "持有成本",
    //     name_price: "353,961,300",
    //     plName: "P/L",
    //     pl_price: "-42,124,220",
    //   },
    //   {
    //     name: "持有市场价",
    //     name_price: "353,961,300",
    //     plName: "P/L",
    //     pl_price: "-42,124,220",
    //   },
    // ],
  },
  {
    id: "1",
    name: "市场列表",
    childrenType: "nav", //是否有二级菜单， 二级的类型 nav为标题形式  content为文字内容
    children: [
      {
        navID: "0",
        name: "上海市场"
      },
      {
        navID: "2",
        name: "北京市场"
      },
      {
        navID: "3",
        name: "广州市场"
      },
      {
        navID: "4",
        name: "武汉市场"
      },
      {
        navID: "5",
        name: "海口市场"
      }
    ]
  },
  {
    id: "2",
    name: "福利列表",
    childrenType: "nav", //是否有二级菜单， 二级的类型
    children: [
      {
        navID: "10",
        name: "ESOP"
      },
      {
        navID: "22",
        name: "状态列表"
      }
    ]
  }
];

//order tabList
export const orderTabList = [
  {
    id: "0",
    name: "持有列表",
    childrenType: "content",
    children: [
      {
        name: "持有成本",
        name_price: "353,961,300",
        plName: "P/L",
        pl_price: "-42,124,220"
      },
      {
        name: "持有市场价",
        name_price: "353,961,300",
        plName: "P/L",
        pl_price: "-42,124,220"
      }
    ]
  },
  {
    id: "2",
    name: "售出列表",
    childrenType: "content",
    children: [
      {
        name: "持有成本",
        name_price: "353,961,300",
        plName: "P/L",
        pl_price: "-42,124,220"
      },
      {
        name: "持有市场价",
        name_price: "",
        plName: "P/L",
        pl_price: "-42,124,220"
      }
    ]
  }
];

//首页stockList
export const stockList = [
  {
    id: "0",
    title: "ABC",
    subtitle: "1.04k",
    price: "1052.73",
    percentage: "10.91",
    increase: "19.78"
  },
  {
    id: "23",
    title: "ABC",
    subtitle: "1.04k",
    price: "1052.73",
    percentage: "0.91",
    increase: "9.78"
  },
  {
    id: "1",
    title: "CASD",
    subtitle: "2.04k",
    price: "1052.73",
    percentage: "0.91",
    increase: "9.78"
  },
  {
    id: "2",
    title: "ABC",
    subtitle: "1.04k",
    price: "1052.73",
    percentage: "0.91",
    increase: "9.78"
  },
  {
    id: "3",
    title: "ABC",
    subtitle: "1.04k",
    price: "1052.73",
    percentage: "0.91",
    increase: "9.78"
  }
];

//Footer
export const navList = [
  {
    id: "0",
    name: "首页",
    active: require("@/assets/images/tabBar/home@x2.png"),
    inactive: require("@/assets/images/tabBar/home2@2.png"),
    path: "/home"
  },
  {
    id: "1",
    name: "資訊",
    active: require("@/assets/images/tabBar/new@x2.png"),
    inactive: require("@/assets/images/tabBar/new2@x2.png"),
    path: "/article"
  },
  {
    id: "2",
    name: "资产",
    active: require("@/assets/images/tabBar/money@x2.png"),
    inactive: require("@/assets/images/tabBar/money2@x2.png"),
    path: "/property"
  },
  {
    id: "3",
    name: "订单",
    active: require("@/assets/images/tabBar/order@x2.png"),
    inactive: require("@/assets/images/tabBar/order2@x2.png"),
    path: "/order"
  },
  {
    id: "4",
    name: "更多",
    active: require("@/assets/images/tabBar/more@X2.png"),
    inactive: require("@/assets/images/tabBar/more2@x2.png"),
    path: "/more"
  }
];

//关注列表
export const watchListData = {
  tabList: [
    {
      name: "商品名称",
      isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
    },
    {
      name: "市场价格",
      isChange: 0
    },
    {
      name: "涨幅",
      isChange: 1
    },
    {
      name: "商品金额",
      isChange: 0
    },
    {
      name: "操作",
      isChange: 0,
      actionClass: "del" //操作类型，删除  购买
    }
  ],
  watchListData: {
    total: 70, //总数
    list: [
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      },
      {
        id: "21",
        name: "BAB12", //商品名称
        price: "24.10", //市场价格
        percentage: "0.91", //百分比
        percentage_price: "100", //百分比金额  与百分比切换的值
        product_price: "200"
      }
    ]
  }
};

//市场列表
export const marketListData = {
  tabList: [
    {
      name: "商品名称",
      isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
    },
    {
      name: "市场价格",
      isChange: 0
    },
    {
      name: "涨幅",
      isChange: 1
    },
    {
      name: "商品金额",
      isChange: 0
    }
  ],
  market: {
    total: 45, //总数
    list: [
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      },
      {
        id: "21",
        name: "ALIBABA12", //商品名称
        price: "224.10", //市场价格
        percentage: "0.61", //百分比
        percentage_price: "324", //百分比金额  与百分比切换的值
        product_price: "142"
      }
    ]
  }
};

//福利列表--ESOP
export const welfareESOP = {
  tabList: [
    {
      name: "商品名称",
      isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
    },
    {
      name: "市场价格",
      isChange: 0
    },
    {
      name: "涨幅",
      isChange: 1
    },
    {
      name: "操作",
      isChange: 0,
      actionClass: "buy" //操作类型，删除  购买
    }
  ],
  welfare: {
    total: 35, //总数
    list: [
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      },
      {
        id: "21",
        name: "TX110", //商品名称
        price: "26.50", //市场价格
        percentage: "0.49", //百分比
        percentage_price: "147" //百分比金额  与百分比切换的值
      }
    ]
  }
};

//福利列表--状态列表
export const stateList = {
  tabList: [
    {
      name: "商品名称",
      isChange: 0 //0表示表头不可点击切换 例如百分比和金额切换
    },
    {
      name: "买入价",
      isChange: 0
    },
    {
      name: "保证金",
      isChange: 0
    },
    {
      name: "购买数量",
      isChange: 0
    },
    {
      name: "倍数",
      isChange: 0
    },
    {
      name: "状态",
      isChange: 0
    }
  ],
  stateList: {
    total: 55, //总数
    list: [
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "0" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "1" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "2" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "3" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "0" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "1" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "2" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "3" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "0" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "1" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "2" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "3" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "0" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "1" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "2" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "3" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "0" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "1" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "2" //0待审核  1未通过 2已购买 3购买
      },
      {
        id: "21",
        name: "PDD", //商品名称
        price: "16.50", //买入价
        margin: "355.40", //保证金
        buyPrice: "244.45", //购买金额
        multiple: "1", //倍数
        state: "3" //0待审核  1未通过 2已购买 3购买
      }
    ]
  }
};

//持有列表
export const holdingList = {
  tabList: [],
  holdingList: {
    total: 13,
    list: [
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      },
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      },
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      },
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      },
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      },
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      },
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      },
      {
        id: "0",
        name: "标题",
        subName: "副标题",
        tag: "员工福利扶持",
        updatePrice: "22,748",
        buyPrice: "158,456",
        number: "50,000",
        price: "123,456,786",
        trade: "145,456",
        incomeTax: "123,732",
        multiple: "3",
        deposit: "0",
        yinSunYi: "465,784",
        shiJiSunYi: "687,435",
        time: "03-11-2023 14:02:48"
      }
    ]
  }
};

//搜索模拟
export const searchList = [
  {
    key: "ABC",
    number: "2.38K"
  },
  {
    key: "1ABC",
    number: "2.38K"
  },
  {
    key: "ABC2",
    number: "2.38K"
  },
  {
    key: "33ABC",
    number: "2.38K"
  },
  {
    key: "444ABC555",
    number: "2.38K"
  },
  {
    key: "66ABC",
    number: "2.38K"
  },
  {
    key: "ABC",
    number: "2.38K"
  },
  {
    key: "1ABC",
    number: "2.38K"
  },
  {
    key: "ABC2",
    number: "2.38K"
  },
  {
    key: "33ABC",
    number: "2.38K"
  },
  {
    key: "444ABC555",
    number: "2.38K"
  },
  {
    key: "66ABC",
    number: "2.38K"
  },
  {
    key: "ABC",
    number: "2.38K"
  },
  {
    key: "1ABC",
    number: "2.38K"
  },
  {
    key: "ABC2",
    number: "2.38K"
  },
  {
    key: "33ABC",
    number: "2.38K"
  },
  {
    key: "444ABC555",
    number: "2.38K"
  },
  {
    key: "66ABC",
    number: "2.38K"
  },
  {
    key: "ABC",
    number: "2.38K"
  },
  {
    key: "1ABC",
    number: "2.38K"
  },
  {
    key: "ABC2",
    number: "2.38K"
  },
  {
    key: "33ABC",
    number: "2.38K"
  },
  {
    key: "444ABC555",
    number: "2.38K"
  },
  {
    key: "66ABC",
    number: "2.38K"
  },
  {
    key: "ABC",
    number: "2.38K"
  },
  {
    key: "1ABC",
    number: "2.38K"
  },
  {
    key: "ABC2",
    number: "2.38K"
  },
  {
    key: "33ABC",
    number: "2.38K"
  },
  {
    key: "444ABC555",
    number: "2.38K"
  },
  {
    key: "66ABC",
    number: "2.38K"
  },
  {
    key: "ABC",
    number: "2.38K"
  },
  {
    key: "1ABC",
    number: "2.38K"
  },
  {
    key: "ABC2",
    number: "2.38K"
  },
  {
    key: "33ABC",
    number: "2.38K"
  },
  {
    key: "444ABC555",
    number: "2.38K"
  },
  {
    key: "66ABC",
    number: "2.38K"
  }
];
