const axios = require('axios');

exports.get = (url) => {
  return axios.get(`${global.properties.aeNodeUrl}:${global.properties.aeNodePort}/v2${url}`);
};