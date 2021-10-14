const client = require("../../../client");

async function deleteCartItem(id) {
    try {
        const {rows:[cartItem]} = await client.query(`
            DELETE FROM cartItem
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return cartItem;
        
    } catch (error) {
        console.error("Error deleting cart item.");
        throw error;
    };
};

module.exports = deleteCartItem