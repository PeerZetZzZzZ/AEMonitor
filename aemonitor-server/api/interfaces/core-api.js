const app = require('../../app');
const AeReadRepository = require('../domain/repository/ae-read-repository');
const AeApiFacadeService = require('../domain/services/ae-api-facade-service');
const BlockRewardsRepository = require('../domain/repository/block-rewards-repository');

app.express.get('/getLastKeyBlocks', (req, res) => {
  AeReadRepository.getLastKeyBlocks(global.properties.lastKeyBlocksCount, (keyBlockRows) => {
    const keyBlocksHeightArray = keyBlockRows.map(row => new Number(row.height));
    const keyBlocksHashArray = keyBlockRows.map(row => row.hash);
    AeReadRepository.getMicroBlocksCountForGivenBlocksHashArray(keyBlocksHashArray, (microBlockRows) => {
      AeReadRepository.getTransactionsCountOfGivenBlocksHeight(keyBlocksHeightArray, (transactionsCountRowsPerMicroBlock) => {
        keyBlockRows.forEach(keyBlockRow => {
          const transactionsCountRowsForGivenMicroBlock = transactionsCountRowsPerMicroBlock
            .filter(transactionsCountRowsPerMicroBlockRow => transactionsCountRowsPerMicroBlockRow.block_height === keyBlockRow.height);
          keyBlockRow.transactionsCount = transactionsCountRowsForGivenMicroBlock.length === 1 ? new Number(transactionsCountRowsForGivenMicroBlock[0].count) : 0;
          keyBlockRow.microBlocksCount = microBlockRows.filter(microBlockRow => microBlockRow.hash === keyBlockRow.hash).length;
        });
        res.send(keyBlockRows);
      });
    });
  })
});

app.express.get('/getLast24hMinersPercentage', (req, res) => {
  AeReadRepository.getBlocksMinedByMinersWithinLast24hOrderedDesc((rows) => {
    let totalKeyBlocksMinedWithinLast24h = 0;
    rows.forEach(row => totalKeyBlocksMinedWithinLast24h += new Number(row.count));
    let totalBlocksMinedByBest = 0;
    const miners = [];
    //Best 4 are normally counted
    let normallyCounted = rows.length > 4 ? 4: rows.length;
    for (let i = 0; i < normallyCounted; i++) {
      const minerCountedBlocks = new Number(rows[i].count);
      miners.push({
        beneficiary: rows[i].beneficiary,
        minedPercentage: (minerCountedBlocks / totalKeyBlocksMinedWithinLast24h) * 100
      });
      totalBlocksMinedByBest += minerCountedBlocks;
    }
    miners.push({
      beneficiary: 'others',
      minedPercentage: ((totalKeyBlocksMinedWithinLast24h - totalBlocksMinedByBest) / totalKeyBlocksMinedWithinLast24h) * 100
    });
    res.send(miners);
  })
});

app.express.get('/getLast24hTransactionTimes', (req, res) => {
  AeReadRepository.getTransactionsTimesOfBlocksFromLast24hOrderedDesc((rows) => {
    res.send(rows.map(row => row.time));
  })
});

app.express.get('/getBlockDifficulty', async (req, res) => {
  const status = await AeApiFacadeService.get('/status');
  res.send({difficulty: status.data.difficulty});
});

app.express.get('/getBlockReward/:blockNumber', (req, res) => {
  let blockReward = 0;
  for (let i = 0; i < BlockRewardsRepository.blockRewards.length; i++) {
    if (req.params.blockNumber < BlockRewardsRepository.blockRewards[i].block) {
      blockReward = BlockRewardsRepository.blockRewards[i - 1].reward;
      break;
    }
  }
  res.send({blockReward: blockReward});
});

app.express.get('/getLast1hAvgBlockTime', (req, res) => {
  AeReadRepository.getCountKeyBlocksFromLastHour((rows) => {
    const blockCount = new Number(rows[0].count);
    res.send({last1hAvgBlockTime: blockCount > 0 ? (60 / blockCount) : 0});
  });
});