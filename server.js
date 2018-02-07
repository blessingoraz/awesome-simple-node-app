const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(db.url);

const dbConn = mongoose.connection;

dbConn.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
  process.exit();
});
dbConn.once('open', () => {
  console.log('DB connected successfully!');
});

app.get('/', function(req, res){
  res.json({"message": "Welcome to the simple tutorial."});
});

// Require routes
require('./routes/users')(app);
require('./routes/notes')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
});

