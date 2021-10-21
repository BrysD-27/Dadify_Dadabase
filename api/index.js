const apiRouter = require('express').Router();

const productsRouter = require('./product/product');
const cartRouter = require('./cart/index');
const reviewsRouter = require('./reviews/reviews_router')

apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/reviews', reviewsRouter);

module.exports = apiRouter;