<template>
    <transactions-view-mobile v-if="isMobile"></transactions-view-mobile>
    <transactions-view-pc v-else></transactions-view-pc>
</template>
<script>

  import TransactionsViewMobile from './TransactionsViewMobile';
  import TransactionsViewPc from './TransactionsViewPc';

  export default {
    name: 'transactions-view',
    components: {TransactionsViewPc, TransactionsViewMobile},
  }
</script>