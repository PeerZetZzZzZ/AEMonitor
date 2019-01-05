import {
  getLast24hAvgTransactionFee, getLast24hAvgTransactionsPerGeneration,
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
      last24hAvgTransactionsPerGeneration: 0,
      onTransactionTimeframeChangeCallback: () => {
      },
      timeFrame: properties.timeFrame24h,
    };
  },
  methods: {
    //RefetchMixin
    dataFetch() {
      console.log('Fetching transactions data.');
      getLastTransactions().subscribe((res) => {
        this.lastTransactions = res.data;
      });
      this.getTimeFramedData();
    },
    getTimeFramedData() {
      getLast24hTransactionTimes(this.timeFrame.value).subscribe((res) => {
        this.last24hTransactionTimes = res.data;
      });
      getLast24hTransactionTypes(this.timeFrame.value).subscribe((res) => {
        this.last24hTransactionTypes = res.data;
      });
      getLast24hAvgTransactionFee(this.timeFrame.value).subscribe((res) => {
        this.last24hAvgTransactionFee = this.toAe(res.data.avgFee);
      });
      getLast24hAvgTransactionsPerGeneration(this.timeFrame.value).subscribe((res) => {
        this.last24hAvgTransactionsPerGeneration = res.data.last24hAvgTransactionsPerGeneration;
      });
    }
  },
  mounted() {
    this.onTransactionTimeframeChangeCallback = (newTimeFrame) => {
      this.timeFrame = newTimeFrame;
      this.getTimeFramedData();
    }
  },
}