const productsRouter = require('express').Router();
const {getProductItemById, deleteProductItem} = require('../../db');

productsRouter.delete('/:productId', async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await getProductItemById(id);
        if (product.created_by === req.users.id) {
            const deletedProduct = await deleteProductItem(product.id);
            res.send(deletedProduct);
        } else {
            next();
        }
    } catch (error) {
        console.error("Error deleting product item.");
        throw error
    };
});

module.exports = productsRouter;

// CHECK ON LINE 8 -> req.users.id -> right? or change to...?