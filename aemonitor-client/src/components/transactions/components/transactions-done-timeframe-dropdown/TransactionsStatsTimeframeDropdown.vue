<template>
    <div class="ui selection dropdown">
        <input type="hidden" name="gender">
        <i class="dropdown icon"></i>
        <div class="default text">Last 24h</div>
    </div>
</template>
<script>
    export default {
      name: 'transactions-stats-timeframe-dropdown',
      props: {
        onValueChangeCallback: {
          type: Function,
          required: true,
        },
      },
      mounted() {
        $('.ui.dropdown').dropdown({
          values: [
            properties.timeFrame1h,
            {
              name: properties.timeFrame24h.name,
              value: properties.timeFrame24h.value,
              selected: true,
            },
            properties.timeFrame7d,
            properties.timeFrame1m,
          ],
          onChange: (val, text) => {
            switch(val) {
              case properties.timeFrame1h.value:
                this.onValueChangeCallback(properties.timeFrame1h);
                break;
              case properties.timeFrame24h.value:
                this.onValueChangeCallback(properties.timeFrame24h);
                break;
              case properties.timeFrame7d.value:
                this.onValueChangeCallback(properties.timeFrame7d);
                break;
              case properties.timeFrame1m.value:
                this.onValueChangeCallback(properties.timeFrame1m);
                break;
            }
          },
        });
      },
    }
</script>