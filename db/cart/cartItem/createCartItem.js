const client = require("../../../client");

async function createCartItem({session_id, product_id, name, description, sku, price, quantity, created_at, modified_at}) {
    try {
        const {rows:[cartItem]} = await client.query(`
            INSERT INTO cartItem (
                session_id,
                product_id,
                name, 
                description,
                sku,
                price,
                quantity,
                created_at,
                modified_at
            )
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `, [session_id, product_id, name, description, sku, price, quantity, created_at, modified_at]);

        return cartItem;
        
    } catch (error) {
        console.error("Error creating a cart item.");
        throw error;
    };
};

module.exports = createCartItem;