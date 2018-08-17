let express = require('express'),
    app = express(),
    server = require('http').createServer(app);
let port = 5000;

require('./route') (express,app);
server.listen(port, (req, res) => {
  console.log('Server is running port ' + port);
});
