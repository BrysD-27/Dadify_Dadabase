const productsRouter = require('express').Router();
const {getAllProductItems} = require('../../db');

productsRouter.get('/', async (req, res, next) => {
    try {
        const productItems = await getAllProductItems();
        res.send(productItems);

    } catch (error) {
        console.error("Error getting all product items.");
        throw error;
    };
});

module.exports = productsRouter