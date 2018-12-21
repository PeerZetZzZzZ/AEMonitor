export default {
  data() {
    return {
      refetchHandler: null,
    };
  },
  mounted() {
    //MUST BE IMPLEMENTED IN EXTENDED OBJECTS
    this.dataFetch();
    this.refetchHandler = setInterval(this.dataFetch, properties.refetchIntervalMillisecs);
  },
  destroyed() {
    window.clearInterval(this.refetchHandler);
  }
}