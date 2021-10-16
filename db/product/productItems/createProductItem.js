const client = require("../../client");

async function createProductItem({ name, description, sku, price}) {
    try {
        const {rows:[productItem]} = await client.query(`
            INSERT INTO product (
                name, 
                description,
                sku,
                price
            )
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [name, description, sku, price]);

        return productItem;
    } catch (error) {
        console.error("Error creating a product item.");
        throw error;
    };
};

module.exports = createProductItem;

//                inventory_id, -> for later?