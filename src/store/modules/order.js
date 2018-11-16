import * as types from '../mutation-types';
import ajax from '@/common/request';
import config from '@/common/config';
import { formatURL } from '@/common/utils';

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
  cancelOrder({ commit }, payload) {
    return ajax.put(formatURL(API.ORDER_DELETE, { id: payload }));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
