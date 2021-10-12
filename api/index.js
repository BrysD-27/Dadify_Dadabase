const apiRouter = require('express').Router();

const productsRouter = require('./product/product');

apiRouter.use('/products', productsRouter);