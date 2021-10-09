const client = require("../../../client");

async function createProductItem({id, inventoryId, name, description, sku, price, created_at}) {
    try {
        const {rows:[productItem]} = await client.query(`
            INSERT INTO product (
                id,
                "inventoryId",
                name, 
                description,
                sku,
                price,
                created_at
            )
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [id, inventoryId, name, description, sku, price, created_at]);

        return productItem;
    } catch (error) {
        console.error("Error creating a product item.");
        throw error;
    };
};

module.exports = createProductItem;