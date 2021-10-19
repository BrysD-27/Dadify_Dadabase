const client = require("../../client");

async function getProductItemById(id) {
    try {
        const {rows:[product]} = await client.query(`
            SELECT *
            FROM product
            WHERE id = $1;
        `, [id]);

        return product;

    } catch (error) {
        console.error("Error getting product item by id.");
        throw error;
    };
};

module.exports = getProductItemById;