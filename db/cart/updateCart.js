const client = require("../../client");

async function updateCart({id, userId, productId, quantity}) {
    try {
        const {rows:[cart]} = await client.query(`
            UPDATE cart
            SET
                "userId" = $2, 
                "productId" = $3,
                quantity = $4
            WHERE id = $1
            RETURNING *;
        `, [id, userId, productId, quantity]);

        return cart;
    } catch (error) {
        console.error("Error editing product inventory.");
        throw error;
    };
};

module.exports = updateCart;