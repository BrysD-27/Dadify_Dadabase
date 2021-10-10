const client = require("../../client");

async function getCartByUserId(userId) {
	try {
		const {rows:[cart]} = await client.query(`
			Select * 
      		FROM cart
      		WHERE "userId" = $1;
      	`, [userId]);

		return cart;

	} catch (error) {
		console.error("Error getting cart by user id.");
		throw error;
	}
};

module.exports = getCartByUserId;