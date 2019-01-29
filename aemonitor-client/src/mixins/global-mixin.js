import { formatDateToShortReadableFormat } from '../api/utils/date-format-service';
import { isMobile } from '../api/utils/is-mobile';

export default {
  data() {
    return {
      transactionTypes: {
        transactionContractCallTx: 'ContractCallTx',
        transactionContractCreateTx: 'ContractCreateTx',
        transactionSpendTx: 'SpendTx',
        transactionNamePreclaimTx: 'NamePreclaimTx',
        transactionNameClaimTx: 'NameClaimTx',
        transactionNameUpdateTx: 'NameUpdateTx',
        transactionOracleRegisterTx: 'OracleRegisterTx',
        transactionOracleExtendTx: 'OracleExtendTx',
        transactionOracleResponseTx: 'OracleResponseTx',
        transactionOracleQueryTx: 'OracleQueryTx',
        transactionChannelCreateTx: 'ChannelCreateTx',
        transactionChannelCloseMutualTx: 'ChannelCloseMutualTx',
        transactionChannelSettleTx: 'ChannelSettleTx',
        transactionChannelCloseSoloTx: 'ChannelCloseSoloTx',
        transactionChannelSlashTx: 'ChannelSlashTx',
      },
    };
  },
  methods: {
    formatDate(date) {
      return formatDateToShortReadableFormat(date);
    },
    toAe(amount) {
      return (new Number(amount) / 1000000000000000000).toFixed(18)
    },
    getNetworkLabelClass(networkId) {
      switch(networkId) {
        case properties.networkIdMainnet:
          return 'ui pink label';
        case properties.networkIdTestnet:
          return 'ui purple label';
      }
    },
    getLabelClass(transactionType) {
      switch(transactionType) {
        case this.transactionTypes.transactionContractCallTx:
          return 'ui brown label';
        case this.transactionTypes.transactionContractCreateTx:
          return 'ui blue label';
        case this.transactionTypes.transactionSpendTx:
          return 'ui violet label';
        case this.transactionTypes.transactionNamePreclaimTx:
          return 'ui olive label';
        case this.transactionTypes.transactionNameClaimTx:
          return 'ui teal label';
        case this.transactionTypes.transactionNameUpdateTx:
          return 'ui purple label';
        case this.transactionTypes.transactionOracleRegisterTx:
          return 'ui red label';
        case this.transactionTypes.transactionOracleExtendTx:
          return 'ui orange label';
        case this.transactionTypes.transactionOracleResponseTx:
          return 'ui pink label';
        case this.transactionTypes.transactionOracleQueryTx:
          return 'ui grey label';
        case this.transactionTypes.transactionChannelCreateTx:
          return 'ui black label';
        case this.transactionTypes.transactionChannelCloseMutualTx:
          return 'ui yellow label';
        case this.transactionTypes.transactionChannelSettleTx:
          return 'ui navyLabel label';
        case this.transactionTypes.transactionChannelCloseSoloTx:
          return 'ui maroonLabel label';
        case this.transactionTypes.transactionChannelSlashTx:
          return 'ui limeLabel label';
      }
    }
  },
  computed:{
    isMobile() {
      return isMobile();
    },
    chartsAspectRatio() {
      return this.isMobile ? 1 : 2;
    },
    isMainnet() {
      return this.$store.state.networkId === properties.networkIdMainnet;
    },
    networkId() {
      return this.$store.state.networkId;
    }
  },
}