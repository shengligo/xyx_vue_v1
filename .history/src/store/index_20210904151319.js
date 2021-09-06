import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeIndex:'1'
  },
  mutations: {
    ChangeActive (state,index) {
      // console.log(state,index)
      state.activeIndex = index
    }
  },
  actions: {
  },
  modules: {
  }
})
