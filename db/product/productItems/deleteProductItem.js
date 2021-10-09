const client = require("../../../client");

async function deleteProductItem(id) {
    try {
        const {rows:[productItem]} = await client.query(`
            DELETE FROM product
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return productItem;
    } catch (error) {
        console.error("Error deleting product item.");
        throw error;
    };
};

module.exports = deleteProductItem