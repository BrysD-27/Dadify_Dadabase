const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

const usersRouter = require('../api/users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('../api/product/product')
apiRouter.use('/products', productsRouter);

const reviewsRouter = require('./reviews/reviews_router')
apiRouter.use('/reviews', reviewsRouter);

const cartRouter = require('./cart/index')
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;