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
            <td class="collapsing">
                <a @click="goToTransactionView(transaction)" :class="{ 'mobileFont': isMobile}" class="tableLinkFont cursorPointer"> {{transaction.hash}} </a>
            </td>
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
      goToTransactionView(transaction) {
        this.$router.push(`/transaction/${this.networkId}/${transaction.hash}`);
      },
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