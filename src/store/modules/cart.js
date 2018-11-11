import * as types from '../mutation-types';
import ajax from '@/common/request';
import config from '@/common/config';
import { formatURL } from '@/common/utils';

const API = config.API;
// state
const state = {
  list: [],
  shopId: null,
};

// getters
const getters = {
  list: state => state.list,
  cartProducts: (state, getters, rootState) => {
    return state.list.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id);
      return {
        title: product.title,
        price: product.price,
        quantity,
      };
    });
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
};

// mutations
const mutations = {
  [types.CART_INIT_LIST](state, payload) {
    // 这里的 `state` 对象是模块的局部状态
    state.list = [...payload];
  },
  [types.CART_ADD_ITEM](state, payload) {
    // 这里的 `state` 对象是模块的局部状态
    const { data, index } = payload;
    if (index !== -1) {
      let item = state.list[index];
      item.num++;
      state.list.splice(index, 1, item);
    } else {
      state.list.push({
        food_id: data.foodId,
        spec_id: data.specArr.join(','),
        spec_text: data.specText.join(','),
        num: data.num,
        price: data.totalPrice,
        shop_id: data.shop_id,
        food_name: data.foodName,
      });
    }
  },
  [types.CART_DEL_ITEM](state, payload) {
    const { index } = payload;
    if (state.list[index].num > 1) {
      let item = state.list[index];
      item.num--;
      state.list.splice(index, 1, item);
    } else {
      state.list.splice(index, 1);
    }
  },
};

// actions
const actions = {
  // incrementAsync({ commit, state, rootState }, payload) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       commit(types.MOD1.INCREMENT, payload);
  //       // 在模块内部改变其他模块的 state
  //       commit(`global/${types.MOD1.INCREMENT}`, null, { root: true });
  //       console.log(
  //         `在模块内部访问其他模块的 state：${rootState.global.count}`
  //       );

  //       resolve();
  //     }, 1000);
  //   });
  // },

  getCartList({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      ajax
        .get(formatURL(API.CART_LIST, { id: rootState.user.userId }))
        .then(resp => {
          commit(types.CART_INIT_LIST, resp.data);
          resolve(resp);
        });
    });
  },

  addProductToCart({ state, commit, rootState }, payload) {
    const data = payload;
    data.userId = rootState.user.userId;
    return new Promise((resolve, reject) => {
      ajax.post(API.CART_ADD, data).then(resp => {
        // 更新购物车
        const list = state.list;
        const result = list.findIndex(item => {
          return item.food_id == data.foodId && item.spec_id == data.specArr;
        });
        if (data.num == 1) {
          commit(types.CART_ADD_ITEM, { data: data, index: result });
        } else {
          commit(types.CART_DEL_ITEM, { index: result });
        }
        resolve(resp);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
