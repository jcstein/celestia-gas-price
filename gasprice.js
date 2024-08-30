#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Celenium Gas Price
// @raycast.mode inline
// @raycast.refreshTime 5m

// Optional parameters:
// @raycast.icon ⛽
// @raycast.packageName Celestia Gas

// Documentation:
// @raycast.description Gasprice on Celestia Mainnet Beta
// @raycast.author joshcs
// @raycast.authorURL https://raycast.com/joshcs

const https = require('https');

function formatGasPrice(price) {
  return Number(price).toFixed(6);
}

function fetchGasPrice() {
  return new Promise((resolve, reject) => {
    https.get('https://api.celenium.io/v1/gas/price', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    const gasPrice = await fetchGasPrice();
    const formattedPrices = {
      slow: formatGasPrice(gasPrice.slow),
      median: formatGasPrice(gasPrice.median),
      fast: formatGasPrice(gasPrice.fast)
    };
    console.log(`Gas Prices: Slow: ${formattedPrices.slow}, Median: ${formattedPrices.median}, Fast: ${formattedPrices.fast}`);
  } catch (error) {
    console.log(`Error: Failed to fetch gas price: ${error.message}`);
  }
}

main();
