import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    records: {},
  },
  mutations: {
    initializeStore(state) {
      const records = localStorage.getItem('gameResults');
      if (records) {
        state.records = JSON.parse(records);
      } else {
        state.records = {};
      }
    },
    addRecord(state, payload) {
      state.records[payload.boardName] = payload.result;
      localStorage.setItem('gameResults', JSON.stringify(state.records));
    },
  },
});
