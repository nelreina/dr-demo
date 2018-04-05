const fs = require('fs');
const { find } = require('lodash');
const { converters } = require('nelreina-node-utils');
const { toJSON } = converters;

const findReportCode = name => {
  const rkeys = Object.keys(reports);
  const rdata = rkeys.map(key => reports[key]);
  const ret = find(rdata, { name });
  return ret ? ret.code : null;
};

const ogarcia = {
  username: 'ogarcia',
  fullName: 'Oscar Garcia',
  email: 'oscar.garcia@ibis-management.com',
  isAdmin: true
};
const nreina = {
  username: 'nreina',
  fullName: 'Nelson Reina',
  email: 'nelson.reina@ibis-management.com',
  isAdmin: true
};
const guest = {
  username: 'guest',
  fullName: 'Guest User',
  email: 'info@ibis-management.com',
  isAdmin: false
};

exports.addUsers = client => {
  client.set('ogarcia/ogarcia', JSON.stringify(ogarcia));
  client.set('guest/guest', JSON.stringify(guest));
  client.set('nreina/polka', JSON.stringify(nreina));
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
  SUB2: {
    code: 'SUB2',
    name: 'Sub Report II',
    header: 'ResidentDetailed',
    countAmountColumns: 4
  }
};

exports.importReports = (client, logger, dataDir) => {
  fs.readdirSync(`${dataDir}/reports`).forEach(function(file) {
    logger.debug(`importing... ${file}`);
    const name = file.replace('.json', '').substring(6);
    const code = findReportCode(name);
    if (code) {
      const key = `${file.substring(0, 3)} - ${code}`;
      const data = require(`${dataDir}/reports/${file}`);
      client.set(key, JSON.stringify(data));
    }
  });
};
exports.importTranslations = async (client, logger, dataDir, file) => {
  logger.debug(`importing... ${file}`);
  const name = file.replace('.csv', '');
  const key = `locale-${name}`;
  const data = fs
    .readFileSync(`${dataDir}/translations/${file}`)
    .toLocaleString();
  const json = await toJSON(data);
  const words = {};
  json.forEach(word => {
    words[word.key] = word.value.trim();
  });
  client.set(key, JSON.stringify(words));
};
exports.reports = reports;
