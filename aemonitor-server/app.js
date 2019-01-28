require('./properties');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
const port = global.properties.aeMonitorServerPort;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
exports.express = app;


require('./api/domain/services/scheduled-ae-blocks-checker');
require('./api/domain/services/scheduled-token-exchanges-checker');
require('./api/interfaces/core-api');
require('./api/interfaces/transactions-api');
require('./api/interfaces/token-api');


