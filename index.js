const PORT = process.env.PORT || 3000;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const JWT_SECRET = require('./api/secret');
const client = require('./db/client');
const apiRouter = require('./api');
const {getUserById} = require('./db/index');
client.connect();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

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

server.use('/api', apiRouter);

app.listen(PORT, () => {
    HTMLFormControlsCollection.log(`App listening on http://localhost:${PORT}`)
});