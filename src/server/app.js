const express = require('express');
const path = require('path');
const { createClient } = require('then-redis');
const bodyParser = require('body-parser');
const cors = require('cors');
const Log4js = require('log4js');
Log4js.configure('./log4js.json');

require('dotenv').config();

const initImport = require('./import-data-2-redis');
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

app.post('/api/login', async (req, res) => {
  try {
    const data = {
      isAuthenticated: true,
      user: {
        username: 'nelreina'
      }
    };
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
    const data = await client.get(key);
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
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  logger.info(`App is running on port ${PORT}`);
});
