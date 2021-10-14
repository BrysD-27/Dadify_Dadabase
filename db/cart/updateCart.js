const client = require("../../client");

async function updateCart({user_id, product_id, quantity}) {
    try {
        const {rows:[cart]} = await client.query(`
            UPDATE cart
            SET
                user_id = $2, 
                product_id = $3,
                quantity = $4
            WHERE id = $1
            RETURNING *;
        `, [user_id, product_id, quantity]);

        return cart;
    } catch (error) {
        console.error("Error editing product inventory.");
        throw error;
    };
};

module.exports = updateCart;