import ajax from '@/common/request';
import config from '@/common/config';
import { formatURL } from '@/common/utils';

const API = config.API;
const state = {};

const mutations = {};
const getters = {};
const actions = {
  getShopList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ajax({ url: API.SHOP_LIST }).then(resp => {
        resolve(resp);
      });
    });
  },
  getShopDetail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ajax({ url: formatURL(API.SHOP_DETAIL, { id: payload.id }) }).then(resp => {
        resolve(resp);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
