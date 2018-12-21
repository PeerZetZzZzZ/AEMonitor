<template>
    <div class="ui stackable center aligned  grid">
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui statistic" :class="isMobile ? 'tiny' : 'small'">
                    <div class="value">
                        <i class="arrow up icon"></i> {{blockHeight}}
                    </div>
                    <div class="label">
                        Block height
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui statistic" :class="isMobile ? 'tiny' : 'small'">
                    <div class="value">
                        <i class="cogs icon"></i> {{blockDifficulty}}
                    </div>
                    <div class="label">
                        Block difficulty
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui statistic" :class="isMobile ? 'tiny' : 'small'">
                    <div class="value">
                        <i class="gift icon"></i> {{blockReward}} AE
                    </div>
                    <div class="label">
                        Block reward
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui statistic" :class="isMobile ? 'tiny' : 'small'">
                    <div class="value">
                        <i class="stopwatch icon"></i> {{Number(last1hAvgBlockTime).toFixed(2)}} min
                    </div>
                    <div class="label">
                        Avg block mine time [Last 1h]
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    export default {
      name: 'block-statistics',
      props: {
        lastKeyBlocks: {
          type: Array,
          required: true,
        },
        blockDifficulty: {
          type: Number,
          required: true,
        },
        last1hAvgBlockTime: {
          type: Number,
          required: true,
        },
        blockReward: {
          type: Number,
          required: true,
        },
      },
      data() {
        return {
          blockHeight: 0,
        };
      },
      watch: {
        lastKeyBlocks() {
          this.blockHeight = this.lastKeyBlocks[0].height;
        },
      }
    }
</script>