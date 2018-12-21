<template>
    <div class="chart">
        <canvas id="lastTransactionsPerHourChartId"></canvas>
    </div>
</template>
<script>
  import Chart from 'chart.js';
  import moment from 'moment/min/moment.min';
  import { formatDateToShortReadableFormatHours } from '../../../../api/utils/date-format-service';

  export default {
    name: 'last-transactions-per-hour-chart',
    props: {
      last24hTransactionTimes: {
        type: Array,
        required: true,
      },
    },
    watch: {
      last24hTransactionTimes() {
        let perHourMap = new Map();
        const nowRoundedBottomToHour = moment().startOf('hour');
        perHourMap.set(formatDateToShortReadableFormatHours(nowRoundedBottomToHour), 0);
        for (let i = 0; i < 23; i++) {
          perHourMap.set(formatDateToShortReadableFormatHours(nowRoundedBottomToHour.subtract({hours: 1})), 0);
        }
        this.last24hTransactionTimes.forEach(lastTransactionTime => {
          const roundedTimeToHourBottom = formatDateToShortReadableFormatHours(moment(lastTransactionTime).startOf('hour'));
          const transactionsForThisHourCount = perHourMap.get(roundedTimeToHourBottom) + 1;
          perHourMap.set(roundedTimeToHourBottom, transactionsForThisHourCount);
        });
        const keysAsArray = Array.from(perHourMap.keys());
        keysAsArray.sort((a, b) => new Date(a) - new Date(b));
        const valuesAsArray = [];
        keysAsArray.forEach(key => {
          valuesAsArray.push(perHourMap.get(key));
        });
        this.createChart(keysAsArray, valuesAsArray);
      }
    },
    methods: {
      createChart(labels, data) {
        const aspectRatio = this.chartsAspectRatio;
        var ctx = document.getElementById('lastTransactionsPerHourChartId');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Transactions done',
              data: data,
              borderWidth: 1,
              backgroundColor: data.map(dataEntry => '#F7296E')
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
                  labelString: 'Hours',
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
<style scoped>
    #lastTransactionsPerHourChartId {
        /*height: 600px !important;*/
        /*width: 100% !important;*/
    }
</style>
