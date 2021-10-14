const productsRouter = require('express').Router();
const {createProductItem} = require('../../db');

productsRouter.post('/', async (req, res, next) => {
	const {name, description, sku, price} = req.body;
	const {by: created_by} = req.body;
	try {
		const createdProductItem = await createProductItem({
			name,
			description,
            sku,
            price,
            created_by
		});
		res.send(createdProductItem);
	} catch (error) {
		console.error("Error creating product item.");
		next(error);
	};
});

module.exports = productsRouter