export default {
  data() {
    return {
      refetchHandler: null,
    };
  },
  computed: {
    networkId() {
      return this.$store.state.networkId;
    },
  },
  mounted() {
    this.fetchForNewNetwork();
  },
  destroyed() {
    window.clearInterval(this.refetchHandler);
  },
  methods: {
    fetchForNewNetwork() {
      //MUST BE IMPLEMENTED IN EXTENDED OBJECTS
      this.dataFetch();
      this.refetchHandler = setInterval(this.dataFetch, properties.refetchIntervalMillisecs);
    }
  },
  watch: {
    networkId() {
      //is implemented in refetch-mixin
      this.fetchForNewNetwork();
      console.log('networkId', this.networkId);
    },
  },
}