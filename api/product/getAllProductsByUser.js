const productsRouter = require('express').Router();
const {getAllUserProductItems} = require('../../db');

productsRouter.get('/:products/username', async (req, res, next) => {
    const {username} = req.params;

    try {
        const userItems = await getAllUserProductItems({username});
        res.send(userItems);

    } catch (error) {
        console.error("Error getting all user product items.");
        throw error;
    };
});

module.exports = productsRouter;