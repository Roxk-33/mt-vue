import ajax from 'src/common/request';
import config from 'src/common/config';
import { formatURL } from 'src/common/utils';

const API = config.API;
const state = {};

const mutations = {};
const getters = {};
const actions = {
  getShopList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ajax({ url: API.SHOP_LIST }).then((resp) => {
        resolve(resp);
      });
    });
  },
  getShopDetail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ajax({ url: formatURL(API.SHOP_DETAIL, { id: payload.id }) })
        .then((resp) => {
          resolve(resp);
        })
        .catch(e => reject(e));
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
