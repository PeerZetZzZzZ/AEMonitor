global.properties = {
  aeMonitorServerPort: 6789,

  //Aeternity network settings
  //CHANGE IT!!!
  // When:
  // - main net network -> MAINNET
  // - test net network -> TESTNET
  // - edge net network -> TESTNET
  networkId: 'MAINNET',
  // aeNodeUrl: 'https://sdk-testnet.aepps.com',
  // aeNodeUrl: 'https://roma-net.aepps.com',
  aeNodeUrl: 'http://52.77.168.79',
  // aeNodePort: 443,
  aeNodePort: 3013,

  //Database postgres settings
  postgresUser: 'postgres',
  postgresHost: 'localhost',
  postgresDatabase: 'mobycrypt',
  postgresPassword: 'mobycrypt',
  postgresPort: 5432,

  //AEMonitor specific settings
  checkBlockchainIntervalMillisecs: 20000, //every 20 seconds,
  checkExchangesIntervalMillisecs: 20000, //every 20 seconds,
  lastTransactionsCount: 20,
  lastKeyBlocksCount: 20,
  fetchWholeBlockchainOnStartWhenEmptyDb: false,
};