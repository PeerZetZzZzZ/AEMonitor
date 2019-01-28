<template>
    <div class="chart">
        <canvas id="lastTransactionsPerHourChartId"></canvas>
    </div>
</template>
<script>
  import Chart from 'chart.js';
  import moment from 'moment/min/moment.min';
  import {
    formatDateToDayMonthYear,
    formatDateToShortReadableFormatHours
  } from '../../../../api/utils/date-format-service';
  import ChartMixin from '../../../../mixins/chart-mixin';

  export default {
    name: 'last-transactions-per-hour-chart',
    mixins: [ChartMixin],
    props: {
      timeFrame: {
        type: Object,
        required: true,
      },
      last24hTransactionTimes: {
        type: Array,
        required: true,
      },
    },
    watch: {
      last24hTransactionTimes() {
        switch(this.timeFrame.chartDisplayType) {
          case 'minute':
            this.splitTransactionsPerMinuteAndUpdateChart();
            break;
          case 'hour':
            this.splitTransactionsPerHourAndUpdateChart();
            break;
          case 'day':
            this.splitTransactionsPerDayAndUpdateChart();
            break;
        }
      }
    },
    methods: {
      splitTransactionsPerDayAndUpdateChart() {
        let perDayMap = new Map();
        this.last24hTransactionTimes.forEach(lastTransactionTime => {
          const roundedTimeToDayBottom = formatDateToDayMonthYear(moment(lastTransactionTime).startOf('day'));
          let transactionsForThisHourCount = perDayMap.has(roundedTimeToDayBottom) ? (perDayMap.get(roundedTimeToDayBottom) + 1) : 1;
          perDayMap.set(roundedTimeToDayBottom, transactionsForThisHourCount);
        });
        const keysAsArray = Array.from(perDayMap.keys());
        keysAsArray.sort((a, b) => moment(a,'DD-MM-YYYY') - moment(b, 'DD-MM-YYYY'));
        const valuesAsArray = [];
        keysAsArray.forEach(key => {
          valuesAsArray.push(perDayMap.get(key));
        });
        this.updateChart(keysAsArray, valuesAsArray);
      },
      splitTransactionsPerMinuteAndUpdateChart() {
        let perMinuteMap = new Map();
        const nowRoundedBottomToMinute = moment().startOf('minute');
        perMinuteMap.set(formatDateToShortReadableFormatHours(nowRoundedBottomToMinute), 0);
        for (let i = 0; i < 59; i++) {
          perMinuteMap.set(formatDateToShortReadableFormatHours(nowRoundedBottomToMinute.subtract({minute: 1})), 0);
        }
        this.last24hTransactionTimes.forEach(lastTransactionTime => {
          const roundedTimeToHourMinute = formatDateToShortReadableFormatHours(moment(lastTransactionTime).startOf('minute'));
          const transactionsForThisHourCount = perMinuteMap.get(roundedTimeToHourMinute) + 1;
          perMinuteMap.set(roundedTimeToHourMinute, transactionsForThisHourCount);
        });
        const keysAsArray = Array.from(perMinuteMap.keys());
        keysAsArray.sort((a, b) => new Date(a) - new Date(b));
        const valuesAsArray = [];
        keysAsArray.forEach(key => {
          valuesAsArray.push(perMinuteMap.get(key));
        });
        this.updateChart(keysAsArray, valuesAsArray);
      },
      splitTransactionsPerHourAndUpdateChart() {
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
        this.updateChart(keysAsArray, valuesAsArray);
      },
      createChart(labels, data) {
        const aspectRatio = this.chartsAspectRatio;
        var ctx = document.getElementById('lastTransactionsPerHourChartId');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Transactions done',
              data: data,
              borderWidth: 1,
              backgroundColor: 'rgb(247, 41, 110)'
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
                  labelString: 'Time',
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
