<template>
    <canvas id="transactionsCountChartId"></canvas>
</template>
<script>
  import Chart from 'chart.js';

  export default {
    name: 'micro-blocks-in-key-blocks-chart',
    components: {},
    props: {
      lastKeyBlocks: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        chartInitialized: false,
        char: null,
      };
    },
    mounted() {
    },
    computed: {
    },
    watch: {
      lastKeyBlocks() {
        const labels = this.lastKeyBlocks.map(lastKeyBlock => new String(lastKeyBlock.height)).reverse();
        const data = this.lastKeyBlocks.map(lastKeyBlock => lastKeyBlock.microBlocksCount).reverse();
        this.createChart(labels, data);
      }
    },
    methods: {
      createChart(labels, data) {
        var ctx = document.getElementById('transactionsCountChartId');
        const aspectRatio = this.chartsAspectRatio;
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Micro Blocks in Key Blocks',
              data: data,
              borderWidth: 1,
              backgroundColor: data.map(dataEntry => '#311B58')
            }]
          },
          options: {
            aspectRatio: aspectRatio,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontColor: "black",
                  beginAtZero: true,
                  fontSize: 10,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Key Blocks',
                  fontFamily: 'Roboto',
                  fontColor: '#F7296E',
                  fontSize: 15,
                },
                gridLines: {
                  display: true,
                  color: '#311B58'
                }
              }],
              yAxes: [{
                ticks: {
                  fontColor: "black",
                  beginAtZero: true,
                  fontSize: 10,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Micro Blocks',
                  fontFamily: 'Roboto',
                  fontColor: '#F7296E',
                  fontSize: 15,
                },
                gridLines: {
                  display: true,
                  color: '#311B58'
                }
              }]

            }
          }
        });
      },
    },
  };
</script>
<style scoped>
    #transactionsCountChartId {
        /*height: 80% !important;*/
        /*width: 100%;*/
    }
</style>