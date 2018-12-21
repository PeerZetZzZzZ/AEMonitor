<template>
    <div class="ui stackable padded middle aligned grid mainGrid">
        <div class="row">
            <div class="sixteen wide column">
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
            <div class="sixteen wide column">
                <h2 class="ui header">Micro Blocks in Key Blocks</h2>
                <micro-blocks-in-key-blocks-chart :last-key-blocks="lastKeyBlocks"></micro-blocks-in-key-blocks-chart>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <h2 class="ui header">Top miners % [last 24h]</h2>
                <miners-pie-chart :last24h-miners-percentage="last24hMinersPercentage"></miners-pie-chart>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <h1 class="ui header">Last Key Blocks [{{lastKeyBlocks.length}}]</h1>
                <key-blocks-table :last-key-blocks="lastKeyBlocks"></key-blocks-table>
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
    name: 'core-view-mobile',
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

    .mainGrid {
        box-shadow: 0px 0px 25px var(--colorDramatic);
        background-color: white;
        border: 1px solid var(--colorDramatic);
    }

    .coreStatsHeader {
        color: var(--colorExciting) !important;
        font-weight: 300;
        font-size: 3rem !important;
    }
</style>