export default {
  data() {
    return {
      chartInitialized: false,
      chart: null,
    };
  },
  methods: {
    updateChart(labels, data) {
      if (!this.chartInitialized) {
        this.createChart(labels, data); //must be implemented in objects
        this.chartInitialized = true;
      } else {
        this.chart.data.labels = labels;
        this.chart.data.datasets.forEach((dataset) => {
          dataset.data = data;
        });
        this.chart.update();
      }
    }
  }
};