const { createClient } = require('then-redis');
const fs = require('fs');
const path = require('path');
const {
  importReports,
  importTranslations,
  reports,
  addUsers
} = require('./lib');
const periods = {
  // 433: { id: 433, period: 201801, name: 'Jan 2018' },
  436: { id: 436, period: 201802, name: 'Feb 2018' }
};

const dataDir = path.resolve(__dirname, '../../data');
const dbDir = path.resolve(__dirname, './db');
module.exports = async (client, logger) => {
  client.flushdb();
  importReports(client, logger, dbDir);
  addUsers(client);
  await importTranslations(client, logger, dataDir, 'es.csv');
  client.set('periods', JSON.stringify(periods));
  client.set('reports', JSON.stringify(reports));
  const ret = await client.get('reports');
  logger.info('Imported reports: ', ret);
};
