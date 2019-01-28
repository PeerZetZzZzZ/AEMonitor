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
  },
  computed:{
    isMobile() {
      return isMobile();
    },
    chartsAspectRatio() {
      return this.isMobile ? 1 : 2;
    },
  },
}