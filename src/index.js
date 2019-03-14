const express = require('express');
const bodyParser = require('body-parser');
const signale = require('signale');
const nconf = require('nconf');

nconf.argv()
  .env()
  .file('local', './config.json');

// read env variables
const port = nconf.get('PORT');

// initialize the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', async (req, res) => {
  // read the data
  const randomParam = req.body.randomParam || req.query.randomParam;

  res.status(200).send({
    randomParam
  });
});

// send 404 for anything else requested
app.use('*', (req, res) => {
  res.status(404).send({error: 'Not Found'});
});

// initialize the http server
app.listen(port, () => signale.info(`Listening on port: ${port}`));

// catch any uncaught exceptions, so that the server never crashes
process.on('uncaughtException', err => {
  signale.error('Problem: uncaughtException', err);
});

process.on('unhandledRejection', (reason, p) => {
  signale.error('Problem: Unhandled Rejection at: Promise', p, 'reason:', reason);
});
