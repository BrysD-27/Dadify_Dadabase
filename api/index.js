const apiRouter = require('express').Router();

const productsRouter = require('./product/product');
const cartRouter = require('./cart/index');

apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);
const reviewsRouter = require('./reviews/reviews_router')
