var app = require('./server-config.js');
//test test 2
var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
