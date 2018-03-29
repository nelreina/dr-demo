const express = require('express');
const { createClient } = require('then-redis');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
// app.use(express.static('client'));
// Body Parser initi
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Redis Client

const client = createClient();

client.on('connect', () => console.log('Connected to redis...'));

app.get('/api/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const data = await client.get(key);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      res.json({ message: `No data found!` });
    }
  } catch (error) {
    console.error(error);
    res.send('Error occured on the server!');
  }
});

app.listen(PORT, () => {
  console.info(`App is running on port ${PORT}`);
});
