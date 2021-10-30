const productsRouter = require('express').Router();
const {getProductItemById, deleteProductItem} = require('../../db');

productsRouter.delete('/:productId', async (req, res, next) => {
    try {
        const {id} = req.params.productId;
        const product = await getProductItemById(id);
        const deletedProduct = await deleteProductItem(product.id);
        res.send(deletedProduct);
        next();
    } catch (error) {
        console.error("Error deleting product item.");
        throw error
    };
    next();
});

module.exports = productsRouter;

// CHECK ON LINE 8 -> req.users.id -> right? or change to...?