'use strict';

const mongoose = require('mongoose');
const app = require('express')();
const Server = require('http').Server(app);
const bodyParser = require('body-parser')
const port = process.env.PORT || 9000;
// const config = require('./config');

Server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
// start mongodb connection
// mongoose.connect(config.db, {
//   keepAlive: 1,
//   connectTimeoutMS: 30000
// }).then(() => {
//   Server.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
//   });
// }, console.log);

// middleware for bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // enable CORS from client side
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

require('./routes')(app);

module.exports = {
  Server,
};