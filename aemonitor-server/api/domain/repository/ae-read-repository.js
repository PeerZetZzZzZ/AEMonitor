const db = require('../../application/db/db');

exports.getLastKeyBlocks = (number, onSucceedCallback) => {
  db.pool.query('SELECT * FROM KEY_BLOCK WHERE NETWORK_ID = $1 GROUP BY HASH ORDER BY MAX(TIME) DESC limit $2', [global.properties.networkId, number],
    (err, res) => {
      if (err) {
        console.log('Getting last key blocks transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getMicroBlocksCountForGivenBlocksHashArray = (keyBlocksHashArray, onSucceedCallback) => {
  db.pool.query('SELECT KB.HASH, COUNT(*) FROM MICRO_BLOCK MB JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.HASH = ANY ($1) AND KB.NETWORK_ID = ($2) GROUP BY KB.HASH',
    [keyBlocksHashArray, global.properties.networkId],
    (err, res) => {
      if (err) {
        console.log('Getting last micro blocks transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getBlocksMinedByMinersWithinLast24hOrderedDesc = (onSucceedCallback) => {
  db.pool.query('SELECT BENEFICIARY, COUNT(*) FROM KEY_BLOCK WHERE NETWORK_ID = $1 AND time >= NOW() - \'1 day\'::INTERVAL GROUP BY BENEFICIARY ORDER BY COUNT(*) ASC',
    [global.properties.networkId],
    (err, res) => {
      if (err) {
        console.log('Getting blocks mined by miners within last 24h ordered desc failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};


exports.getTransactionsCountOfGivenBlocksHeight = (keyBlocksHeightArray, onSucceedCallback) => {
  db.pool.query('SELECT AET.BLOCK_HEIGHT, COUNT(*) FROM AE_TRANSACTION AET WHERE AET.NETWORK_ID = ($1) AND AET.BLOCK_HEIGHT = ANY($2) GROUP BY AET.BLOCK_HEIGHT',
    [global.properties.networkId, keyBlocksHeightArray],
    (err, res) => {
      if (err) {
        console.log('Getting transactions count of given micro blocks hashes array failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getTransactionsTimesOfBlocksFromLast24hOrderedDesc = (onSucceedCallback) => {
  db.pool.query('SELECT KB.TIME FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - \'1 day\'::INTERVAL',
    [global.properties.networkId],
    (err, res) => {
      if (err) {
        console.log('Getting transactions block times from last 24h ordered desc failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getCountKeyBlocksFromLastHour = (onSucceedCallback) => {
  db.pool.query('SELECT COUNT(*) FROM KEY_BLOCK KB WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - \'1 hour\'::INTERVAL',
    [global.properties.networkId],
    (err, res) => {
      if (err) {
        console.log('Getting count key blocks from last hour failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    })
};

exports.getLastTransactions = (number, onSucceedCallback) => {
  db.pool.query('SELECT AET.HASH, AET.BLOCK_HEIGHT, AET.AMOUNT, AET.TYPE, AET.FEE FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 ORDER BY (KB.TIME) DESC LIMIT $2' ,
    [global.properties.networkId, number], (err, res) => {
      if (err) {
        console.log('Getting last transactions failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};


exports.getGroupedTransactionsPerTypeQuantityFromLast24h = (onSucceedCallback) => {
  db.pool.query('SELECT AET.TYPE, COUNT(*) FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - \'1 day\'::INTERVAL GROUP BY AET.TYPE' ,
    [global.properties.networkId], (err, res) => {
      if (err) {
        console.log('Getting grouped transactions per type quantity from last 24h failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};

exports.getAvgTransactionsFeeFromLast24h = (onSucceedCallback) => {
  db.pool.query('SELECT AVG(AET.FEE) FROM AE_TRANSACTION AET JOIN MICRO_BLOCK MB ON MB.HASH = AET.MICRO_BLOCK_HASH JOIN KEY_BLOCK KB ON MB.KEY_BLOCK_HASH = KB.HASH WHERE KB.NETWORK_ID = $1 AND KB.time >= NOW() - \'1 day\'::INTERVAL' ,
    [global.properties.networkId], (err, res) => {
      if (err) {
        console.log('Getting last 24h avg transactions fee failed!', err);
        onSucceedCallback([]);
      } else {
        onSucceedCallback(res.rows);
      }
    });
};