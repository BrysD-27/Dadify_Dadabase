const client = require('../client');

async function addOrder({user_id, product_id}) {
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(user_id, product_id)
            VALUES($1, $2)
            RETURNING *;
        `,[user_id, product_id]);
        return order;
    } catch (error) {
        throw error;        
    }
}

async function deleteOrder(id) {
    try {
        const {rows: [order]} = await client.query(`
            DELETE FROM orders
            WHERE id=${id}
            RETURNING *;
        `);
        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addOrder,
    deleteOrder
}