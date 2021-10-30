const productsRouter = require('express').Router();
const {updateProductItem, } = require('../../db');

productsRouter.patch('/:productId', async (req, res, next) => {
    const {product_id} = req.params.productId;
    const {name, description, price} = req.body;
    try {
        const patchedProduct = await updateProductItem(product_id, name, description, price);
        res.send({message: 'Success', patchedProduct})
        next();

    } catch (error) {
        console.error("Error updating product.");
        throw error;
    };
});

module.exports = productsRouter