import {
  getLast24hAvgTransactionFee,
  getLast24hTransactionTimes,
  getLast24hTransactionTypes,
  getLastTransactions
} from '../services/transactions-http-service';
import RefetchMixin from '../../../mixins/refetch-mixin';

export default {
  mixins: [RefetchMixin],
  data() {
    return {
      lastTransactions: [],
      last24hTransactionTimes: [],
      last24hTransactionTypes: [],
      last24hAvgTransactionFee: '0',
    };
  },
  methods: {
    //RefetchMixin
    dataFetch() {
      console.log('Fetching transactions data.');
      getLastTransactions().subscribe((res) => {
        this.lastTransactions = res.data;
      });
      getLast24hTransactionTimes().subscribe((res) => {
        this.last24hTransactionTimes = res.data;
      });
      getLast24hTransactionTypes().subscribe((res) => {
        this.last24hTransactionTypes = res.data;
      });
      getLast24hAvgTransactionFee().subscribe((res) => {
        this.last24hAvgTransactionFee = this.toAe(res.data.avgFee);
      });
    },
  },
}