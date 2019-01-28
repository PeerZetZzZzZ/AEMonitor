/* eslint-disable no-param-reassign,no-plusplus */
import * as Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    networkId: global.properties.networkIdMainnet,
  },
  mutations: {
    setNetworkId(state, params) {
      state.networkId = params.networkId;
      console.log('ustawiam', state.networkId);
    },
  },
  actions: {
    setNetworkId(context, params) {
      context.commit('setNetworkId', {
        networkId: params.networkId,
      });
    },
  },
});
