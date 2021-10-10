const client = require("../../client");

async function createCart({user_id, product_id, quantity}) {
	try {
		const {rows:[cart]} = await client.query(`
				INSERT INTO cart (
					user_id,
					product_id,
					quantity
				)
				VALUES ($1, $2, $3)
				RETURNING *;
        `, [user_id, product_id, quantity]);

		if (!product_id) {
			return;
		}

		return cart;

	} catch (error) {
		console.error("Error, creating user cart.");
		throw error;
	}
}

module.exports = createCart;

// ON CONFLICT (user_id, product_id) DO NOTHING -> Maybe use later?