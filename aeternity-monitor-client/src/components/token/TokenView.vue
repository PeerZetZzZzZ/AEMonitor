<template>
    <div class="ui stackable padded middle aligned grid">
        <div class="row blocksRow">
            <div class="sixteen wide column">
                <div class="ui stackable middle aligned grid insideGrid fullScreenGrid">
                    <div class="row">
                        <div class="sixteen wide column">
                            <h1 class="ui header coreStatsHeader">AE token exchanges</h1>
                            <token-exchanges-table :token-exchanges="tokenExchanges"></token-exchanges-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import TokenExchangesTable from './components/token-exchanges-table/TokenExchangesTable';
  import { getTokenExchanges } from './components/services/token-http-service';
  import RefetchMixin from '../../mixins/refetch-mixin';

  export default {
    name: 'token-view',
    mixins: [RefetchMixin],
    components: {TokenExchangesTable},
    data() {
      return {
        tokenExchanges: [],
      };
    },
    methods: {
      //Refetech Mixin
      dataFetch() {
        console.log('Fetching token data.');
        getTokenExchanges().subscribe((res) => {
          this.tokenExchanges = res.data;
        });
      }
    },
  }
</script>
<style scoped>
</style>