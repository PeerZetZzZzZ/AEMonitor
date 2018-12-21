<template>
    <table class="ui celled selectable stackable table">
        <thead>
        <tr>
            <th>Exchange name</th>
            <th>Trading pair</th>
            <th>Volume (24h)</th>
            <th>Last price</th>
            <th>Date</th>
            <th>Market url</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tokenExchange in tokenExchanges">
            <td class="collapsing">{{tokenExchange.exchange_name}}</td>
            <td>AE/{{tokenExchange.target_currency}}</td>
            <td>{{new Number(tokenExchange.volume_24).toFixed(4)}} AE</td>
            <td>{{new Number(tokenExchange.price).toFixed(6)}} {{tokenExchange.target_currency}}</td>
            <td>{{formatDate(new Date(tokenExchange.update_date))}}</td>
            <td><a :href="tokenExchange.market_url" :class="{ 'mobileFont': isMobile}">{{tokenExchange.market_url}}</a></td>
        </tr>
        </tbody>
    </table>
</template>
<script>
  export default {
    name: 'token-exchanges-table',
    props: {
      tokenExchanges: {
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