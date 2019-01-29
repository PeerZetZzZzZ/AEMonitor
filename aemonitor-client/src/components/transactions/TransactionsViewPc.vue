<template>
    <div class="ui stackable padded middle aligned grid mainGrid">
        <div class="row blocksRow">
            <div class="sixteen wide column">
                <div class="ui stackable middle aligned grid insideGrid">
                    <div class="row">
                        <div class="twelve wide column">
                            <h1 class="ui header">Last Transactions [{{lastTransactions.length}}]</h1>
                            <transactions-table :last-transactions="lastTransactions"></transactions-table>
                        </div>
                        <div class="four wide center aligned column">
                            <h1 class="ui centered header transactionStatsFont">Transactions stats</h1>
                            <transactions-stats-timeframe-dropdown
                                    :on-value-change-callback="onTransactionTimeframeChangeCallback"
                                    style="margin-bottom: 2%;">
                            </transactions-stats-timeframe-dropdown>
                            <transactions-statistics
                                    :time-frame="timeFrame"
                                    :last24h-transaction-times="last24hTransactionTimes"
                                    :last24h-avg-transaction-fee="last24hAvgTransactionFee"
                                    :last24h-avg-transactions-per-generation="last24hAvgTransactionsPerGeneration"
                            ></transactions-statistics>
                            <h1 class="ui centered header transactionStatsFont">Search</h1>
                            <search-transaction-form></search-transaction-form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="eight wide column">
                            <h2 class="ui header">Transactions done [{{timeFrame.name}}]</h2>
                            <last-transactions-per-hour-chart
                                    :time-frame="timeFrame"
                                    :last24h-transaction-times="last24hTransactionTimes">
                            </last-transactions-per-hour-chart>
                        </div>
                        <div class="eight wide column">
                            <h2 class="ui header">Transaction types [{{timeFrame.name}}]</h2>
                            <transaction-types-chart :last24h-transaction-types="last24hTransactionTypes"></transaction-types-chart>
                        </div>
                    </div>
                </div>
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
  import TransactionsStatsTimeframeDropdown
    from './components/transactions-done-timeframe-dropdown/TransactionsStatsTimeframeDropdown';
  import SearchTransactionForm from '../transactions/components/search-transaction-form/SearchTransactionForm';

  export default {
    name: 'transactions-view-pc',
    mixins: [TransactionsMixin],
    components: {
      TransactionsStatsTimeframeDropdown,
      TransactionsViewPc,
      TransactionsViewMobile,
      TransactionTypesChart,
      TransactionsStatistics,
      TransactionsTable,
      LastTransactionsPerHourChart,
      SearchTransactionForm
    },
  }
</script>
<style scoped>

    .transactionStatsFont {
        font-size: 4rem !important;
        font-weight: 300;
    }

</style>