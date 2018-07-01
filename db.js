const mongoose = require('mongoose');
mongoose.connect('mongodb://asaad:pakistan123@ds117431.mlab.com:17431/mystory-db');

let db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error:', err);
});

db.once('open', () => {
  console.log('db connection established successfully');
});

module.exports = db;
