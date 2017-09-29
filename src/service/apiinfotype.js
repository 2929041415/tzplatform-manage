import request from '@/utils/request'
import api from '@/utils/api'


export function apitypeList (params) {
  return request.Post(api.apitypeList,params)
}
export function addApi (params) {
  return request.Post(api.addApi,params)
}
export function editApi (params) {
  return request.Post(api.editApi,params)
}
export function deleteApi (params) {
  return request.Post(api.deleteApi,params)
}
export function apiManagerList(params) {
  return request.Post(api.apiManagerList,params);
}
export function addApiManager(params) {
  return request.Post(api.addApiManager,params);
}
export function editApiManager(params) {
  return request.Post(api.editApiManager,params);
}
export function deleteApiManager(params) {
  return request.Post(api.deleteApiManager,params);
}
export function statisticsApi(params){
  return request.Post(api.statisticsApi,params);
}
export function querynoticeList(params){
  return request.Post(api.querynoticelist,params)
}
export function addnotice(params){
  return request.Post(api.addnotice,params)
}
export function updatenotice(params){
  return request.Post(api.updatenotice,params)
}
export function deletenotice(params){
  return request.Post(api.deletenotice,params)
}
