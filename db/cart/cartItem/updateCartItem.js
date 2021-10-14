const client = require("../../../client");

async function updateCartItem({session_id, product_id, name, description, sku, price, quantity, created_at, modified_at}) {
    try {
        const {rows:[cartItem]} = await client.query(`
            UPDATE product
            SET 
                session_id = $2, 
                product_id = $3,
                name = $4, 
                description = $5, 
                sku = $6, 
                price = $7
            WHERE id = $1
            RETURNING *;
        `, [session_id, product_id, name, description, sku, price, quantity, created_at, modified_at]);

        return cartItem;
        
    } catch (error) {
        console.error("Error updating cart item.");
        throw error;
    };
};

module.exports = updateCartItem;