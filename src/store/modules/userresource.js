import * as types from '../mutation-types'
import * as actiontypes from '../action-types'
import * as cookie from '../../service/cookieservice'
import {getResourcesByUser} from '../../service/sysuser'
import {rootmenuList, menuList} from '../../service/menuservice'
import qs from 'qs'

/* 初始化帐号数据 */
const state = {
  menuList: [],
  childmenuList: [],
  resourceList: [],
  menuselecturl: ''
}

const mutations = {
  [types.RESOURCE_MENULIST](state, data) {
    state.menuList = data
  },
  [types.RESOURCE_MENU_CHILDLIST](state, data) {
    state.childmenuList = data
  },
  [types.RESOURCE_USER_LIST](state, data) {
    state.resourceList = data
  },
  [types.RESOURCE_SELECT_URL](state, data) {
    state.menuselecturl = data
  }
}

const actions = {
  [actiontypes.RESOURCE_USER_LIST]({dispatch, commit}) {
    //加载用户的权限列表
    const accountid = cookie.getKey(cookie.USER_ACCOUNT)
    getResourcesByUser({accountid}).then(value => {
      commit(types.RESOURCE_USER_LIST, value.data)
      dispatch(actiontypes.RESOURCE_MENULIST)
    })
  },
  [actiontypes.RESOURCE_MENULIST]({commit}) {
    rootmenuList({}).then(value => {
      const firstmenulist = value.data
      const resources = state.resourceList
      let menuList = []
      if (null !== firstmenulist) {
        for (const value of firstmenulist) {
          const result = resources.find((n) => n === value.id)
          if (undefined !== result) {
            menuList.push(value)
          }
        }
      }
      commit(types.RESOURCE_MENULIST, menuList)
    })
  },
  [actiontypes.RESOURCE_MENU_CHILDLIST]({commit}, data) {

    menuList(data).then(value => {
      const menulist = value.data
      const resources = state.resourceList
      let childmenuList = []
      for (const value of menulist) {
        const result = resources.find((n) => n === value.id)
        if (undefined !== result) {
          childmenuList.push(value)
        }
      }
      if (childmenuList.length > 0) {
        commit(types.RESOURCE_MENU_CHILDLIST, childmenuList)
        const str = qs.stringify(childmenuList)
        cookie.setKey(cookie.USER_MENU, str)
      } else {
        cookie.setKey(cookie.USER_MENU, '')
        commit(types.RESOURCE_MENU_CHILDLIST, [])
      }
    })
  },
  [actiontypes.RESOURCE_PARENT_RESOURCE]({dispatch}, data) {
    menuList(data).then(value => {
      const result = value.data
      if (result.length > 0) {
        const parentid = result[0].parentid
        if ('' !== parentid && null !== parentid) {
          dispatch(actiontypes.RESOURCE_MENU_CHILDLIST, {parentid})
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
