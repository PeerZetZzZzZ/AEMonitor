import HttpService from '../../../api/utils/http-service';

export function getNetworkId() {
  return HttpService.get('/api/getNetworkId');
}