const APIPREFIX = '/v1';

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
    BAIDU_MAP_INFO: 'http://api.lococo.site/proxy/geocoder/v2/',
    SHOP_LIST: `${APIPREFIX}/shop`, // 商店列表
    SHOP_DETAIL: `${APIPREFIX}/shop/:id`, // 商店详情

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

    // 评价列表
    EVAL_LIST: `${APIPREFIX}/user/evaluation/`,
    EVAL_DELETE: `${APIPREFIX}/user/evaluation/:id`,
  },
  BASE_URL: {
    PRO: 'https://api.lococo.site/',
    DEV: 'http://192.168.191.1:7001/',
  },
};
