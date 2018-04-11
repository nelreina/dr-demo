const express = require('express');
const path = require('path');
const { createClient } = require('then-redis');
const bodyParser = require('body-parser');
const cors = require('cors');
const { keys } = require('lodash');
const Log4js = require('log4js');
const S = require('string');

S.extendPrototype();
Log4js.configure('./log4js.json');
require('dotenv').config();

const initImport = require('./import-data-2-redis');
const { getReports } = require('./lib');
const PORT = process.env.PORT;

const publicPath = path.resolve(__dirname, '../../public');

// Get logger
const logger = Log4js.getLogger('dr-demo');

const app = express();
app.use(cors());
app.use(express.static(publicPath));
// Body Parser initi
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Connect Logger to Express
app.use(Log4js.connectLogger(logger, { level: 'debug' }));

// Redis Client
const client = createClient();

client.on('connect', () => {
  logger.info('Connected to redis...');
  initImport(client, logger);
});

app.get('/locales/:key', async (req, res) => {
  try {
    const { key } = req.params;
    logger.info(`get locale/${key}`);
    const data = await client.get(`locale-${key}`);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      logger.error(`api/${key}: "No data found"`);
      res.status(404).json({ message: `No data found!` });
    }
  } catch (error) {
    logger.error(error);
    res.send('Error occured on the server!');
  }
});
app.get('/api/translations/:key', async (req, res) => {
  try {
    const { key } = req.params;
    logger.info(`get locale/${key}`);
    const data = await client.get(`locale-${key}`);
    if (data) {
      const words = [];
      const obj = JSON.parse(data);
      const tkeys = keys(obj);
      tkeys.forEach(key => {
        const value = obj[key];
        words.push({ key, value });
      });
      res.send(words);
    } else {
      logger.error(`api/${key}: "No data found"`);
      res.status(404).json({ message: `No data found!` });
    }
  } catch (error) {
    logger.error(error);
    res.send('Error occured on the server!');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await client.get(`${username}/${password}`);
    if (data) {
      const response = {};
      response.isAuthenticated = true;
      response.user = JSON.parse(data);
      res.json(response);
    } else {
      res.status(403).send();
    }
  } catch (error) {
    logger.error(error);
    res.status(503).send(error);
  }
});

app.get('/api/reports/:matchId', async (req, res) => {
  try {
    const data = await getReports(req.params.matchId);
    res.send(data);
  } catch (error) {
    logger.error(error);
    res.status(503).send(error);
  }
});

app.get('/api/:key', async (req, res) => {
  try {
    const { key } = req.params;
    logger.info(`get api/${key}`);
    let retjson;
    const data = await client.get(key);
    if (data) {
      retjson = data;
      res.json(JSON.parse(retjson));
    } else {
      logger.error(`api/${key}: "No data found"`);
      res.status(404).json({ message: `No data found!` });
    }
  } catch (error) {
    logger.error(error);
    res.send('Error occured on the server!');
  }
});
app.get('/api/ncoa/:key/:coacode/:col', async (req, res) => {
  try {
    const { key, coacode, col } = req.params;
    logger.info(`get api/${key}/${coacode}/${col}`);
    const data = await client.get(key);
    if (data) {
      // Filter Results
      // const ncoa = JSON.parse(data);
      const ncoa = JSON.parse(data).filter(row => {
        return row.CoaCode === coacode && row.CoaColumn === col;
      });
      res.json(ncoa);
    } else {
      logger.error(`api/${key}: "No data found"`);
      res.status(404).json({ message: `No data found!` });
    }
  } catch (error) {
    logger.error(error);
    res.send('Error occured on the server!');
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  logger.info(`App is running on port ${PORT}`);
});
