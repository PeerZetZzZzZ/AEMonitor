<template>
    <div>
        <div class="default text" style="color: white"><b>Network</b></div>
        <div class="ui selection dropdown networkInfo">
            <input type="hidden" name="gender">
            <i class="dropdown icon"></i>
            <div class="default text">{{networkId}}</div>
        </div>
    </div>
</template>
<script>

    import { setNetworkId } from '../../../../store/client-index';

    export default {
      name: 'network-info',
      computed: {
        networkId() {
          return this.$store.state.networkId;
        },
      },
      mounted() {
        $('.ui.dropdown.networkInfo').dropdown({
          values: [
            {
              name: properties.networkIdMainnet,
              value: properties.networkIdMainnet,
              selected: true,
            },
            {
              name: properties.networkIdTestnet,
              value: properties.networkIdTestnet,
              selected: false,
            },
          ],
          onChange: (val, text) => {
            setNetworkId(text);
          },
        });
      }
    }
</script>