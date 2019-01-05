import HttpService from '../../../api/utils/http-service';

export function getLastTransactions() {
  return HttpService.get('/api/getLastTransactions');
}

export function getLast24hTransactionTypes(timeFrame) {
  return HttpService.get(`/api/getLast24hTransactionTypes?timeFrame=${timeFrame}`);
}

export function getLast24hTransactionTimes(timeFrame) {
  return HttpService.get(`/api/getLast24hTransactionTimes?timeFrame=${timeFrame}`);
}

export function getLast24hAvgTransactionFee(timeFrame) {
  return HttpService.get(`/api/getLast24hAvgTransactionFee?timeFrame=${timeFrame}`);
}


export function getLast24hAvgTransactionsPerGeneration(timeFrame) {
  return HttpService.get(`/api/getLast24hAvgTransactionsPerGeneration?timeFrame=${timeFrame}`);
}
