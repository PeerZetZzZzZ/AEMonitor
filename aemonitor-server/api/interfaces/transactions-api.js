const app = require('../../app');
const AeReadRepository = require('../domain/repository/ae-read-repository');

app.express.get('/api/getLastTransactions', (req, res) => {
    AeReadRepository.getLastTransactions(global.properties.lastTransactionsCount, (rows) => {
      res.send(rows);
    });
});

app.express.get('/api/getLast24hTransactionTypes', (req, res) => {
  AeReadRepository.getGroupedTransactionsPerTypeQuantityFromLast24h((rows) => {
    res.send(rows);
  });
});

app.express.get('/api/getLast24hAvgTransactionFee', (req, res) => {
  AeReadRepository.getAvgTransactionsFeeFromLast24h((rows) => {
    res.send({avgFee: rows[0] !== undefined ? rows[0].avg : 0});
  });
});

app.express.get('/api/getLast24hAvgTransactionsPerGeneration', (req, res) => {
  AeReadRepository.getGroupedTransactionsPerKeyBlockFromLast24h((rows) => {
    const keyBlockQuantity = rows.length;
    let transactionsDoneQuantity = 0;
    rows.forEach(row => {
      transactionsDoneQuantity += Number(row.count);
    });
    res.send({last24hAvgTransactionsPerGeneration: (keyBlockQuantity / transactionsDoneQuantity)});
  });
});

app.express.get('/api/getLast24hTransactionTimes', (req, res) => {
  AeReadRepository.getTransactionsTimesOfBlocksFromLast24hOrderedDesc((rows) => {
    res.send(rows.map(row => row.time));
  })
});