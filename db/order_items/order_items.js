const client = require('../client');

async function addItemToOrder({order_id, product_id, quantity}) {
    try {
        const {rows: [orderItem]} = await client.query(`
            INSERT INTO order_items(order_id, product_id, quantity)
            VALUES($1, $2, $3)
            RETRUNING *;
        `, [order_id, product_id, quantity]);
        return orderItem;
    } catch (error) {
        throw error;
    }
}

async function getItemsByOrderId(order_id) {
    try {
        const {rows: [order]} = await client.query(`
            SELECT * 
            FROM order_items
            WHERE order_id = ${order_id}
            RETURNING *; 
        `);
        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addItemToOrder,
    getItemsByOrderId
}