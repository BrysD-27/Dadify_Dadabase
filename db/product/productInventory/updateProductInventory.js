const client = require("../../client");

async function updateProductInventory({id, quantity, modifiedAt}) {
    try {
        const {rows:[productInventory]} = await client.query(`
            UPDATE productInventory
            SET 
                quantity = $2,  
                "modifiedAt" = $3
            WHERE id = $1
            RETURNING *;
        `, [id, quantity, modifiedAt]);

        return productInventory;
        
    } catch (error) {
        console.error("Error editing product inventory.");
        throw error;
    };
};

module.exports = updateProductInventory;