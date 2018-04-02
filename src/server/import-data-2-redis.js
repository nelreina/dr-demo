const { createClient } = require('then-redis');
const fs = require('fs');
const path = require('path');
const { importReports, importTranslations, reports } = require('./lib');
const periods = {
  // 433: { id: 433, period: 201801, name: 'Jan 2018' },
  436: { id: 436, period: 201802, name: 'Feb 2018' }
};

const dataDir = path.resolve(__dirname, '../../data');
module.exports = async (client, logger) => {
  client.flushdb();
  importReports(client, logger, dataDir);
  await importTranslations(client, logger, dataDir, 'es.csv');
  client.set('periods', JSON.stringify(periods));
  client.set('reports', JSON.stringify(reports));
  const ret = await client.get('locale-es');
  logger.info('Imported reports: ', ret);
};
