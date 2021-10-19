const cart_itemRouter = require('express').Router();

const {addItemToCart, getCartItemById, updateCartItem, destroyCartItem, getItemsByCartId, clearCart} = require('../../db/cart_items/index');

cart_itemRouter.get('/:cart_id', async (req, res, next) => {
    const id = req.params.cart_id;
    try {
        if(req.user) {
            const cartItems = await getItemsByCartId(id);
            res.send(cartItems);
            next();
        }
        res.status(401);
        next({name: 'Cart Item Error', message: 'Not a user'});
    } catch (error) {
        next(error);
    }
});

cart_itemRouter.post('/', async (req, res, next) => { 
    const {cart_id, product_id, quantity} = req.body;
    try {
        if(req.user) {
            const newItem = await addItemToCart({cart_id, product_id, quantity});
            res.send(newItem);
            next();
        }
        res.status(401);
        next({name: 'Cart Item Error', message: 'Not a user, unable to add item to user cart'});
    } catch (error) {
        next(error);
    }
});

cart_itemRouter.patch('/:cart_itemId', async (req, res, next) => {
    const id = req.params.cart_itemId;
    const {quantity} = req.body;
    try {
        if(req.user) {
            const updatedItem = await updateCartItem({id, quantity});
            res.send(updatedItem);
            next();
        }
        res.status(401);
        next({name: 'Cart Item Error', message: 'Unable to add item, not a user'});
    } catch (error) {
        next(error);
    }
});

cart_itemRouter.delete('/:cart_itemId', async (req, res, next) => {
    const id = req.params.cart_itemId;
    try{
        const deleteItem = await destroyCartItem(id);
        res.send({deleteItem});
    } catch (error) {
        throw error;
    }
});

cart_itemRouter.delete('/clear_cart/:cart_id', async(req, res, next) => {
    const id = req.params.cart_id;
    try {
        const clearItems = await clearCart(id);
        res.send(clearItems);
    } catch (error) {
        throw error;
    }
});

module.exports = cart_itemRouter;