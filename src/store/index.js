import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"    //页面每次刷新都能获取到之前state里的值

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  userName: '', //登录名
  cartCount: 0    //购物车数量
}

export default new Vuex.Store({
  state,
  mutations,
  actions,

  plugins: [createPersistedState({
      storage: window.sessionStorage
  })]
})
