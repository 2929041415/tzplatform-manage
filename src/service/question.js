import request from '../utils/request'
import api from '../utils/api'


export function questionList (params) {
  return request.Post(api.questionList,params)
}

export function addQuestion (params) {
  return request.Post(api.addQuestion,params)
}

export function editQuestion (params) {
  return request.Post(api.editQuestion,params)
}

export function delQuestion (params) {
  return request.Post(api.delQuestion,params)
}
