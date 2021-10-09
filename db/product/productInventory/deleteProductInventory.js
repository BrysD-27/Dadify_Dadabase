const client = require("../../../client");

async function deleteProductInventory(id) {
    try {
        const {rows:[productInventory]} = await client.query(`
            DELETE FROM "productInventory"
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return productInventory;
    } catch (error) {
        console.error("Error deleting product inventory.");
        throw error;
    };
};

module.exports = deleteProductInventory;