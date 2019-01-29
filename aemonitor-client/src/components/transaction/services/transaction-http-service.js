import HttpService from '../../../api/utils/http-service';

export function getTransactionInfo(networkId, transactionHash) {
  return HttpService.get(`/api/transactionInfo/${networkId}/${transactionHash}`);
}
