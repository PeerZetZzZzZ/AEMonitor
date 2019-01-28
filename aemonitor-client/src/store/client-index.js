import store from './index';

export function setNetworkId(networkId) {
  store.dispatch('setNetworkId', {
    networkId,
  });
}