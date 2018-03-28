const { createClient } = require('then-redis');
const fs = require('fs');
const path = require('path');
const { uniq } = require('lodash');

const client = createClient();
const loads = { 433: { period: 201801 }, 436: { period: 201802 } };
client.on('connect', () => console.log('Connected to redis...'));
client.set('loads', JSON.stringify(loads));
const dataDir = path.resolve(__dirname, '../data');
(async () => {
  const reports = [];
  fs.readdirSync(dataDir).forEach(function(file) {
    const key = file.replace('.json', '');
    console.log(`${key}`);
    reports.push(key.substring(6));
    const data = require(`${dataDir}/${file}`);
    client.set(key, JSON.stringify(data));
    // console.info(data);
  });
  client.set('reports', JSON.stringify(uniq(reports)));
  const ret = await client.get('reports');
  console.info('reports : ', ret);
})();
