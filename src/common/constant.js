// 常量表
export default {
  TYPE: {
    SEX: {
      0: '男',
      1: '女',
    },
    SEX_ZN: {
      男: 0,
      女: 1,
    },
    SEX_EN: {
      male: 0,
      female: 1,
    },
    TAGS: {
      0: '学校',
      1: '公司',
      2: '家',
    },
  },
  COLOR: {
    MT: '#ffd161',
  },
  // 店铺页-筛选
  fliterList: {
    complex: '综合排序',
    speed: '速度最快',
    rate: '评分最高',
    threshold: '起送价最低',
    freight: '配送费最低',
    perCapitaDec: '人均高到低',
    perCapitaAsc: '人均低到高',
  },
  // 订单状态
  ORDER_STATUS: {
    UNPAY: '等待支付',
    PAY: '已支付',
    ONTHEWAY: '送达中',
    ACCEPT: '已送达',
    ORDER_SUCCESS: '订单已完成',
    ORDER_REFUND: '退款中',
    ORDER_CANCEL: '订单已取消',
    ORDER_CANCEL_TIMEOUT: '订单已取消',
  },
  // 订单状态对应的消息
  ORDER_STATUS_MSG: {
    UNPAY: '请在15分钟内完成支付，超时将自动取消',
    PAY: '已支付',
    ONTHEWAY: '送达中',
    ACCEPT: '已送达',
    ORDER_SUCCESS: '感谢您对美团外卖的信任，期待再次光临',
    ORDER_REFUND: '退款中',
    ORDER_CANCEL: '您的订单已取消',
    ORDER_CANCEL_TIMEOUT: '支付超时，订单已取消',
  },
};
