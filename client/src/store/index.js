import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    userInfo: {}
  },
  mutations: {
    changeLoginState(state, s) {
      state.loginState = s;
    },
    changUserInfo(state, obj) {
      state.userInfo = obj;
    }
  },
  actions: {},
  modules: {}
})