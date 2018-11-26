import ajax from '@/common/request';
import config from '@/common/config';
import { formatURL } from '@/common/utils';
import * as types from '../mutation-types';

const API = config.API;
// state
const state = {};

// getters
const getters = {};

// mutations
const mutations = {};

// actions
const actions = {
  sumbitOrder({}, payload) {
    return ajax.post(API.ORDER_CREATE, payload);
  },

  getOrderList({ commit }, payload = 1) {
    return new Promise((resolve, reject) => {
      ajax
        .get(API.ORDER_LIST, {
          params: {
            page: payload,
          },
        })
        .then(resp => {
          resolve(resp);
        })
        .catch(reject);
    });
  },
  getOrderDetail({ commit }, payload) {
    return ajax.get(formatURL(API.ORDER_DETAIL, { id: payload }));
  },
  cancelOrder({ commit }, id) {
    return ajax.put(formatURL(API.ORDER_DELETE, { id }));
  },
  payOrder({}, payload) {
    return ajax.put(API.ORDER_PAY, payload);
  },
  getPayData({ commit }, id) {
    return ajax.get(formatURL(API.ORDER_PAY_INFO, { id }));
  },
  reviewOrder({ commit }, payload) {
    const { id, data } = payload;
    return ajax.post(formatURL(API.ORDER_REVIEW, { id }), data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
