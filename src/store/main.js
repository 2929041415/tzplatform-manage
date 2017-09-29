import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import login from './modules/login'
import menuselect from './modules/menuselect'
import menu from './modules/menu'
import role from './modules/role'
import sysuser from './modules/sysuer'
import userresource from './modules/userresource'
import question from './modules/question'
import apiinfo from './modules/apiinfo'
import webapp from './modules/webapp'


Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    login,
    menuselect,
    menu,
    role,
    sysuser,
    userresource,
    apiinfo,
    userresource,
    question,
    webapp
  }
})
