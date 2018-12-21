<template>
    <table class="ui celled stackable selectable small compact table">
        <thead>
        <tr>
            <th>Hash</th>
            <th>Block height</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Type</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in lastTransactions">
            <td class="collapsing"><a :class="{ 'mobileFont': isMobile}" class="tableLinkFont" :href="`https://explorer.aepps.com/#/tx/${transaction.hash}`" target="_blank">{{transaction.hash}}</a></td>
            <td class="collapsing">{{transaction.block_height}}</td>
            <td class="collapsing">{{toAe(transaction.amount)}} AE</td>
            <td class="collapsing">{{toAe(transaction.fee)}} AE</td>
            <td class="collapsing"><div :class="getLabelClass(transaction.type)">{{transaction.type}}</div></td>
        </tr>
        </tbody>
    </table>
</template>
<script>
  export default {
    name: 'transactions-table',
    props: {
      lastTransactions: {
        type: Array,
        required: true,
      },
    },
    methods: {
      getLabelClass(transactionType) {
        switch(transactionType) {
          case this.transactionTypes.transactionContractCallTx:
            return 'ui brown label';
          case this.transactionTypes.transactionContractCreateTx:
            return 'ui blue label';
          case this.transactionTypes.transactionSpendTx:
            return 'ui violet label';
          case this.transactionTypes.transactionNamePreclaimTx:
            return 'ui olive label';
          case this.transactionTypes.transactionNameClaimTx:
            return 'ui teal label';
          case this.transactionTypes.transactionNameUpdateTx:
            return 'ui purple label';
          case this.transactionTypes.transactionOracleRegisterTx:
            return 'ui red label';
          case this.transactionTypes.transactionOracleExtendTx:
            return 'ui orange label';
          case this.transactionTypes.transactionOracleResponseTx:
            return 'ui pink label';
          case this.transactionTypes.transactionOracleQueryTx:
            return 'ui grey label';
          case this.transactionTypes.transactionChannelCreateTx:
            return 'ui black label';

        }
      }
    },
  };
</script>
<style scoped>
    table thead tr {
        background-color: var(--colorExciting);
    }

    .mobileFont {
        font-size: 0.7rem;
    }
</style>