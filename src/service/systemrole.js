import request from '../utils/request'
import api from '../utils/api'

export function rolelist (params) {
  return request.Post(api.rolelist,params)
}

export function addrole (params) {
  return request.Post(api.addrole,params)
}

export function editrole (params) {
  return request.Post(api.editrole,params)
}

export function delrole (params) {
  return request.Post(api.delrole,params)
}

export function getresourcebyrole (params) {
  return request.Post(api.getresourcebyrole,params)
}

