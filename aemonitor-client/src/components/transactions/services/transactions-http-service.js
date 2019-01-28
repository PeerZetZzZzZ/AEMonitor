import HttpService from '../../../api/utils/http-service';

export function getLastTransactions(networkId) {
  return HttpService.get(`/api/${networkId}/getLastTransactions`);
}

export function getLast24hTransactionTypes(networkId, timeFrame) {
  return HttpService.get(`/api/${networkId}/getLast24hTransactionTypes?timeFrame=${timeFrame}`);
}

export function getLast24hTransactionTimes(networkId, timeFrame) {
  return HttpService.get(`/api/${networkId}/getLast24hTransactionTimes?timeFrame=${timeFrame}`);
}

export function getLast24hAvgTransactionFee(networkId, timeFrame) {
  return HttpService.get(`/api/${networkId}/getLast24hAvgTransactionFee?timeFrame=${timeFrame}`);
}


export function getLast24hAvgTransactionsPerGeneration(networkId, timeFrame) {
  return HttpService.get(`/api/${networkId}/getLast24hAvgTransactionsPerGeneration?timeFrame=${timeFrame}`);
}
