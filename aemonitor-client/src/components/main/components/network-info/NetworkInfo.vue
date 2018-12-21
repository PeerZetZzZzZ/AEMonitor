<template>
    <h4 class="ui center aligned header whiteFont">
        <i class="globe icon" style="color: #01FF70"></i>Network: {{networkId}}
    </h4>
</template>
<script>
    import { getNetworkId } from '../../services/main-http-service';

    export default {
      name: 'network-info',
      data() {
        return {
            networkId: '',
        };
      },
      mounted() {
        getNetworkId().subscribe((res) => {
          this.networkId = res.data.networkId;
        })
      }
    }
</script>