const client = require("../../client");

async function updateProductItem({productId, name, description, price, image}) {
    try {
        const {rows:[product]} = await client.query(`
            UPDATE product
            SET 
            name = $2, description = $3, price = $4, image = $5
            WHERE id = $1;
        `, [productId, name, description, price, image]);

        return product;
        
    } catch (error) {
        console.error("Error updating product item.");
        throw error;
    };
};

module.exports = updateProductItem;