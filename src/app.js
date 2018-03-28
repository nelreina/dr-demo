const express = require('express');
const path = require('path');
const redis = require('redis');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const { promisify } = require('util');
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
// app.use(express.static('client'));
// Body Parser initi
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Redis Client

const client = redis.createClient();
const hgetAllAsync = promisify(client.hgetall).bind(client);
const hsetAsync = promisify(client.hmset).bind(client);

client.on('connect', () => console.log('Connected to redis...'));

// Method Override (to be able to send delete request)
app.use(methodOverride('_method'));

// some simple routes
app.get('/api/ping', (req, res) => {
  res.json({ message: 'PONG' });
});

app.get('/api/search/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await hgetAllAsync(id);
    if (user) {
      res.json(user);
    } else {
      res.json({ message: `User with id \"${id}\" not found!` });
    }
  } catch (error) {
    console.error(error);
    res.send('Error occured on the server!');
  }
});

app.post('/api/add-user', async (req, res) => {
  const fields = [];
  const keys = Object.keys(req.body);
  keys.forEach(k => {
    if (k !== 'id') {
      fields.push(k);
      fields.push(req.body[k]);
    }
  });

  const { id } = req.body;
  try {
    const resp = await hsetAsync(id, fields);
    res.json(resp);
  } catch (error) {
    console.error(error);
    res.send('Error occured on the server!');
  }
});

app.listen(PORT, () => {
  console.info(`App is running on port ${PORT}`);
});
