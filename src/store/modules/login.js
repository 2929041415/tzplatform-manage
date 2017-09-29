import * as types from '../mutation-types'

/* 初始化帐号数据 */
const state = {
  loginmodalstatus: false,
  usertoken:''
}

const mutations = {
  [types.LOGIN_MODAL_STATUS] (state, data) {
    state.loginmodalstatus = data
  },
  [types.USER_ACCESS_TOKEN] (state, data) {
    state.usertoken = data
  }
}

const actions = {

}

export default {
  state,
  actions,
  mutations
}
