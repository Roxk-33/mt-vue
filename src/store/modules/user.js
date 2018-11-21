import { getToken, setToken, removeToken } from '@/common/auth';
import ajax from '@/common/request';
import config from '@/common/config';
import { formatURL } from '@/common/utils';
import * as types from '../mutation-types';

const API = config.API;
const state = {
  userStatus: false,
  code: '',
  userId: null,
  userName: '',
  userAvatar: 'https://i.loli.net/2018/11/14/5bec27346a028.jpg',
  userTel: '',
  introduction: '',
  token: getToken(),
  addressList: [],
};

const mutations = {
  [types.SET_TOKEN](state, token) {
    setToken(token);
    state.token = token;
  },
  [types.REMOVE_TOKEN](state) {
    removeToken();
    state.token = null;
  },
  [types.SET_INTRODUCTION](state, introduction) {
    state.introduction = introduction;
  },
  [types.SET_USERID](state, id) {
    state.userId = id;
  },
  [types.SET_NAME](state, name) {
    state.userName = name;
  },
  [types.SET_AVATAR](state, avatar) {
    state.userAvatar = avatar;
  },
  [types.SET_TEL](state, tel) {
    state.userTel = tel;
  },
  [types.SET_ADDRESS](state, addressList) {
    state.addressList = addressList;
  },
};
const getters = {
  userAvatar: state => state.userAvatar,
  userName: state => state.userName,
  userId: state => state.userId,
  userTel: state => state.userTel,
  introduction: state => state.introduction,
  token: state => state.token,
};
const actions = {
  RegiterByAccount({ commit }, userInfo) {
    const account = userInfo.account.trim();
    const password = userInfo.password.trim();
    return new Promise((resolve, reject) => {
      ajax
        .post(API.USER_REGISTER, {
          account,
          password,
        })
        .then((resp) => {
          resolve(resp);
          commit(types.SET_TOKEN, resp.data.token);
          commit(types.SET_NAME, resp.data.user.user_name);
          commit(types.SET_AVATAR, resp.data.user.avatar);
          commit(types.SET_USERID, resp.data.user.id);
          commit(types.SET_TEL, resp.data.user.tel);
        })
        .catch(reject);
    });
  },
  // 用户名登录
  LoginByAccount({ commit }, userInfo) {
    const account = userInfo.account.trim();
    const password = userInfo.password.trim();
    return new Promise((resolve, reject) => {
      ajax
        .post(API.USER_LOGIN, {
          account,
          password,
        })
        .then((resp) => {
          resolve(resp);
          commit(types.SET_TOKEN, resp.data.token);
          commit(types.SET_NAME, resp.data.user.user_name);
          commit(types.SET_AVATAR, resp.data.user.avatar);
          commit(types.SET_USERID, resp.data.user.id);
          commit(types.SET_TEL, resp.data.user.tel);
        })
        .catch(reject);
    });
  },
  getUserInfo({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      const token = state.token;
      if (!token) {
        reject('未登录');
      } else {
        ajax
          .get(API.USER_INFO)
          .then((resp) => {
            resolve(resp);
            commit(types.SET_NAME, resp.data.user_name);
            commit(types.SET_AVATAR, resp.data.avatar);
            commit(types.SET_USERID, resp.data.id);
            commit(types.SET_TEL, resp.data.tel);
          })
          .catch((err) => {
            // commit('REMOVE_TOKEN');
            // commit('SET_NAME', '');
            // commit('SET_TEL', '');
            // commit('SET_AVATAR', '');
            console.log(err);
            reject(err);
          });
      }
    });
  },
  updateUserInfo({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      ajax
        .put(API.USER_INFO_UPDATE, userInfo)
        .then((resp) => {
          const { action, data } = userInfo;
          if (action === 'changeName') {
            commit(types.SET_NAME, data);
          }
          if (action === 'changeTel') {
            commit(types.SET_TEL, data);
          }
          resolve(resp);
        })
        .catch(reject);
    });
  },
  addAddress({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      ajax
        .post(API.USER_ADDRESS_ADD, payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch(reject);
    });
  },
  editAddress({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      ajax
        .put(API.USER_ADDRESS_EDIT, payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch(reject);
    });
  },
  delAddress({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      ajax
        .delete(formatURL(API.USER_ADDRESS_DELETE, { id: payload }))
        .then((resp) => {
          resolve(resp);
        })
        .catch(reject);
    });
  },
  getAddressList({ commit }) {
    return new Promise((resolve, reject) => {
      ajax
        .get(API.USER_ADDRESS_LIST)
        .then((resp) => {
          resolve(resp);
        })
        .catch(reject);
    });
  },
  getAddressInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      ajax
        .get(formatURL(API.USER_ADDRESS_INFO, { id }))
        .then((resp) => {
          resolve(resp);
        })
        .catch(reject);
    });
  },
  getMapInfo({ commit }, payload) {
    const { location } = payload;
    return new Promise((resolve, reject) => {
      ajax
        .get(API.BAIDU_MAP_INFO, {
          params: {
            location,
            pois: 1,
            output: 'json',
            ak: 'gql7G3189x9UnKhoAya6yCfdxZz7CsQX',
          },
        })
        .then((resp) => {
          console.log(resp);
          resolve(resp);
        })
        .catch(reject);
    });
  },

  // 获取用户信息
  // GetUserInfo({ commit, state }, token) {
  //   return new Promise((resolve, reject) => {

  //   });
  // },

  // 第三方验证登录
  // LoginByThirdparty({ commit, state }, code) {
  //   return new Promise((resolve, reject) => {
  //     commit('SET_CODE', code)
  //     loginByThirdparty(state.status, state.email, state.code).then(response => {
  //       commit('SET_TOKEN', response.data.token)
  //       setToken(response.data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 登出
  LogOut({ commit }) {
    return new Promise((resolve, reject) => {
      ajax
        .get(API.USER_LOGOUT)
        .then((resp) => {
          commit('REMOVE_TOKEN');
          commit('SET_NAME', '');
          commit('SET_TEL', '');
          commit('SET_AVATAR', '');
          resolve(resp);
        })
        .catch(reject);
    });
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise((resolve) => {
      commit('REMOVE_TOKEN');
      resolve();
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
