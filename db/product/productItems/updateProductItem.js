const client = require("../../client");

async function updateProductItem({inventoryId, name, description, sku, price}) {
    try {
        const {rows:[product]} = await client.query(`
            UPDATE product
            SET 
                inventory_id = $2, name = $3, description = $4, sku = $5, price = $6
            WHERE id = $1
            RETURNING *;
        `, [inventoryId, name, description, sku, price]);

        return product;
        
    } catch (error) {
        console.error("Error updating product item.");
        throw error;
    };
};

module.exports = updateProductItem;