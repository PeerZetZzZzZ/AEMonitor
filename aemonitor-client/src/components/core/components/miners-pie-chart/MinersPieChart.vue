<template>
    <canvas id="minersPieChartId"></canvas>
</template>
<script>
  import Chart from 'chart.js';
  import ChartMixin from '../../../../mixins/chart-mixin';

  export default {
    name: 'miners-pie-chart',
    mixins: [ChartMixin],
    props: {
      last24hMinersPercentage: {
        type: Array,
        required: true,
      },
    },
    watch: {
      last24hMinersPercentage() {
        const labels = this.last24hMinersPercentage.map(minerStatistics => minerStatistics.beneficiary);
        const data = this.last24hMinersPercentage.map(minerStatistics => minerStatistics.minedPercentage.toPrecision(4));
        this.updateChart(labels, data);
      },
    },
    methods: {
      createChart(labels, data) {
        const aspectRatio = this.chartsAspectRatio;
        var ctx = document.getElementById('minersPieChartId');
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Micro Blocks in Key Blocks',
              data: data,
              backgroundColor: ['#311B58', '#4d2a89', '#7c4fc9', '#b69de1', '#f0ebf9'],
            }]
          },
          options: {
            aspectRatio: aspectRatio,
            legend: {
              display: true,
              labels: {
                fontColor: '#311B58',
                fontFamily: 'Roboto',
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  display: false,
                },

                gridLines: {
                  display: false,
                  color: '#311B58',
                  drawBorder: false,
                }
              }],
              yAxes: [{
                ticks: {
                  display: false,
                },
                gridLines: {
                  display: false,
                  color: '#311B58',
                  drawBorder: false,
                }
              }]

            }
          }
        });
      },
    },
  };
</script>
