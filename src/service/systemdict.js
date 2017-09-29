import request from '../utils/request'
import api from '../utils/api'

export function typeList (params) {
  return request.Post(api.dictlist,params)
}

export function adddict (params) {
  return request.Post(api.adddict,params)
}

export function editdict (params) {
  return request.Post(api.editdict,params)
}

export function deldict (params) {
  return request.Post(api.deldict,params)
}

export function dictvaluelist (params) {
  return request.Post(api.dictvaluelist,params)
}
