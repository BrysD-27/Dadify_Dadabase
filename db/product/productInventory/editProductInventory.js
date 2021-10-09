const client = require("../../../client");

async function editProductInventory({id, quantity, createdAt, modifiedAt}) {
    try {
        const {rows:[productInventory]} = await client.query(`
            UPDATE productInventory
            SET quantity = $2, "createdAt" = $3, "modifiedAt" = $4
            WHERE id = $1
            RETURNING *;
        `, [id, quantity, createdAt, modifiedAt]);

        return productInventory;
        
    } catch (error) {
        console.error("Error editing product inventory.");
        throw error;
    };
};

module.exports = editProductInventory;