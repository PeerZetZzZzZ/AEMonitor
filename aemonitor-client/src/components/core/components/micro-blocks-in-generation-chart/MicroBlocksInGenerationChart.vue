<template>
    <canvas id="microBlocksInGenerationChartId"></canvas>
</template>
<script>
  import Chart from 'chart.js';
  import ChartMixin from '../../../../mixins/chart-mixin';

  export default {
    name: 'micro-blocks-in-generation-chart',
    mixins: [ChartMixin],
    components: {},
    props: {
      lastKeyBlocks: {
        type: Array,
        required: true,
      },
    },
    watch: {
      lastKeyBlocks() {
        const labels = this.lastKeyBlocks.map(lastKeyBlock => new String(lastKeyBlock.height)).reverse();
        const data = this.lastKeyBlocks.map(lastKeyBlock => lastKeyBlock.microBlocksCount).reverse();
        this.updateChart(labels, data);
      }
    },
    methods: {
      createChart(labels, data) {
        var ctx = document.getElementById('microBlocksInGenerationChartId');
        const aspectRatio = this.chartsAspectRatio;
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Micro blocks in generation key block',
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
                  labelString: 'Generation key block height',
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
                  labelString: 'Number of micro blocks in generation',
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