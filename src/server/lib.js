const fs = require('fs');
const { find } = require('lodash');
const { converters } = require('nelreina-node-utils');
const { toJSON } = converters;
const reports = require('./db/reports.json');
const user = require('./db/mock-users.json');

const findReportCode = name => {
  const rkeys = Object.keys(reports);
  const rdata = rkeys.map(key => reports[key]);
  const ret = find(rdata, { name });
  return ret ? ret.code : null;
};

exports.addUsers = client => {
  client.set('ogarcia/ogarcia', JSON.stringify(user.ogarcia));
  client.set('guest/guest', JSON.stringify(user.guest));
  client.set('nreina/polka', JSON.stringify(user.nreina));
};

const saveTranslations = (key, wordArray, client) => {
  const words = {};
  wordArray.forEach(word => {
    words[word.key] = word.value.trim();
  });
  client.set(key, JSON.stringify(words));
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
  saveTranslations(key, json, client);
};
exports.reports = reports;
