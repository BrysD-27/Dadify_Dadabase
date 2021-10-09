const client = require("../../../client");

async function getAllProductItems() {
    try {
        const {rows: product} = await client.query(`
            SELECT *
            FROM product;
        `);
        return product;
    } catch (error) {
        console.error("Error getting all product items.");
        throw error;
    };
};

module.exports = getAllProductItems;