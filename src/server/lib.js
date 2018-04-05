const fs = require('fs');
const { find } = require('lodash');
const { converters } = require('nelreina-node-utils');
const { toJSON } = converters;
const reports = require('./db/reports.json');
const user = require('./db/mock-users.json');

exports.addUsers = client => {
  client.set('ogarcia/ogarcia', JSON.stringify(user.ogarcia));
  client.set('guest/guest', JSON.stringify(user.guest));
  client.set('nreina/polka', JSON.stringify(user.nreina));
};

const saveTranslations = (key, wordArray, client, logger) => {
  const words = {};
  wordArray.forEach(word => {
    try {
      words[word.key] = word.value.trim();
    } catch (error) {
      logger.error(word);
    }
  });
  client.set(key, JSON.stringify(words));
};

exports.importReports = (client, logger, dataDir) => {
  fs.readdirSync(`${dataDir}/reports`).forEach(function(file) {
    const [mid, code] = file.split(' - ');
    logger.debug(`importing... ${file}`);
    const name = file.replace('.json', '').substring(6);
    if (code) {
      const key = `${mid} - ${code}`;
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
  saveTranslations(key, json, client, logger);
};
exports.reports = reports;
