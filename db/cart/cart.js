const client = require("../client");

async function createCart({user_id, total}) {
	try {
		const {rows:[cart]} = await client.query(`
				INSERT INTO cart (
					user_id,
					total
				)
				VALUES ($1, $2)
				RETURNING *;
        `, [user_id, total]);
		return cart;

	} catch (error) {
		console.error("Error, creating user cart.");
		throw error;
	}
}

async function getCartAndItemsByUser(userId) {
	try {
		const {rows: [cart]} = await client.query(`
			SELECT * 
			FROM cart
			WHERE user_id=${userId};
		`);

		const {rows:[items]} = await client.query(`
			SELECT * FROM product
			JOIN cart_item ON product_id = product.id
			WHERE cart_id = ${cart.id};
		`);
		cart.items = items;
		return cart;
	} catch (error) {
		throw error;
	}
}

async function updateCartTotal({userId, total}) {
	try {
		const {rows: [cart]} = await client.query(`
			UPDATE cart
			SET total=${total}, modified_at= NOW()
			WHERE user_id=${userId}
			RETURNING *;
		`);
		return cart;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createCart, 
	getCartAndItemsByUser,
	updateCartTotal
}

