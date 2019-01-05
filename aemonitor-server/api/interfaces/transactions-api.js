const app = require('../../app');
const AeReadRepository = require('../domain/repository/ae-read-repository');

app.express.get('/api/getLastTransactions', (req, res) => {
    AeReadRepository.getLastTransactions(global.properties.lastTransactionsCount, (rows) => {
      res.send(rows);
    });
});

app.express.get('/api/getLast24hTransactionTypes', (req, res) => {
  console.log('mam req: ', req.query);
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getGroupedTransactionsPerTypeQuantityFromLastTimeFrame((rows) => {
    res.send(rows);
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
});

app.express.get('/api/getLast24hAvgTransactionFee', (req, res) => {
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getAvgTransactionsFeeFromLast24h((rows) => {
    res.send({avgFee: rows[0] !== undefined ? rows[0].avg : 0});
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
});

app.express.get('/api/getLast24hAvgTransactionsPerGeneration', (req, res) => {
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getGroupedTransactionsPerKeyBlockFromLast24h((rows) => {
    const keyBlockQuantity = rows.length;
    let transactionsDoneQuantity = 0;
    rows.forEach(row => {
      transactionsDoneQuantity += Number(row.count);
    });
    res.send({last24hAvgTransactionsPerGeneration: (keyBlockQuantity / transactionsDoneQuantity)});
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
});

app.express.get('/api/getLast24hTransactionTimes', (req, res) => {
  const timeFrameObject = getTimeFrameObject(req);
  AeReadRepository.getTransactionsTimesOfBlocksFromLast24hOrderedDesc((rows) => {
    res.send(rows.map(row => row.time));
  }, timeFrameObject.timeFrameUnit, timeFrameObject.timeFrameUnitQuantity);
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