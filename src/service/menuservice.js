import request from '../utils/request'
import api from '../utils/api'

export function menuList (params) {
  return request.Post(api.menuList,params)
}

export function rootmenuList (params) {
  return request.Post(api.rootmenuList,params)
}

export function addmenu (params) {
  return request.Post(api.addmenu,params)
}

export function editmenu (params) {
  return request.Post(api.editmenu,params)
}

export function delmenu (params) {
  return request.Post(api.delmenu,params)
}

export function menutree (params) {
  return request.Post(api.menutree,params)
}
