<template>
    <div class="chart">
        <canvas id="transactionTypesChartId"></canvas>
    </div>
</template>
<script>
  import Chart from 'chart.js';
  import ChartMixin from '../../../../mixins/chart-mixin';

  export default {
    name: 'transaction-types-chart',
    mixins: [ChartMixin],
    props: {
      last24hTransactionTypes: {
        type: Array,
        required: true,
      },
    },
    watch: {
      last24hTransactionTypes() {
        const labels = [];
        const data = [];
        Object.values(this.transactionTypes).forEach(transactionType => {
          const rowOfGivenTransactionType = this.last24hTransactionTypes.filter(row => row.type === transactionType)[0];
          data.push(rowOfGivenTransactionType !== undefined ? new Number(rowOfGivenTransactionType.count) : 0);
          labels.push(transactionType);
        });
        this.updateChart(labels, data);
      }
    },
    methods: {
      createChart(labels, data) {
        const aspectRatio = this.isMobile ? 0.5 : 2;
        var ctx = document.getElementById('transactionTypesChartId');
        this.chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              label: 'Transactions done',
              data: data,
              borderWidth: 1,
              //this matching colors from semantic and used in labels in transaction tables - DONT CHANGE THE ORDER
              backgroundColor: ['#A5673F', '#2185D0', '#6435C9', '#B5CC18', '#00B5AD', '#A333C8', '#DB2828', '#F2711C', '#E03997', '#767676', '#1B1C1D', '#FBBD08', '#001f3f', '#85144b', '#01FF70']
            }]
          },
          options: {
            aspectRatio: aspectRatio,
            legend: {
              display: true
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