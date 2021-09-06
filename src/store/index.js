import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeIndex:'1',
    baceUrl: 'http://10.1.2.85:8091/'
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
