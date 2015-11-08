var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3030);
app.use(app.router);

app.get('/api/setup', function (req,res) {

  //var setup = // something

  return res.json({ A: 5 });
});



http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});