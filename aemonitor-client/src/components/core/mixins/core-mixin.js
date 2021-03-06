import {
  getBlockDifficulty,
  getBlockReward,
  getLast1hAvgBlockTime,
  getLast24hMinersPercentage,
  getLastKeyBlocks
} from '../services/core-http-service';
import RefetchMixin from '../../../mixins/refetch-mixin';

export default {
  mixins: [RefetchMixin],
  data() {
    return {
      lastKeyBlocks: [],
      blockDifficulty: 0,
      last1hAvgBlockTime: 0,
      last24hMinersPercentage: [],
      blockReward: 0,
    };
  },
  methods: {
    //RefetchMixin
    dataFetch() {
      console.log('Fetching core data.');
      getLastKeyBlocks(this.$store.state.networkId).subscribe((res) => {
        this.lastKeyBlocks = res.data;
        getBlockReward(this.lastKeyBlocks[0].height).subscribe((res) => {
          this.blockReward = res.data.blockReward;
        });
      });
      getBlockDifficulty(this.$store.state.networkId).subscribe((res) => {
        this.blockDifficulty = res.data.difficulty;
      });
      getLast1hAvgBlockTime(this.$store.state.networkId).subscribe((res) => {
        this.last1hAvgBlockTime = res.data.last1hAvgBlockTime;
      });
      getLast24hMinersPercentage(this.$store.state.networkId).subscribe((res) => {
        this.last24hMinersPercentage = res.data;
      });
    },
  }

}