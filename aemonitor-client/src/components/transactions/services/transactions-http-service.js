import HttpService from '../../../api/utils/http-service';

export function getLastTransactions() {
  return HttpService.get('/api/getLastTransactions');
}

export function getLast24hTransactionTypes() {
  return HttpService.get('/api/getLast24hTransactionTypes');
}

export function getLast24hTransactionTimes() {
  return HttpService.get('/api/getLast24hTransactionTimes');
}

export function getLast24hAvgTransactionFee() {
  return HttpService.get('/api/getLast24hAvgTransactionFee');
}


export function getLast24hAvgTransactionsPerGeneration() {
  return HttpService.get('/api/getLast24hAvgTransactionsPerGeneration');
}
