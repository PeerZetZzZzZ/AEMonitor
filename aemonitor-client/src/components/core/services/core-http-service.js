import HttpService from '../../../api/utils/http-service';

export function getLastKeyBlocks(networkId) {
  return HttpService.get(`/api/${networkId}/getLastKeyBlocks`);
}

export function getLast24hMinersPercentage(networkId) {
  return HttpService.get(`/api/${networkId}/getLast24hMinersPercentage`);
}

export function getBlockDifficulty(networkId) {
  return HttpService.get(`/api/${networkId}/getBlockDifficulty`);
}

export function getBlockReward(currentBlockNumber) {
  return HttpService.get(`/api/getBlockReward/${currentBlockNumber}`);
}

export function getLast1hAvgBlockTime(networkId) {
  return HttpService.get(`/api/${networkId}/getLast1hAvgBlockTime`);
}


