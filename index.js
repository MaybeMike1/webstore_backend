const express = require('express');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",  "*");
    next();
  });
const connection = require('./StartUp/MongoDb');

connection();
const routes = require('./StartUp/AppRoutes')(app);

const server = app.listen(8080, () => {
    console.log('app listening on', server.address().port);
});