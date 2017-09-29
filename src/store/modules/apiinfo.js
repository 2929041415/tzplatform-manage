import * as types from '../mutation-types'

const state={
  apiinfoObj:{
  }
}
const mutations={
  [types.APIINFO_OBJ_EDIT](state,data){
    state.apiinfoObj=data;
    window.sessionStorage.apiinfoData=JSON.stringify(data);
  }

}
const actions={
  [types.APIINFO_OBJ_EDIT](context){
    context.commit(types.APIINFO_OBJ_EDIT,apiinfoObj)
  }
}

export default {
  state,
  actions,
  mutations
}
