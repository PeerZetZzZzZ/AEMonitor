global.properties = {
  aeMonitorServerPort: 3000,

  //Aeternity network settings
  //CHANGE IT!!!
  // When:
  // - main net network -> MAINNET
  // - test net network -> TESTNET
  // - edge net network -> TESTNET
  networkId: 'MAINNET',
  //roma-net.aepps.com
  // aeNodeUrl: 'https://sdk-testnet.aepps.com',
  aeNodeUrl: 'https://roma-net.aepps.com',
  aeNodePort: 443,

  //Database postgres settings
  postgresUser: 'postgres',
  postgresHost: 'localhost',
  postgresDatabase: 'mobycrypt',
  postgresPassword: 'mobycrypt',
  postgresPort: 5432,

  //AEMonitor specific settings
  checkBlockchainIntervalMillisecs: 10000, //every ten seconds,
  checkExchangesIntervalMillisecs: 10000, //every ten seconds,
  lastTransactionsCount: 20,
  lastKeyBlocksCount: 20,
};