// const client = require("../client");

// async function createProductCategory({id, name, description, createdAt}) {
//     try {
//         const {rows:[productCategory]} = await client.query(`
//             INSERT INTO productCategories (
//                 id,
//                 name, 
//                 description,
//                 "createdAt"
//             )
//             VALUES($1, $2, $3, $4)
//             RETURNING *;
//         `, [id, name, description, createdAt]);

//         return productCategory;
//     } catch (error) {
//         console.error("Error creating a product category.");
//         throw error;
//     };
// };

// module.exports = createProductCategory;