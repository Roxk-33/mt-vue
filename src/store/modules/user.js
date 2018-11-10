import md5 from 'js-md5';
import * as types from '../mutation-types';
import { getToken, setToken, removeToken } from '@/common/auth';
import ajax from '@/common/request';
import config from '@/common/config';
const API = config.API;
const state = {
  userStatus: false,
  code: '',
  userId: null,
  userName: '',
  userAvatar: '../assets/images/default.jpg',
  userTel: '',
  introduction: '',
  token: getToken(),
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
        .then(resp => {
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
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('REMOVE_TOKEN', '');
          commit('SET_NAME', '');
          commit('SET_TEL', '');
          commit('SET_AVATAR', '');
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 前端 登出
  // FedLogOut({ commit }) {
  //   return new Promise((resolve) => {
  //     commit('SET_TOKEN', '');
  //     removeToken();
  //     resolve();
  //   });
  // },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
