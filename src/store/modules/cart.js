import ajax from '@/common/request';
import config from '@/common/config';
import { formatURL } from '@/common/utils';
import * as types from '../mutation-types';
// 整理格式
function formatCartList(data) {
  // 失效产品
  const expireList = [];
  data.forEach((item, idx) => {
    // 失效商品
    if (item.food_info === null) {
      expireList.push(item.id);
      item.isExpire = 1;
      return;
    }

    if (item.food_info.discount_info === null) {
      item.price = item.food_info.price;
    } else {
      // 折扣商品
      item.price = item.food_info.discount_info.discount;
    }

    item.food_name = item.food_info.food_name;
    item.picture = item.food_info.picture;
    // 规格产品,需要加上规格价格
    if (item.spec_arr.length) {
      item.spec_text = [];
      item.price = item.spec_arr.reduce((price, current) => {
        const specArr = item.food_info.spec_arr;
        const index = specArr.findIndex(specItem => current == specItem.id);
        price += specArr[index].price;
        item.spec_text.push(specArr[index].label);
        return price;
      }, item.food_info.price);
    }
    delete item.food_info;
    delete item.discount_info;
  });
  return { foodList: data, expireList };
}
const API = config.API;
// state
const state = {
  cartList: [],
  shopId: null,
};

// getters
const getters = {
  cartList: state => state.cartList,
  cartProducts: (state, getters, rootState) =>
    state.list.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id);
      return {
        title: product.title,
        price: product.price,
        quantity,
      };
    }),

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  },
};

// mutations
const mutations = {
  CART_INIT_LIST(state, list) {
    const temp = [];
    list.forEach(item => {
      if (item.isExpire) return;
      const index = temp.findIndex(_item => _item.shop_info.id == item.shop_id);
      if (index === -1) {
        const shopInfo = item.shop_info;
        delete item.shop_info;
        const obj = Object.assign({}, { shop_info: shopInfo, foodList: [] });
        obj.foodList.push(item);
        temp.push(obj);
      } else temp[index].foodList.push(item);
    });
    state.cartList = temp;
  },
};

const actions = {
  getCartList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ajax
        .get(API.CART_LIST)
        .then(resp => {
          const { foodList, expireList } = formatCartList(resp.data);
          expireList.forEach(id => {
            this.dispatch('cart/deleteProduct', id);
          });
          commit(types.CART_INIT_LIST, foodList);
          resolve(resp);
        })
        .catch(reject);
    });
  },
  getCartListByShop({ commit }, payload) {
    const { shopId } = payload;
    return ajax.get(formatURL(API.CART_SHOP_LIST, { shopId }));
  },
  addProductToCart({ commit }, data) {
    return ajax.post(API.CART_ADD, data);
  },

  // 购物车中已有该商品，可以直接通过购物车自增id判断
  updateProductToCart({ state, commit }, payload) {
    return ajax.put(API.CART_UPDATE, payload);
  },
  // 清空某商店里的商品
  emptyCart({ state, commit }, payload) {
    return ajax.delete(formatURL(API.CART_DELETE, { shopId: payload }));
  },
  // 删除购物车里的商品
  deleteProduct({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ajax.delete(formatURL(API.CART_PRODUCT_DELETE, { id: payload })).then(resp => {
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
