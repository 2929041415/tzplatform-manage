import * as types from '../mutation-types'
import * as actiontypes from '../action-types'
import * as menuservice from '../../service/menuservice'
import * as sysroleservice from  '../../service/systemrole'

/* 初始化资源数据 */
const state = {
  resourcelist:[],
  chooseresourcelist:[],
  hasresourcelist:[]

}

const mutations = {
  [types.ROLE_RESOURCE_LIST] (state, data) {
    state.resourcelist = data
  },
  [types.CHOOSE_ROLE_RESOURCE_LIST] (state, data) {
    state.chooseresourcelist = data
  },
  [types.HAS_RESOURCE_LIST] (state, data) {
    state.hasresourcelist = data
  }
}

const actions = {
  [actiontypes.ROLE_RESOURCE_LIST] ({commit}) {
    menuservice.menutree().then(value =>{
      const data = value.data
      if(data.length>0){
        commit(types.ROLE_RESOURCE_LIST, data)
      }
    })
  },
  [actiontypes.HAS_RESOURCE_LIST] ({commit}, data) {
    sysroleservice.getresourcebyrole(data).then(value =>{
      const data = value.data
      if(data.length>0){
        commit(types.HAS_RESOURCE_LIST, data)
      }
    })
  }
}

export default {
  state,
  actions,
  mutations
}
