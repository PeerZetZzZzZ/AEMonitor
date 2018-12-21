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
          labels.push(transactionType);
          data.push(rowOfGivenTransactionType !== undefined ? new Number(rowOfGivenTransactionType.count) : 0);
        });
        this.updateChart(labels, data);
      }
    },
    methods: {
      createChart(labels, data) {
        const aspectRatio = this.chartsAspectRatio;
        var ctx = document.getElementById('transactionTypesChartId');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Transactions done',
              data: data,
              borderWidth: 1,
              //this matching colors from semantic and used in labels in transaction tables - DONT CHANGE THE ORDER
              backgroundColor: ['#A5673F', '#2185D0', '#6435C9', '#B5CC18', '#00B5AD', '#A333C8', '#DB2828', '#F2711C', '#E03997', '#767676', '#1B1C1D', '#FBBD08']
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
                  labelString: 'Transaction types',
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
                  labelString: 'Transactions done',
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