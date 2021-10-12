const client = require("../../client");

async function createCart({id, userId, productId, inventoryId}) {
	try {
		const {rows:[cart]} = await client.query(`
				INSERT INTO cart_item (
					quantity
				)
				VALUES ($1, $2, $3, $4)
				ON CONFLICT ("userId", "productId") DO NOTHING
				RETURNING *;
        `, [id, userId, productId, inventoryId]);

		if (!productId) {
			return;
		}

		return cart;

	} catch (error) {
		console.error("Error, creating user cart.");
		throw error;
	}
}

module.exports = createCart;