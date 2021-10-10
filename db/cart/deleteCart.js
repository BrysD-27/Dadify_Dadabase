const client = require("../../client");

async function deleteCart(id) {
	try {
		const {rows:[cart]} = await client.query(`
        	DELETE FROM cart
        	WHERE id = $1
			RETURNING *;
      	`, [id]);

		return cart;

	} catch (error) {
		throw error;
	}
}

module.exports = deleteCart;