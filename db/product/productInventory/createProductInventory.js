const client = require("../../../client");

async function createProductInventory({id, quantity, created_at}) {
    try {
        const {rows:[productInventory]} = await client.query(`
            INSERT INTO productInventory (
                id,
                quantity, 
                created_at
            )
            VALUES($1, $2, $3)
            RETURNING *;
        `, [id, quantity, created_at]);

        return productInventory;
    } catch (error) {
        console.error("Error creating product inventory.");
        throw error;
    };
};

module.exports = createProductInventory;