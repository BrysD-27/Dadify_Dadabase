const productsRouter = require('express').Router();
const {updateProductItem, getProductItemById} = require('../../db');

productsRouter.patch('/:productId', async (req, res, next) => {
    const {product_id} = req.params.productId;
    const product = await getProductItemById(product_id);
    const {name, description, sku, price, created_by} = req.body;
    try {
        const patchedProduct = await updateProductItem({
        name,
        description,
        sku,
        price,
        created_by
        });
        res.send(patchedProduct);
    } catch (error) {
        console.error("Error updating routine.");
        throw error;
    };
});

module.exports = productsRouter