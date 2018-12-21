const {Universal: Ae} = require('@aeternity/aepp-sdk')
const AeSaveRepository = require('../repository/ae-save-repository');

Ae({
  url: `${global.properties.aeNodeUrl}:${global.properties.aeNodePort}`,
  internalUrl: `${global.properties.aeNodeUrl}:${global.properties.aeNodePort}`
}).then(ae => {
  const checkBlockchain = () => {
    ae.getCurrentGeneration().then(generation => {
      AeSaveRepository.saveKeyBlock(generation.keyBlock, () => {
        generation.microBlocks.forEach(microBlockHeaderString => {
          ae.getMicroBlockHeader(microBlockHeaderString).then(microBlockHeader => {
            AeSaveRepository.saveMicroBlock(microBlockHeader, generation.keyBlock.hash, () => {
              ae.getMicroBlockTransactions(microBlockHeader.hash).then(microBlockTransactions => {
                microBlockTransactions.forEach(microBlockTransaction => {
                  AeSaveRepository.saveMicroBlockTransaction(microBlockTransaction, microBlockHeader.hash);
                });
              });
            });
          })
        })
      });
    });
  };
  setInterval(checkBlockchain, global.properties.checkBlockchainIntervalMillisecs);
});