<template>
    <div class="ui stackable padded middle aligned grid insideGrid">
        <div class="row borderedRow">
            <div class="sixteen wide column">
                <h1 class="ui centered header transactionStatsFont">Transactions stats</h1>
                <transactions-statistics :last24h-transaction-times="last24hTransactionTimes" last24h-avg-transaction-fee="last24hAvgTransactionFee"></transactions-statistics>
            </div>
        </div>
        <div class="row borderedRow">
            <div class="sixteen wide column">
                <h2 class="ui header">Transactions done [Last 24h]</h2>
                <last-transactions-per-hour-chart :last24h-transaction-times="last24hTransactionTimes"></last-transactions-per-hour-chart>
            </div>
        </div>
        <div class="row borderedRow">
            <div class="sixteen wide column">
                <h2>Transaction types [Last 24h]</h2>
                <transaction-types-chart :last24h-transaction-types="last24hTransactionTypes"></transaction-types-chart>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <h1>Last Transactions [{{lastTransactions.length}}]</h1>
                <transactions-table :last-transactions="lastTransactions"></transactions-table>
            </div>
        </div>
    </div>
</template>
<script>
  import TransactionsMixin from './mixins/transactions-mixin';
  import LastTransactionsPerHourChart from './components/last-transactions-per-hour-chart/LastTransactionsPerHourChart';
  import TransactionsTable from './components/transactions-table/TransactionsTable';
  import TransactionsStatistics from './components/transactions-statistics/TransactionsStatistics';
  import TransactionTypesChart from './components/transaction-types-chart/TransactionTypesChart';
  import TransactionsViewMobile from './TransactionsViewMobile';
  import TransactionsViewPc from './TransactionsViewPc';

  export default {
    name: 'transactions-view-mobile',
    mixins: [TransactionsMixin],
    components: {
      TransactionsViewPc,
      TransactionsViewMobile,
      TransactionTypesChart,
      TransactionsStatistics,
      TransactionsTable,
      LastTransactionsPerHourChart,
    },
  }
</script>
<style scoped>

    .transactionStatsFont {
        font-size: 3rem !important;
        font-weight: 300;
    }

    .borderedRow {
        border-bottom: 1px solid var(--colorExciting);
    }
</style>