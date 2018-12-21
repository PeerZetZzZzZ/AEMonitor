/* eslint-disable no-unused-vars,max-len */
import axios from 'axios';
import { from } from 'rxjs';

export default {
  get(url) {
    return from(axios.get(url, {
      withCredentials: true,
    }));
  },
  post(url, data) {
    return Observable.from(axios.post(url, data, {
      withCredentials: true,
    }));
  },
};
