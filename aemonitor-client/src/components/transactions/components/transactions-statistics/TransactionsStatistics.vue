<template>
    <div class="ui stackable center aligned  grid">
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui statistic" :class="isMobile ? 'tiny' : 'small'">
                    <div class="value">
                        <i class="random icon"></i> {{last24hTransactionQuantity}}
                    </div>
                    <div class="label">
                        Transactions done [{{timeFrame.name}}]
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui statistic" :class="isMobile ? 'tiny' : 'small'">
                    <div class="value">
                        <i class="retweet icon"></i> {{Number(last24hAvgTransactionsPerGeneration).toFixed(2)}}
                    </div>
                    <div class="label">
                        Avg trans. / generation [{{timeFrame.name}}]
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui mini statistic">
                    <div class="value">
                        <i class="money bill alternate icon"></i> {{last24hAvgTransactionFee}} AE
                    </div>
                    <div class="label">
                        Avg fee [{{timeFrame.name}}]
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>

  export default {
    name: 'transactions-statistics',
    props: {
      timeFrame: {
        type: Object,
        required: true,
      },
      last24hTransactionTimes: {
        type: Array,
        required: true,
      },
      last24hAvgTransactionFee: {
        type: String,
        required: true,
      },
      last24hAvgTransactionsPerGeneration: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        last24hTransactionQuantity: 0,
      };
    },
    watch: {
      last24hTransactionTimes() {
        this.last24hTransactionQuantity = this.last24hTransactionTimes.length;
      },
    }
  }
</script>