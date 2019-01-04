const {Universal: Ae} = require('@aeternity/aepp-sdk');
const AeSaveRepository = require('../repository/ae-save-repository');
const AeReadRepository = require('../repository/ae-read-repository');

const processAllNotSavedBlocksBetweenLastSavedAndCurrent = (ae, aeMonitorBlockHeightCounter, onFinishCallback) => {
  AeReadRepository.getMaxSavedKeyBlockHeight(async (rows) => {
    console.log('[AEMonitor Server STARTUP] Starting processing all blocks between last saved and current.', );
    if (rows[0].max !== null || global.properties.fetchWholeBlockchainOnStartWhenEmptyDb) {
      const maxSavedBlockHeight = rows[0].max !== null ? Number(rows[0].max) : 1;
      console.log(`[AEMonitor Server STARTUP] Last saved block height: ${maxSavedBlockHeight}.`);
      const currentHeight = await ae.height();
      console.log(`[AEMonitor Server STARTUP] Current blockchain block height: ${currentHeight}.`);
      if (maxSavedBlockHeight > (currentHeight - 1)) {
        console.log(`[AEMonitor Server STARTUP] Starting processing fetching all blocks between ${maxSavedBlockHeight} - ${currentHeight -1}.`);
      }
      for (let height = maxSavedBlockHeight; height < currentHeight; height++) {
        const generation = await ae.getGeneration(height);
        processBlocksAndTransactionsOfGeneration(ae, generation);
        aeMonitorBlockHeightCounter = height;
      }
      console.log(`[AEMonitor Server STARTUP] Finished processing all blocks between last saved and current. AEMonitor db is up to date now.`);
    } else {
      console.log(`[AEMonitor Server STARTUP] Finished processing all blocks because db is empty. Starting from current block.`);
    }
    onFinishCallback();
  });
};

const processBlocksAndTransactionsOfGeneration = (ae, generation) => {
  AeSaveRepository.saveKeyBlock(generation.keyBlock, ()=> {
    generation.microBlocks.forEach(async microBlockHeaderString => {
      const microBlockHeader = await ae.getMicroBlockHeader(microBlockHeaderString);
      AeSaveRepository.saveMicroBlock(microBlockHeader, generation.keyBlock.hash, async () => {
        const microBlockTransactions = await ae.getMicroBlockTransactions(microBlockHeader.hash);
        microBlockTransactions.forEach(microBlockTransaction => {
          AeSaveRepository.saveMicroBlockTransaction(microBlockTransaction, microBlockHeader.hash);
        });
      });
    });
  });
};

/**
 * AEMonitor engine workflow:
 * 1. On application startup check last saved key block height and compare to current key block height.
 *    Fetch (all key blocks, micro blocks and transactions) between last saved in db and current.
 *
 * 2. Every given interval get current generation and fetch all key blocks and its micro blocks with transactions.
 *    Save in db, on conflict do nothing.
 *    If current generation changes (new block) once again check previous generation to assure all its micro blocks
 *    and transactions were saved. After it fetch newest generation and save newest generation blocks.
 */
Ae({
  url: `${global.properties.aeNodeUrl}:${global.properties.aeNodePort}`,
  internalUrl: `${global.properties.aeNodeUrl}:${global.properties.aeNodePort}`
}).then(async ae => {
  let aeMonitorBlockHeightCounter = await ae.height();
  processAllNotSavedBlocksBetweenLastSavedAndCurrent(ae, aeMonitorBlockHeightCounter, () => {
    setInterval(async () => {
      const currentBlockHeight = await ae.height();
      console.log(`[AEMonitor Server] Current block height: ${currentBlockHeight}.`);
      if (currentBlockHeight > aeMonitorBlockHeightCounter) {
        console.log(`[AEMonitor Server] New block mined. Getting and saving block height ${aeMonitorBlockHeightCounter} generation.`);
        const currentGeneration = await ae.getGeneration(aeMonitorBlockHeightCounter);
        processBlocksAndTransactionsOfGeneration(ae, currentGeneration);
        console.log(`[AEMonitor Server] Saved generation of block height ${aeMonitorBlockHeightCounter}. Waiting for block ${aeMonitorBlockHeightCounter + 1}.`);
        aeMonitorBlockHeightCounter = currentBlockHeight;
      }
    }, global.properties.checkBlockchainIntervalMillisecs)
  });
});