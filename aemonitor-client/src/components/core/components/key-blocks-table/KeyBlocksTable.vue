<template>
    <table class="ui celled selectable small compact stackable table">
        <thead>
        <tr>
            <th>Height (block number)</th>
            <th>Mining date</th>
            <th>Miner (beneficiary)</th>
            <th>Micro blocks</th>
            <th>Transactions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="keyBlock in lastKeyBlocks" :class="{positive: keyBlock.transactionsCount > 0}">
            <td class="collapsing"><a class="tableLinkFont" :href="`https://explorer.aepps.com/#/generation/${keyBlock.height}`" target="_blank">{{keyBlock.height}}</a></td>
            <td>{{formatDate(new Date(keyBlock.time))}}</td>
            <td><span :class="{ 'mobileFont': isMobile}" >{{keyBlock.beneficiary}}</span></td>
            <td>{{keyBlock.microBlocksCount}}</td>
            <td >{{keyBlock.transactionsCount}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
  export default {
    name: 'key-blocks-table',
    props: {
      lastKeyBlocks: {
        type: Array,
        required: true,
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