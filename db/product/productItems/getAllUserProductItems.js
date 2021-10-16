const client = require("../../client");

async function getAllUserProductItems({username}) {
    try {
        const {rows: products} = await client.query(`
            SELECT 
                product.*,
                users.username AS "creator_name"
            From product
            JOIN users ON users.id = product.creator_id
            WHERE username = $1;
        `, [username]);

        return products;
    } catch (error) {
        console.error("Error getting all products by user.");
        throw error;
    };
};

module.exports = getAllUserProductItems