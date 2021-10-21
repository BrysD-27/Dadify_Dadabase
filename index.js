const { PORT = 3000 } = process.env;

const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req,res,next) => {
    console.log("<_____Body Logger START_____");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");

    next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

const  client  = require('./db/client');
client.connect();


server.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});