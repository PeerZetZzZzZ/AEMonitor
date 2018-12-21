# AEMonitor
![Alt text](screenshot.png?raw=true "Screenshot")

Live: http://aemonitor.mobycrypt.com

Real time dashboard monitor for Aeternity blockchain (https://aeternity.com/).
Periodically fetches the data from blockchain and saves in internal db allowing in-depth analytics.

Server side: Node.js + PostgreSQL

Client side: Vue.js + SemanticUI

# Current features:

Customizable features:
- different networks (testnet, mainnet, edgenet)
- fetch the data from first block (on default from current time block)
- fetch interval seconds (on client and server)

Core stats:
- key blocks list table (including micro blocks and transactions count) [last 20]
- miners percentage chart [Last 24h]
- micro blocks in generation [last 20 key blocks]
- block height
- block difficulty
- block reward
- last transactions (last block)

Transactions stats: 
- avg block mine time [last 1h]
- last transactions table [last 20]
- transactions done count per hour chart [last 24h]
- transactions per type chart [last 24h]
- transactions done count [last 24h]
- avg fee [last 24h]
- avg transactions per generation [last 24h]

Token stats:
- AE token exchanges stats table (currently Binance, Bithumb, Gate.io, Uex)

# Install

## Server:

**[Required]**

Expects node.js and PostgreSQL installed.
On first run will start fetching blockchain data from current block (see [Optional] for configuration change).
After first saved key block in database, every time restarted at the beginning will fetch missing data from last saved block to current.

Update properties.js and provide:
- database (postgres) connection info [user, host, database, password, port],
- node info [node url, node port, network id **important**!]

**[Optional]**
Configure properties.js settings for blockchain check interval seconds and other settings.
- set *fetchWholeBlockchainOnStarthWhenEmptyDb* to *true* if want to fetch from first blocks (on default starts to fetch from current block when empty db)

**Install**: npm install

**Run:** node app.js (default port 6789)

## Client:
Expects Vue globally installed.

**[Optional]**
Configure assets/properties.js for server check interval seconds.

**Install**: npm install

**Run (vue live server):** npm run serve

**Build:** npm run build

