const { createClient } = require('then-redis');
const fs = require('fs');
const path = require('path');
const { find } = require('lodash');

const periods = {
  // 433: { id: 433, period: 201801, name: 'Jan 2018' },
  436: { id: 436, period: 201802, name: 'Feb 2018' }
};

const reports = {
  BS: {
    code: 'BS',
    name: 'Balance Sheet',
    header: 'ResidentDetailed',
    countAmountColumns: 4
  },
  PL: {
    code: 'PL',
    name: 'Profit & Loss',
    header: 'Resident',
    countAmountColumns: 2
  },
  CL: {
    code: 'CL',
    name: 'Contingent Liability',
    header: 'ResidentDetailed',
    countAmountColumns: 4
  },
  SUB1: {
    code: 'SUB1',
    name: 'Sub Report I',
    header: 'Custom',
    countAmountColumns: 12
  },
  SUB2: {
    code: 'SUB2',
    name: 'Sub Report II',
    header: 'ResidentDetailed',
    countAmountColumns: 4
  }
};
const findReportCode = name => {
  const rkeys = Object.keys(reports);
  const rdata = rkeys.map(key => reports[key]);
  const ret = find(rdata, { name });
  return ret ? ret.code : null;
};

const dataDir = path.resolve(__dirname, '../../data');
module.exports = async (client, logger) => {
  client.flushdb();
  client.set('periods', JSON.stringify(periods));
  fs.readdirSync(dataDir).forEach(function(file) {
    logger.debug(`importing... ${file}`);
    const name = file.replace('.json', '').substring(6);
    // logger.info(`name substr... ${name.substring(0, 3)}`);
    const code = findReportCode(name);
    if (code) {
      const key = `${file.substring(0, 3)} - ${code}`;
      const data = require(`${dataDir}/${file}`);
      client.set(key, JSON.stringify(data));
    }
    // logger.info(data);
  });
  client.set('reports', JSON.stringify(reports));
  const ret = await client.get('reports');
  logger.info('Imported reports: ', ret);
};
