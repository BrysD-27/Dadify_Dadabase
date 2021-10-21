const express = require('express');
const apiRouter = express.Router();


const usersRouter = require('./product/users/usersindex');
apiRouter.use('/users', usersRouter);

const productsRouter = require('../api/product/product')
apiRouter.use('/products', productsRouter);

const reviewsRouter = require('./reviews/reviews_router')
apiRouter.use('/reviews', reviewsRouter);

const cartRouter = require('./cart/index')
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;