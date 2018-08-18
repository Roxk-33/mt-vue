import ajax from '@/common/request';
import config from '@/common/config';
const API = config.API;
const state = {};

const mutations = {};
const getters = {
  userAvatar: state => state.userAvatar,
};
const actions = {
  // 添加收货地址
  addAddress({ commit }, address) {
    console.log(address);
    return new Promise((resolve, reject) => {
      ajax({ url: API.USER_ADDRESS_ADD, data: address, method: 'post' }).then(resp => {
        console.log(resp);
      });
    });
  },
};

export default {
  // namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
