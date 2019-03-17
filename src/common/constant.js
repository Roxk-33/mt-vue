// 常量表
export default {
  TYPE: {
    SEX: {
      0: '先生',
      1: '女士',
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
      0: '公司',
      1: '学校',
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
    ACCEPT: '商家已接单',
    ONTHEWAY: '订单配送中',
    ORDER_SUCCESS: '订单已完成',
    ORDER_REFUNDING: '申请退款中',
    ORDER_REFUND: '订单已退款',
    ORDER_CANCEL: '订单已取消',
    ORDER_CANCEL_TIMEOUT: '订单已取消',
    ORDER_REFUND_FAIL_ONTHEWAY: '订单拒绝退款',
  },
  // 订单状态对应的消息
  ORDER_STATUS_MSG: {
    UNPAY: '请在15分钟内完成支付，超时将自动取消',
    PAY: '订单已支付，等待商家接单',
    ACCEPT: '商家已接单',
    ONTHEWAY: '订单配送中',
    ORDER_SUCCESS: '感谢您对嘻嘻外卖的信任，期待再次光临',
    ORDER_REFUNDING: '订单申请退款中,需要商家确认,请耐心等待',
    ORDER_REFUND: '订单已退款',
    ORDER_CANCEL: '您的订单已取消',
    ORDER_CANCEL_TIMEOUT: '支付超时，订单已取消',
    ORDER_REFUND_FAIL_ONTHEWAY: '商家拒绝退款,商品配送中',
  },
  // 订单状态进度条
  ORDER_DETAIL_STATUS_TIME: {
    created_at: '订单已提交',
    pay_time: '支付成功',
    accept_time: '商家已接单',
    send_time: '商品已送出',
    complete_time: '订单已完成',
    cancel_time: '订单已取消',
    apply_refund_time: '申请退款',
    refund_time: '商家同意退款',
    refund_fail_time: '商家拒绝退款',
  },
};
