var mongoose = require('mongoose');

mongoURI = 'mongodb://harvey1:none@ds157258.mlab.com:57258/hm-shortlydeploy-testing';
mongoose.connect(mongoURI);

// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongodb connection open');
});

module.exports = db;
