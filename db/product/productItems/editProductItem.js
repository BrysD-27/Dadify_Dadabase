const client = require("../../../client");

async function editProductItem(fields = {}) {
    const {id} = fields;
    delete fields.id;

    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    try {
        const {
            rows: [product],
        } = await client.query(`
            UPDATE product
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `, Object.values(fields));

        return product;
    } catch (error) {
        console.error("Error editing product item.");
        throw error;
    };
};

module.exports = editProductItem;

/* --------------- OR ---------------- */

// async function editProductItem({id, name, description, sku, price, createdAt}) {
//     try {
//         const {rows:[product]} = await client.query(`
//             UPDATE product
//             SET name = $2, description = $3, sku = $4, price = $5, "createdAt" = $6
//             WHERE id = $1
//             RETURNING *;
//         `, [id, name, description, sku, price, createdAt]);

//         return product;
        
//     } catch (error) {
//         console.error("Error editing product item.");
//         throw error;
//     };
// };

// module.exports = editProductItem;


/* Would Like To Review This Function With You Guys!
    - Rader
*/