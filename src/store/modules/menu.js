import * as types from '../mutation-types'
import * as actiontypes from '../action-types'
import * as menuservice from '../../service/menuservice'

/* 初始化帐号数据 */
const state = {
  addmodal: false,
  editmodal: false,
  menuObj: {
    id: '',
    menuname: '',
    menuurl: '',
    parentid: '',
    sort: ''
  },
  menurootlist: [],
  choosetreeobj: {
    id: '',
    menuname: '',
    parentid: ''
  },
  childlist: []
}

const mutations = {
  [types.MENU_ADD_MODAL](state, data) {
    state.addmodal = data
  },
  [types.MENU_EDIT_MODAL](state, data) {
    state.editmodal = data
  },
  [types.RESET_MENU_OBJECT](state) {
    state.menuObj.id = ''
    state.menuObj.menuname = ''
    state.menuObj.menuurl = ''
    state.menuObj.parentid = ''
    state.menuObj.sort = ''
  },
  [types.CHANGE_MENU_MENUNAME](state, data) {
    state.menuObj.menuname = data
  },
  [types.CHANGE_MENU_MENUURL](state, data) {
    state.menuObj.menuurl = data
  },
  [types.CHANGE_MENU_PARENTID](state, data) {
    state.menuObj.parentid = data
  },
  [types.CHANGE_MENU_ID](state, data) {
    state.menuObj.id = data
  },
  [types.CHANGE_MENU_SORT](state, data) {
    state.menuObj.sort = data
  },
  [types.MENU_ROOT_LIST](state, data) {
    state.menurootlist = data
  },
  [types.CHANGE_CHOOSE_MENUTREE](state, data) {
    state.choosetreeobj.id = data.id
    state.choosetreeobj.menuname = data.menuname
    state.choosetreeobj.parentid = data.parentid
  },
  [types.MENU_CHILD_LIST](state, data) {
    state.childlist = data
  },
  [types.CHANGE_MENU_OBJECT](state, data) {
    state.menuObj.id = data.id
    state.menuObj.menuname = data.menuname
    state.menuObj.menuurl = data.menuurl
    state.menuObj.parentid = data.parentid
    state.menuObj.sort = data.sort
  }
}

const actions = {
  [actiontypes.MENU_ROOT_TREE]({dispatch, commit}) {
    menuservice.rootmenuList().then(value => {
      const data = value.data
      if (null !== data) {
        if (data.length > 0) {
          //提交树节点data
          commit(types.MENU_ROOT_LIST, data)
          //初始化默认选中第一个节点
          commit(types.CHANGE_CHOOSE_MENUTREE, data[0])
          dispatch(actiontypes.MENU_CHILD_LIST, data[0])
        }
      }
    })
  },
  [actiontypes.MENU_CHILD_LIST]({commit}, data) {
    const parentid = data.id
    if (parentid !== undefined) {
      menuservice.menuList({parentid}).then(value => {
        const data = value.data
        if (data.length > 0) {
          commit(types.MENU_CHILD_LIST, data)
        }
      })
    }
  },
  [actiontypes.REFRESH_MENU_TREE]({state, dispatch, commit}) {
    menuservice.rootmenuList().then(value => {
      const data = value.data
      if (null !== data) {
        if (data.length > 0) {
          commit(types.MENU_ROOT_LIST, data)
          commit(types.CHANGE_CHOOSE_MENUTREE, state.choosetreeobj)
          dispatch(actiontypes.MENU_CHILD_LIST, state.choosetreeobj)
        }
      }
    })
  }
}

export default {
  state,
  actions,
  mutations
}
