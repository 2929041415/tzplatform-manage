import * as types from '../mutation-types'
import * as actiontypes from '../action-types'
import {questionList} from '../../service/question'

/* 初始化帐号数据 */
const state = {
  addmodalstatus: false,
  questiontype: [],
  questionlist: [],
  editobj:{
    id:'',
    question:'',
    answer:'',
    questiontype:''
  },
  editmodalstatus: false,
  selecttype:'',
  totalNumber:0
}

const mutations = {
  [types.QUESTION_ADD_MODAL](state, data) {
    state.addmodalstatus = data
  },
  [types.QUESTION_EDIT_MODAL](state, data) {
    state.editmodalstatus = data
  },
  [types.QUESTION_DATA_LIST](state, data) {
    state.questionlist = data
  },
  [types.QUESTION_TYPE_LIST](state, data) {
    state.questiontype = data
  },
  [types.CHANGE_QUESTION_ID](state, data) {
    state.editobj.id = data
  },
  [types.CHANGE_QUESTION_QUESTION](state, data) {
    state.editobj.question = data
  },
  [types.CHANGE_QUESTION_ANSWER](state, data) {
    state.editobj.answer = data
  },
  [types.CHANGE_QUESTION_QUESTIONTYPE](state, data) {
    state.editobj.questiontype = data
  },
  [types.RESET_QUESTION_DATA](state) {
    state.editobj.id = ''
    state.editobj.question = ''
    state.editobj.answer = ''
    state.editobj.questiontype = ''
  },
  [types.UPDATE_QUESTION_DATA](state,data) {
    state.editobj.id = data.id
    state.editobj.question = data.question
    state.editobj.answer = data.answer
    state.editobj.questiontype = data.questiontype
  },
  [types.QUESTION_SELECT_TYPE](state,data) {
    state.selecttype = data
  },
  [types.QUESTION_TOTAL_NUMBER](state,data) {
    state.totalNumber = data
  }
}

const actions = {
  [actiontypes.QUESTION_DATA_LIST]({commit}, data) {
    questionList(data).then(value => {
      const result = value.data
      commit(types.QUESTION_TOTAL_NUMBER, value.total)
      if (result.length > 0) {
        commit(types.QUESTION_DATA_LIST, result)
      }else{
        commit(types.QUESTION_DATA_LIST, [])
      }
    })
  }
}

export default {
  state,
  actions,
  mutations
}
