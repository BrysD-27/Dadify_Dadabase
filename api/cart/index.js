const cartRouter = require('express').Router();
const {createCart, getCartAndItemsByUser, updateCartTotal} = require('../../db/cart/index');

cartRouter.get('/:user_id', async (req, res, next) => {
    try {   
        const id = req.params.user_id;
        const cart = await getCartAndItemsByUser(id);
        res.send(cart);
        next();
    } catch (error) {
        throw error;
    }
});

cartRouter.post('/:user_id', async (req, res, next) => {
    const {total} = req.body;
    const id = req.params.user_id;
    try {
        const cart = await createCart({id, total});
        res.send(cart);
        next();
    } catch (error) {
        throw error;
    }
});

cartRouter.patch('/:user_id', async (req, res, next) => {
    const {total} = req.body;
    const id = req.params.user_id;
    try {
        const cart = await updateCartTotal({id, total});
        res.send(cart);
        next();
    } catch (error) {
        throw error;
    }
});

module.exports = cartRouter;