import * as types from '../mutation-types'
import * as actiontypes from '../action-types'
import * as sysuserservice from '../../service/sysuser'

/* 初始化帐号数据 */
const state = {
  addmodal: false,
  editmodal: false,
  sysuserobj: {
    id: '',
    account: '',
    name: '',
    telphone: '',
    email: ''
  },
  hasrolelist: [],
  rolelist:[],
  sysuserlist:[],
  datatotal:0
}

const mutations = {
  [types.SYSUSER_ADD_MODAL](state, data) {
    state.addmodal = data
  },
  [types.SYSUSER_EDIT_MODAL](state, data) {
    state.editmodal = data
  },
  [types.CHANGE_SYSUSER_ID](state, data) {
    state.sysuserobj.id = data
  },
  [types.CHANGE_SYSUSER_ACCOUNT](state, data) {
    state.sysuserobj.account = data
  },
  [types.CHANGE_SYSUSER_NAME](state, data) {
    state.sysuserobj.name = data
  },
  [types.CHANGE_SYSUSER_TELPHONE](state, data) {
    state.sysuserobj.telphone = data
  },
  [types.CHANGE_SYSUSER_EMAIL](state, data) {
    state.sysuserobj.email = data
  },
  [types.RESET_SYSUSER_DATA](state) {
    state.sysuserobj.id = ''
    state.sysuserobj.account = ''
    state.sysuserobj.name = ''
    state.sysuserobj.telphone = ''
    state.sysuserobj.email = ''
  },
  [types.SYSUSER_EDIT_DATA](state, data) {
    state.sysuserobj.id = data.id
    state.sysuserobj.account = data.account
    state.sysuserobj.name = data.name
    state.sysuserobj.telphone = data.telphone
    state.sysuserobj.email = data.email
  },
  [types.GET_ROLES_BYUSER](state, data) {
    state.hasrolelist = data
  },
  [types.USER_ROLE_LIST](state, data) {
    state.rolelist = data
  },
  [types.SYS_USER_LIST](state, data) {
    state.sysuserlist = data
  },
  [types.SYS_USER_LIST_COUNT](state, data) {
    state.datatotal = data
  }
}

const actions = {
  [actiontypes.GET_ROLES_BYUSER]({commit}, data) {
    sysuserservice.getrolebyuser(data).then(value => {
      if ('' !== value.data && null !==value.data) {
        commit(types.GET_ROLES_BYUSER, value.data)
        commit(types.SYSUSER_EDIT_MODAL, true)
      }
    })
  },
  [actiontypes.SYS_USER_LIST]({commit}, data) {
    const usertype ='0'
    sysuserservice.sysuserlist({...data,usertype}).then(value =>{
      if(value.data.length>0){
        commit(types.SYS_USER_LIST, value.data)
        commit(types.SYS_USER_LIST_COUNT, value.total)
      }
    })
  }
}

export default {
  state,
  actions,
  mutations
}
