import md5 from 'js-md5';
import { loginByAccount, logout } from '@/api/login';
import { getToken, setToken, removeToken } from '@/common/auth';

const state = {
  user: '',
  userStatus: false,
  code: '',
  // token: getToken(),
  userName: '',
  userAvatar: '../assets/images/default.jpg',
  userTel: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: [],
  },
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_SETTING: (state, setting) => {
    state.setting = setting;
  },
  SET_STATUS: (state, status) => {
    state.userStatus = status;
  },
  SET_NAME: (state, name) => {
    state.userName = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.userAvatar = avatar;
  },
  SET_TEL: (state, tel) => {
    state.userTel = tel;
  },
};
const getters = {
  userAvatar: state => state.userAvatar,
  userName: state => state.userName,
  userTel: state => state.userTel,
  introduction: state => state.introduction,
  userStatus: state => state.userStatus,
};
const actions = {
  // 用户名登录
  LoginByAccount({ commit }, userInfo) {
    const account = userInfo.account.trim();
    const password = md5(userInfo.password);

    return new Promise((resolve, reject) => {
      loginByAccount(account, password)
        .then(resp => {
          const { name, tel, avatar } = resp.data.data;
          commit('SET_NAME', name);
          commit('SET_TEL', tel);
          commit('SET_AVATAR', avatar);
          commit('SET_STATUS', true);

          resolve();
        })
        .catch(error => {
          reject(error);
        });
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
          commit('SET_TOKEN', '');
          commit('SET_NAME', '');
          commit('SET_TEL', '');
          commit('SET_AVATAR', '');
          commit('SET_STATUS', false);
          // removeToken();
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
  mutations,
  getters,
  actions,
};
