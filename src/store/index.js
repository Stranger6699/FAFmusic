import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicList:[]
  },
  getters: {
  },
  mutations: {
    musicList(state, data){
      this.state.musicList = data
    },
  },
  actions: {
  },
  modules: {
  }
})
