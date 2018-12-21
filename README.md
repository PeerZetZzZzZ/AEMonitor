# AEMonitor
![Alt text](screenshot.png?raw=true "Screenshot")

Live: http://aemonitor.mobycrypt.com

Real time dashboard monitor for Aeternity blockchain (https://aeternity.com/).

Server side: Node.js + PostgreSQL

Client side: Vue.js + SemanticUI

# Current features:

Core stats:
- key blocks list table (including micro blocks and transactions count) [last 20]
- miners percentage chart [Last 24h]
- micro blocks in key blocks chart [last 20 key blocks]
- block height
- block difficulty
- block reward

Transactions stats: 
- avg block mine time [last 1h]
- last transactions table [last 20]
- transactions done count per hour chart [last 24h]
- transactions per type chart [last 24h]
- transactions done count [last 24h]
- avg fee [last 24h]

Token stats:
- AE token exchanges stats table (Binance, Bithumb, Gate.io, Uex)

# Install

## Server:

**[Required]**
Update properties.js and provide:
- database (postgres) connection info [user, host, database, password, port],
- node info [node url, node port, network id **important**!]

**[Optional]**
Configure properties.js settings for blockchain check interval seconds and other settings.

**Install**: npm install

**Run:** node app.js (default port 6789)

## Client:

**[Optional]**
Configure assets/properties.js for server check interval seconds.

**Install**: npm install

**Run (vue live server):** npm run serve

**Build:** npm run build

