import HttpService from '../../../api/utils/http-service';

export function getLastKeyBlocks() {
  return HttpService.get('/api/getLastKeyBlocks');
}

export function getLast24hMinersPercentage() {
  return HttpService.get('/api/getLast24hMinersPercentage');
}

export function getBlockDifficulty() {
  return HttpService.get('/api/getBlockDifficulty');
}

export function getBlockReward(currentBlockNumber) {
  return HttpService.get(`/api/getBlockReward/${currentBlockNumber}`);
}

export function getLast1hAvgBlockTime() {
  return HttpService.get('/api/getLast1hAvgBlockTime');
}


