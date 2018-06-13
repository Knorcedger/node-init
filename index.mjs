import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import nconf from 'nconf';

nconf.argv()
  .env()
  .file('local', './config.json')

// read env variables
const port = nconf.get('PORT');
winston.level = nconf.get('LOG_LEVEL');

// initialize the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/sync', async (req, res) => {
  // read the data
  const randomParam = req.body.randomParam;

  res.status(200).send({
    randomParam
  });
});

// initialize the http server
app.listen(port, () => winston.info(`Listening on port: ${port}`));

// catch any uncaught exceptions, so that the server never crashes
process.on('uncaughtException', err => {
  winston.error('Problem: uncaughtException', err);
});

process.on('unhandledRejection', (reason, p) => {
  winston.error('Problem: Unhandled Rejection at: Promise', p, 'reason:', reason);
});
