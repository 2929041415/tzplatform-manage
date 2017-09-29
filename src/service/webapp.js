import request from '../utils/request'
import api from '../utils/api'

export function addapp (params) {
  return request.PostFile(api.addapp,params)
}

export function editapp (params) {
  return request.PostFile(api.editapp,params)
}

export function applist(params) {
  return request.Post(api.applist,params)
}

export function appdetail(params) {
  return request.Post(api.webDetailInfo,params)
}

