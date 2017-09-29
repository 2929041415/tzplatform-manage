import * as types from '../mutation-types'

/* 初始化帐号数据 */
const state = {
  menuselectid: '1',
  secondmenushow:true
}

const mutations = {
  [types.MENU_SELECT_CHANGE] (state, data) {
    state.menuselectid = data
  },
  [types.SECOND_MENU_SHOW] (state, data) {
    state.secondmenushow = data
  }
}

const actions = {

}

export default {
  state,
  actions,
  mutations
}
