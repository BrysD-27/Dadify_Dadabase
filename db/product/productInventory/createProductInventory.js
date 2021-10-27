const client = require("../../client");

async function createProductInventory({id, quantity}) {
    try {
        const {rows:[productInventory]} = await client.query(`
            INSERT INTO productInventory (
                id,
                quantity, 
            )
            VALUES($1, $2, $3)
            RETURNING *;
        `, [id, quantity]);

        return productInventory;
    } catch (error) {
        console.error("Error creating product inventory.");
        throw error;
    };
};

module.exports = createProductInventory;