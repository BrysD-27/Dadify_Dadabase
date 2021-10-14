const client = require("../../../client");

async function createProductItem({inventory_id, name, description, sku, price}) {
    try {
        const {rows:[productItem]} = await client.query(`
            INSERT INTO product (
                inventory_id,
                name, 
                description,
                sku,
                price
            )
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [inventory_id, name, description, sku, price]);

        return productItem;
    } catch (error) {
        console.error("Error creating a product item.");
        throw error;
    };
};

module.exports = createProductItem;