import HttpService from '../../../../api/utils/http-service';

export function getTokenExchanges() {
  return HttpService.get('/api/getTokenExchanges');
}
