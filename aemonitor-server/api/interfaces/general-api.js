const app = require('../../app');

app.express.get('/getNetworkId', (req, res) => {
  res.send({networkId: global.properties.networkId})
});