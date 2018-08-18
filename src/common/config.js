const APIPREFIX = '/api/v1';

export default {
  API: {
    // 登录
    USER_LOGIN: `${APIPREFIX}/user/login`,
    // 送货地址
    USER_ADDRESS_ADD: `${APIPREFIX}/user/address`, // 新增地址
    USER_ADDRESS_EDIT: `${APIPREFIX}/user/address`, // 修改地址
  },
};
