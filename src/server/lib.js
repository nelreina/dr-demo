const fs = require('fs');
const { find, reduce, keyBy } = require('lodash');
const { converters } = require('nelreina-node-utils');
const { toJSON } = converters;
const { createClient } = require('then-redis');

const reports = require('./db/reports.json');
const dashboard = require('./db/dashboard.json');
const user = require('./db/mock-users.json');

const client = createClient();

const initReports = reports => {
  const init = reports.map(rep => {
    const group = rep.code;
    const groupName = 'Total ' + rep.name;
    const groupValue = '1';
    const groupAmount = 0;

    rep.mainGroups = dashboard[rep.code] || [
      { group, groupName, groupValue, groupAmount }
    ];
    return rep;
  });
  return keyBy(init, 'code');
};

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
exports.reports = initReports(reports);
const calcGroupSum = (data, SumRow) => {
  let groupSum = 0;
  if (data) {
    const calcRows = data.filter(
      row =>
        row.CoaCode.startsWith(SumRow['groupValue']) && row.RowType === 'VAL'
    );
    groupSum = reduce(
      calcRows,
      (sum, row) => {
        sum += row.Total;
        return sum;
      },
      0
    );
  }
  return groupSum;
};
exports.getReports = async id => {
  const reports = await redis('reports');
  const promises = [];
  const reportCodes = Object.keys(reports);
  reportCodes.forEach(code => {
    promises.push(calcReport(id, code, reports[code]));
  });
  const allrep = await Promise.all(promises);
  return keyBy(allrep, 'code');
};

const redis = async key => {
  const data = await client.get(key);
  return JSON.parse(data);
};

const calcReport = async (id, code, report) => {
  const data = await redis(`${id} - ${code}`);
  const mainGroups = report.mainGroups.map(grp => {
    const sum = calcGroupSum(data, grp);
    grp.groupAmount = sum;
    return grp;
  });
  report['mainGroups'] = mainGroups;

  return report;
};

exports.redis = redis;
