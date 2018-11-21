import ajax from '@/common/request';
import config from '@/common/config';
import { formatURL } from '@/common/utils';

const API = config.API;
const state = {};

const mutations = {};
const getters = {};
const actions = {
  getShopList({}, payload) {
    return new Promise((resolve, reject) => {
      ajax({ url: API.SHOP_LIST }).then((resp) => {
        resolve(resp);
      });
    });
  },
  getShopDetail({}, payload) {
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
