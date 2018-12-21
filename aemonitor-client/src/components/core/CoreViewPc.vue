<template>
    <div class="ui stackable padded middle aligned grid">
        <div class="row blocksRow">
            <div class="sixteen wide column">
                <div class="ui stackable middle aligned grid insideGrid">
                    <div class="row">
                        <div class="twelve wide column">
                            <h1 class="ui header">Last Key Blocks [{{lastKeyBlocks.length}}]</h1>
                            <key-blocks-table :last-key-blocks="lastKeyBlocks"></key-blocks-table>
                        </div>
                        <div class="four wide column">
                            <h1 class="ui centered header coreStatsHeader">Core stats</h1>
                            <block-statistics
                                    :last-key-blocks="lastKeyBlocks"
                                    :block-difficulty="blockDifficulty"
                                    :last1h-avg-block-time="last1hAvgBlockTime"
                                    :block-reward="blockReward">
                            </block-statistics>
                        </div>
                    </div>
                    <div class="row">
                        <div class="eight wide column">
                            <h2 class="ui header">Micro Blocks in Key Blocks</h2>
                            <micro-blocks-in-key-blocks-chart :last-key-blocks="lastKeyBlocks"></micro-blocks-in-key-blocks-chart>
                        </div>
                        <div class="eight wide column">
                            <h2 class="ui header">Top miners % [Last 24h]</h2>
                            <miners-pie-chart :last24h-miners-percentage="last24hMinersPercentage"></miners-pie-chart>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
  import KeyBlocksTable from './components/key-blocks-table/KeyBlocksTable';
  import MicroBlocksInKeyBlocksChart from './components/micro-blocks-in-key-blocks-chart/MicroBlocksInKeyBlocksChart';
  import MinersPieChart from './components/miners-pie-chart/MinersPieChart';
  import BlockStatistics from './components/blocks-statistics/BlocksStatistics';
  import CoreMixin from './mixins/core-mixin';

  export default {
    name: 'core-view-pc',
    mixins: [CoreMixin],
    components: {
      BlockStatistics,
      MinersPieChart,
      MicroBlocksInKeyBlocksChart,
      KeyBlocksTable
    },
  }
</script>
<style scoped>

    .coreStatsHeader {
        font-weight: 300;
        font-size: 4rem !important;
    }
</style>