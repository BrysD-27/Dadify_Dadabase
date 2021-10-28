const client = require("../../client");

async function updateProductItem({product_id, name, description, price}) {
    try {
        const {rows:[product]} = await client.query(`
            UPDATE product
            SET 
            name = $2, description = $3, price = $4
            WHERE id = $1
            RETURNING *;
        `, [product_id, name, description, price]);

        return product;
        
    } catch (error) {
        console.error("Error updating product item.");
        throw error;
    };
};

module.exports = updateProductItem;