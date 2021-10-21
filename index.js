const { PORT = 3000 } = process.env;

const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./api/secret');
const {getUserById} = require('./db');


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

server.use(async (req, res, next) => {
    if(req.header('Authorization')) {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            next();
        }
        const token = authHeader.split('Bearer ')[1];
        const { id } = jwt.verify(token, JWT_SECRET);
        console.log('HERES YOUR ID', id);
        if(!id) {
            next();
        }
        req.user = await getUserById(id);
        console.log("USER", req.user);
        next();
    } else {
        next();
    }
});

server.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});