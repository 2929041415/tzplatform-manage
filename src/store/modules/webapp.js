import * as types from '../mutation-types'
import * as actiontypes from '../action-types'
import * as appservice from '../../service/webapp'

/* 初始化资源数据 */
const state = {
  webapplist: [],
  appdetailid:''

}

const mutations = {
  [types.WEBAPP_DATA_LIST](state, data) {
    state.webapplist = data
  },
  [types.WEBAPP_APP_ID](state, data) {
    state.appdetailid = data
  }
}

const actions = {
  [actiontypes.WEBAPP_DATA_LIST]({commit},data) {
    appservice.applist(data).then(value => {
      const data = value.data
      commit(types.WEBAPP_DATA_LIST,value.data)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
