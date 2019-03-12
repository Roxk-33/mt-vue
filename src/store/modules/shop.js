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
      ajax.get(API.SHOP_LIST, { params: payload }).then(resp => {
        resolve(resp);
      });
    });
  },
  getShopDetail({}, payload) {
    return ajax({ url: formatURL(API.SHOP_DETAIL, { id: payload.id }) });
  },
  getShopReviewList({}, payload) {
    return ajax({
      url: formatURL(API.SHOP_EVAL_LIST, { id: payload.shopId }),
      params: { page: payload.page },
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
