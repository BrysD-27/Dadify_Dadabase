const cart_itemRouter = require('express').Router();

const {addItemToCart, updateCartItem, destroyCartItem, getItemsByCartId, clearCart} = require('../../db/cart_items/index');

cart_itemRouter.get('/:cart_id', async (req, res, next) => {
    const id = req.params.cart_id;
    try {
        const cartItems = await getItemsByCartId(id);
        res.send(cartItems);
        next();
    } catch (error) {
        next(error);
    }
});

cart_itemRouter.post('/', async (req, res, next) => { 
    const {cart_id, product_id, quantity} = req.body;
    try {
        const newItem = await addItemToCart({cart_id, product_id, quantity});
        res.send(newItem);
        next();
    } catch (error) {
        next(error);
    }
});

cart_itemRouter.patch('/:cart_itemId', async (req, res, next) => {
    const id = req.params.cart_itemId;
    const {quantity} = req.body;
    try {
        const updatedItem = await updateCartItem({id, quantity});
        res.send(updatedItem);
        next();
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