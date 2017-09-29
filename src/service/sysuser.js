import request from '../utils/request'
import api from '../utils/api'

export function sysuserlist (params) {
  return request.Post(api.sysuserlist,params)
}

export function addsysuser (params) {
  return request.Post(api.addsysuser,params)
}

export function editsysuser (params) {
  return request.Post(api.editsysuser,params)
}

export function delsysuser (params) {
  return request.Post(api.delsysuser,params)
}

export function checksysuser (params) {
  return request.Post(api.checkUserInSystem,params)
}

export function getrolebyuser (params) {
  return request.Post(api.getRoleByUser,params)
}

export function resetPwd (params) {
  return request.Post(api.resetPwd,params)
}

export function getResourcesByUser (params) {
  return request.Post(api.getResourcesByUser,params)
}

export function updatePassword(params){
  return request.Post(api.updatePassword,params)
}
