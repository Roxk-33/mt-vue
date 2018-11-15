const APIPREFIX = '/api/v1';

export default {
  API: {
    // 登录
    USER_LOGIN: `/user/login`,
    USER_LOGOUT: `/user/logout`,
    USER_INFO: `/user`,
    USER_REGISTER: `/user/register`,
    // 送货地址
    USER_ADDRESS_LIST: `/user/address`, // 地址列表
    USER_ADDRESS_ADD: `/user/address`, // 新增地址
    USER_ADDRESS_EDIT: `/user/address`, // 修改地址

    SHOP_LIST: `/shop`, // 商店列表
    SHOP_DETAIL: `/shop/:id`, // 商店详情

    // 购物车
    CART_LIST: `/user/cart`,
    CART_SHOP_LIST: `/user/cart/settle/:shopId`,
    CART_ADD: `/user/cart`,
    CART_UPDATE: `/user/cart`,

    // 订单
    ORDER_CREATE: '/order',
    ORDER_LIST: '/user/order',
    ORDER_DETAIL: '/user/order/:id',
  },
};
