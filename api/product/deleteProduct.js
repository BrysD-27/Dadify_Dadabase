const productsRouter = require('express').Router();
const {getProductItemById, deleteProductItem} = require('../../db');

productsRouter.delete('/:productId', async (req, res, next) => {
    try {
        const id = req.params.productId;
<<<<<<< HEAD
        const deletedProduct = await deleteProductItem(id);
=======
        const product = await getProductItemById(id);
        const deletedProduct = await deleteProductItem(product.id);
>>>>>>> 42062d321ac4c2da1ce902bd58b63cb87d7dbfad
        res.send(deletedProduct);
        next();
    } catch (error) {
        console.error("Error deleting product item.");
        throw error
    };
});

module.exports = productsRouter;