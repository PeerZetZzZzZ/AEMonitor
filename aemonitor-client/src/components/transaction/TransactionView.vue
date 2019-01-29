<template>
    <div class="ui stackable padded middle aligned grid mainGrid">
        <div class="row blocksRow">
            <div class="sixteen wide column">
                <div class="ui stackable middle aligned grid insideGrid">
                    <div class="row">
                        <div class="sixteen wide column">
                            <div class="ui button" @click="$router.push('/transactions')">
                                <i class="angle left icon"></i>
                                Back
                            </div>
                            <h1 class="ui header">
                                <span v-show="!isMobile">{{this.$route.params.transactionHash}}</span>
                                <div class="sub header">
                                    <span style="color: var(--colorDramatic)">Transaction info</span>
                                </div>
                            </h1>
                            <transaction-info-table :transaction="transaction" v-if="transaction !== null"></transaction-info-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import TransactionsMixin from '../transactions/mixins/transactions-mixin';
  import LastTransactionsPerHourChart from '../transactions/components/last-transactions-per-hour-chart/LastTransactionsPerHourChart';
  import TransactionsTable from '../transactions/components/transactions-table/TransactionsTable';
  import TransactionsStatistics from '../transactions/components/transactions-statistics/TransactionsStatistics';
  import TransactionTypesChart from '../transactions/components/transaction-types-chart/TransactionTypesChart';
  import TransactionsViewMobile from '../transactions/TransactionsViewMobile';
  import TransactionsViewPc from '../transactions/TransactionsViewPc';
  import TransactionsStatsTimeframeDropdown
    from '../transactions/components/transactions-done-timeframe-dropdown/TransactionsStatsTimeframeDropdown';
  import { getTransactionInfo } from './services/transaction-http-service';
  import TransactionInfoTable from './components/transaction-info-table/TransactionInfoTable';

  export default {
    name: 'transaction-view',
    mixins: [TransactionsMixin],
    components: {
      TransactionInfoTable,
      TransactionsStatsTimeframeDropdown,
      TransactionsViewPc,
      TransactionsViewMobile,
      TransactionTypesChart,
      TransactionsStatistics,
      TransactionsTable,
      LastTransactionsPerHourChart,
    },
    data() {
      return {
        transaction: null,
      };
    },
    mounted() {
      getTransactionInfo(this.$route.params.networkId, this.$route.params.transactionHash).subscribe((res) => {
        this.transaction = res.data;
      });
    }
  }
</script>
<style scoped>

    .transactionStatsFont {
        font-size: 4rem !important;
        font-weight: 300;
    }

</style>