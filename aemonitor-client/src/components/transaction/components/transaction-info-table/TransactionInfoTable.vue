<template>
    <h1 v-if="transaction.block_height === undefined">Transaction with given hash was not found.</h1>
    <table class="ui celled stackable small compact table" v-else>
        <thead>
        <tr>
            <th>Transaction</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td class="collapsing"><b>Network</b></td>
            <td><div class="ui label" :class="getNetworkLabelClass(transaction.network_id)"><span><i class="globe icon" style="color: lime"></i>Network: <b>{{transaction.network_id}}</b></span></div></td>
        </tr>
        <tr>
            <td class="collapsing"><b>Hash</b></td>
            <td :class="{ 'mobileFont': isMobile}">{{transaction.hash}}</td>
        </tr>
        <tr>
            <td class="collapsing"><b>Block height</b></td>
            <td>{{transaction.block_height}}</td>
        </tr>
        <tr>
            <td class="collapsing"><b>Type</b></td>
            <td><div :class="getLabelClass(transaction.type)">{{transaction.type}}</div></td>
        </tr>
        <tr v-if="transaction.sender_id !== null">
            <td class="collapsing"><b>Sender id</b></td>
            <td :class="{ 'mobileFont': isMobile}">{{transaction.sender_id}}</td>
        </tr>
        <tr>
            <td class="collapsing"><b>Amount</b></td>
            <td >{{toAe(transaction.amount)}} AE</td>
        </tr>
        <tr>
            <td class="collapsing"><b>Fee</b></td>
            <td >{{toAe(transaction.fee)}} AE</td>
        </tr>
        <tr v-if="transaction.gas !== null">
            <td class="collapsing"><b>Gas</b></td>
            <td >{{transaction.gas}}</td>
        </tr>
        <tr v-if="transaction.gas_price !== null">
            <td class="collapsing"><b>Gas price</b></td>
            <td >{{transaction.gas_price}}</td>
        </tr>
        <tr v-if="transaction.call_data !== null">
            <td class="collapsing"><b>Call data</b></td>
            <td >
                <div class="ui form">
                    <div class="field">
                        <label></label>
                        <textarea readonly>{{transaction.call_data}} </textarea>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td class="collapsing"><b>Micro block hash</b></td>
            <td :class="{ 'mobileFont': isMobile}">{{transaction.micro_block_hash}}</td>
        </tr>
        <tr>
            <td class="collapsing"><b>Version</b></td>
            <td >{{transaction.version}}</td>
        </tr>
        <tr>
            <td class="collapsing"><b>Nonce</b></td>
            <td >{{transaction.nonce}}</td>
        </tr>
        <tr v-if="transaction.vm_version !== null">
            <td class="collapsing"><b>VM version</b></td>
            <td >{{transaction.vm_version}}</td>
        </tr>
        <tr v-if="transaction.caller_id !== null">
            <td class="collapsing"><b>Caller id</b></td>
            <td >{{transaction.caller_id}}</td>
        </tr>
        <tr v-if="transaction.owner_id !== null">
            <td class="collapsing"><b>Onwer id</b></td>
            <td :class="{ 'mobileFont': isMobile}">{{transaction.owner_id}}</td>
        </tr>
        <tr v-if="transaction.contract_id !== null">
            <td class="collapsing"><b>Contract id</b></td>
            <td :class="{ 'mobileFont': isMobile}">{{transaction.contract_id}}</td>
        </tr>
        <tr v-if="transaction.code !== null">
            <td class="collapsing"><b>Code [bytecode]</b></td>
            <td >
                <div class="ui form">
                    <div class="field">
                        <label></label>
                        <textarea readonly>{{transaction.code}} </textarea>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td class="collapsing"><b>Recipient id</b></td>
            <td :class="{ 'mobileFont': isMobile}">{{transaction.recipient_id}}</td>
        </tr>
        <tr>
            <td class="collapsing"><b>Check in Aeternity Explorer</b></td>
            <td>
                <a
                   :class="{ 'mobileFont': isMobile}"
                   class="tableLinkFont"
                   :href="isMainnet ? `https://explorer.aepps.com/#/tx/${transaction.hash}`: `https://testnet.explorer.aepps.com/#/tx/${transaction.hash}`"
                   target="_blank">
                    <div class="ui small icon button">
                        <i class="angle right icon"></i>
                        Check
                    </div>
                </a>

            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
  export default {
    name: 'transaction-info-table',
    props: {
      transaction: {
        type: Object,
        required: true,
      },
    },
  };
</script>
<style scoped>
    table thead tr {
        background-color: var(--colorExciting);
    }

    .mobileFont {
        font-size: 0.7rem;
    }
</style>