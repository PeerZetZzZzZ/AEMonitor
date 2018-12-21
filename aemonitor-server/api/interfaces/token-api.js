const app = require('../../app');
const TokenRepository = require('../domain/repository/token-repository');

app.express.get('/api/getTokenExchanges', (req, res) => {
  TokenRepository.getTokenExchangeEntries((rows) => {
    res.send(rows);
  });
});