const app = require('../../app');
const AeReadRepository = require('../domain/repository/ae-read-repository');

app.express.get('/api/:networkId/getLastTransactions', (req, res) => {
    AeReadRepository.getLastTransactions(req.params.networkId, global.properties.lastTransactionsCount, (rows) => {
      res.send(rows);
    });
});

app.express.get('/api/:networkId/getLast24hTransactionTypes', (req, res) => {
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getGroupedTransactionsPerTypeQuantityFromLastTimeFrame(req.params.networkId,(rows) => {
    res.send(rows);
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
});

app.express.get('/api/:networkId/getLast24hAvgTransactionFee', (req, res) => {
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getAvgTransactionsFeeFromLast24h(req.params.networkId,(rows) => {
    res.send({avgFee: rows[0] !== undefined ? rows[0].avg : 0});
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
});

app.express.get('/api/:networkId/getLast24hAvgTransactionsPerGeneration', (req, res) => {
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getGroupedTransactionsPerKeyBlockFromLast24h(req.params.networkId,(rows) => {
    const keyBlockQuantity = rows.length;
    let transactionsDoneQuantity = 0;
    rows.forEach(row => {
      transactionsDoneQuantity += Number(row.count);
    });
    res.send({last24hAvgTransactionsPerGeneration: (keyBlockQuantity / transactionsDoneQuantity)});
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
});

app.express.get('/api/:networkId/getLast24hTransactionTimes', (req, res) => {
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getTransactionsTimesOfBlocksFromLast24hOrderedDesc(req.params.networkId,(rows) => {
    res.send(rows.map(row => row.time));
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
});

app.express.get('/api/transactionInfo/:networkId/:transactionHash', (req, res) => {
  AeReadRepository.getTransactionInfo(req.params.networkId,req.params.transactionHash, (row) => {
    console.log('mam rowa', row);
    res.send(row);
  });
});


const getTimeFrameObject = (req) => {
  switch (req.query.timeFrame) {
    case '1h': {
      return {
        timeFrameUnit: 'hour',
        timeFrameUnitQuantity: '1',
      }
    }
    case '24h': {
      return {
        timeFrameUnit: 'hour',
        timeFrameUnitQuantity: '24',
      }
    }
    case '7d': {
      return {
        timeFrameUnit: 'day',
        timeFrameUnitQuantity: '7',
      }
    }
    case '1m': {
      return {
        timeFrameUnit: 'day',
        timeFrameUnitQuantity: '30',
      }
    }
    default: {
      return {
        timeFrameUnit: 'hour',
        timeFrameUnitQuantity: '24',
      }
    }
  }
};