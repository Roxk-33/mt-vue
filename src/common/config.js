const APIPREFIX = '/api/v1';

export default {
  API: {
    // 登录
    USER_LOGIN: `/user/login`,
    // 送货地址
    USER_ADDRESS_ADD: `/user/address`, // 新增地址
    USER_ADDRESS_EDIT: `/user/address`, // 修改地址

    SHOP_LIST: `/shop`, // 商店列表
    SHOP_DETAIL: `/shop/:id`, // 商店详情
  },
};
