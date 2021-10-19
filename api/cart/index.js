const cartRouter = require('express').Router();
const {createCart, getCartAndItemsByUser, updateCartTotal} = require('../../db/cart/index');

cartRouter.get('/', async (req, res, next) => {
    try {
        const id = req.user.id;
        if(req.user) {
            const cart = await getCartAndItemsByUser(id);
            res.send(cart);
            next();
        }
        res.status(401);
        next({name:'Cart Error', message: 'No cart found under this user_id'});
    } catch (error) {
        throw error;
    }
});

cartRouter.post('/', async (req, res, next) => {
    const {total} = req.body;
    const id = req.user.id;
    try {
        if(req.user) {
            const cart = await createCart({id, total});
            res.send(cart);
            next();
        }
        res.status(401);
        next({name: 'Cart Error', message: 'Not a user'});
    } catch (error) {
        throw error;
    }
});

cartRouter.patch('/', async (req, res, next) => {
    const {total} = req.body;
    const id = req.user.id;
    try {
        if(req.user) {
            const cart = await updateCartTotal({id, total});
            res.send(cart);
            next();
        }
        res.status(401);
        next({name: 'Cart error', message: 'Not a user, unable to update total'});
    } catch (error) {
        throw error;
    }
});

module.exports = cartRouter;