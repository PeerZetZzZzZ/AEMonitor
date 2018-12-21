<template>
    <div class="ui stackable padded middle aligned grid mainGrid">
        <div class="row blocksRow">
            <div class="ui stackable middle aligned grid insideGrid">
                <div class="row">
                    <div class="twelve wide column">
                        <h1>Last Transactions [{{lastTransactions.length}}]</h1>
                        <transactions-table :last-transactions="lastTransactions"></transactions-table>
                    </div>
                    <div class="four wide column">
                        <h1 class="ui centered header transactionStatsFont">Transactions stats</h1>
                        <transactions-statistics :last24h-transaction-times="last24hTransactionTimes" :last24h-avg-transaction-fee="last24hAvgTransactionFee"></transactions-statistics>
                    </div>
                </div>
                <div class="row">
                    <div class="eight wide column">
                        <h2>Transactions done [Last 24h]</h2>
                        <last-transactions-per-hour-chart :last24h-transaction-times="last24hTransactionTimes"></last-transactions-per-hour-chart>
                    </div>
                    <div class="eight wide column">
                        <h2>Transaction types [Last 24h]</h2>
                        <transaction-types-chart :last24h-transaction-types="last24hTransactionTypes"></transaction-types-chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import TransactionsMixin from './mixins/transactions-mixin';
  import MicroBlocksInKeyBlocksChart from '../core/components/micro-blocks-in-key-blocks-chart/MicroBlocksInKeyBlocksChart';
  import MinersPieChart from '../core/components/miners-pie-chart/MinersPieChart';
  import LastTransactionsPerHourChart from './components/last-transactions-per-hour-chart/LastTransactionsPerHourChart';
  import TransactionsTable from './components/transactions-table/TransactionsTable';
  import TransactionsStatistics from './components/transactions-statistics/TransactionsStatistics';
  import TransactionTypesChart from './components/transaction-types-chart/TransactionTypesChart';
  import TransactionsViewMobile from './TransactionsViewMobile';
  import TransactionsViewPc from './TransactionsViewPc';

  export default {
    name: 'transactions-view-pc',
    mixins: [TransactionsMixin],
    components: {
      TransactionsViewPc,
      TransactionsViewMobile,
      TransactionTypesChart,
      TransactionsStatistics,
      TransactionsTable,
      LastTransactionsPerHourChart,
      MinersPieChart,
      MicroBlocksInKeyBlocksChart,
    },
  }
</script>
<style scoped>

    .transactionStatsFont {
        font-size: 4rem !important;
        font-weight: 300;
    }

</style>