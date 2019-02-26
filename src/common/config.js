const APIPREFIX = '/client';

export default {
  API: {
    // 登录
    USER_LOGIN: `${APIPREFIX}/user/login`,
    USER_LOGOUT: `${APIPREFIX}/user/logout`,
    USER_INFO: `${APIPREFIX}/user`,
    USER_INFO_UPDATE: `${APIPREFIX}/user`,
    USER_REGISTER: `${APIPREFIX}/user/register`,
    USER_UPLOAD_AVATAR: `${APIPREFIX}/user/avatar`, // 上传头像
    USER_PHONE_CODE: `${APIPREFIX}/user/phone/vercode`, // 获取验证码
    // 送货地址
    USER_ADDRESS_LIST: `${APIPREFIX}/user/address`, // 地址列表
    USER_ADDRESS_ADD: `${APIPREFIX}/user/address`, // 新增地址
    USER_ADDRESS_EDIT: `${APIPREFIX}/user/address`, // 修改地址
    USER_ADDRESS_DELETE: `${APIPREFIX}/user/address/:id`, // 修改地址
    USER_ADDRESS_INFO: `${APIPREFIX}/user/address/:id`, // 获取地址
    BAIDU_MAP_INFO: 'https://api.lococo.site/proxy/baidu-map/geocoder/v2/',
    BAIDU_MAP_SEARCH: 'https://api.lococo.site/proxy/baidu-map/place/v2/suggestion',
    // BAIDU_MAP_INFO: `${APIPREFIX}/user/address/map`,
    // BAIDU_MAP_INFO: 'https://api.map.baidu.com/geocoder/v2/',

    // 商店
    SHOP_LIST: `${APIPREFIX}/shop`, // 商店列表
    SHOP_DETAIL: `${APIPREFIX}/shop/:id`, // 商店详情
    SHOP_EVAL_LIST: `${APIPREFIX}/shop/:id/eval`, // 商店评价列表
    // 购物车
    CART_LIST: `${APIPREFIX}/user/cart`,
    CART_SHOP_LIST: `${APIPREFIX}/user/cart/settle/:shopId`,
    CART_ADD: `${APIPREFIX}/user/cart`,
    CART_UPDATE: `${APIPREFIX}/user/cart`,
    CART_DELETE: `${APIPREFIX}/user/cart/:shopId`,

    // 订单
    ORDER_CREATE: `${APIPREFIX}/order`,
    ORDER_PAY: `${APIPREFIX}/order/pay`,
    ORDER_PAY_INFO: `${APIPREFIX}/order/pay/:id`,
    ORDER_LIST: `${APIPREFIX}/user/order`,
    ORDER_DETAIL: `${APIPREFIX}/user/order/:id`,
    ORDER_DELETE: `${APIPREFIX}/user/order/:id`,
    ORDER_REVIEW: `${APIPREFIX}/user/order/:id/review`, // 评价
    ORDER_CONFIRM: `${APIPREFIX}/user/order/:id/confirm`, // 评价

    // 评价列表
    USER_EVAL_LIST: `${APIPREFIX}/user/evaluation/`,
    USER_EVAL_DELETE: `${APIPREFIX}/user/evaluation/:id`,
  },
  BASE_URL: {
    PRO: 'https://api.lococo.site',
    DEV: 'http://localhost:7001/',
  },
};
