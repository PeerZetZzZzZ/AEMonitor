const app = require('../../app');

app.express.get('/api/getNetworkId', (req, res) => {
  res.send({networkId: global.properties.networkId})
});