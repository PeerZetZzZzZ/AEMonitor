<template>
    <div class="ui stackable center aligned  grid">
        <div class="row">
            <div class="sixteen wide column">
                <div class="ui fluid action input">
                    <input type="text" placeholder="Transaction hash" v-model="transactionHash">
                    <button class="ui button" @click="goToTransactionView">Search</button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
      name: 'serach-transaction-form',
      data() {
        return {
          transactionHash: null,
        }
      },
      methods: {
        goToTransactionView() {
          if (this.transactionHash !== null && this.transactionHash.trim() !== '') {
            this.$router.push(`/transaction/${this.networkId}/${this.transactionHash}`);
          }
        },
      }
    }
</script>