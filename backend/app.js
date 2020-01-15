const express = require('express');

/*creation de l application sous express*/
const app = express();

app.use((req,res, next) => {
  console.log('first middleware');
  next();
});

app.use((req,res, next) => {
  res.send('Hello from express!')
});

/*export du module app*/
module.exports = app;
