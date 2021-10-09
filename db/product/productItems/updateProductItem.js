const client = require("../../../client");

async function updateProductItem({id, inventoryId, name, description, sku, price, modifiedAt}) {
    try {
        const {rows:[product]} = await client.query(`
            UPDATE product
            SET 
                "inventoryId" = $2, name = $3, description = $4, sku = $5, price = $6, "modifiedAt" = $7
            WHERE id = $1
            RETURNING *;
        `, [id, inventoryId, name, description, sku, price, modifiedAt]);

        return product;
        
    } catch (error) {
        console.error("Error updating product item.");
        throw error;
    };
};

module.exports = updateProductItem;