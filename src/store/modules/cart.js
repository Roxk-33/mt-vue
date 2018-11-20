import ajax from 'src/common/request';
import config from 'src/common/config';
import { formatURL } from 'src/common/utils';
import * as types from '../mutation-types';

const API = config.API;
// state
const state = {
  list: [],
  listArr: [],
  shopId: null,
};

// getters
const getters = {
  list: state => state.list,
  listArr: state => state.listArr,
  cartProducts: (state, getters, rootState) => state.list.map(({ id, quantity }) => {
    const product = rootState.products.all.find(product => product.id === id);
    return {
      title: product.title,
      price: product.price,
      quantity,
    };
  }),

  cartTotalPrice: (state, getters) => getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0),
};

// mutations
const mutations = {
  [types.CART_INIT_LIST](state, list) {
    const temp = [];
    list.forEach((item) => {
      const index = temp.findIndex(_item => _item.shop_info.id == item.shop_id);

      if (index === -1) {
        const obj = Object.assign(
          {},
          {
            shop_info: item.shop_info,
            foodList: [],
          },
        );
        obj.foodList.push(item);
        temp.push(obj);
      } else temp[index].foodList.push(item);
    });
    state.listArr = temp;
    // 这里的 `state` 对象是模块的局部状态
    state.list = [...list];
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

  getCartList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ajax
        .get(API.CART_LIST)
        .then((resp) => {
          commit(types.CART_INIT_LIST, resp.data);
          resolve(resp);
        })
        .catch(reject);
    });
  },
  getCartListByShop({ commit }, payload) {
    const { shopId } = payload;
    return ajax.get(formatURL(API.CART_SHOP_LIST, { shopId }));
  },
  addProductToCart({ commit, rootState }, data) {
    data.userId = rootState.user.userId;
    return ajax.post(API.CART_ADD, data);
  },
  //
  // 购物车中已有该商品，可以直接通过购物车自增id判断
  updateProductToCart({ state, commit }, payload) {
    return ajax.put(API.CART_UPDATE, payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
