const client = require('../client');

async function addOrder({user_id, total, status}) {
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(user_id, total, status)
            VALUES($1, $2, $3)
            RETURNING *;
        `,[user_id, total, status]);
        return order;
    } catch (error) {
        throw error;        
    }
}

async function getAllOrders(user_id) {
    try {
        const {rows: [orders]} = await client.query(`
            SELECT *
            FROM orders
            WHERE user_id = ${user_id}
            RETURNING *;
        `);

        const orderWithItems = await Promise.all(orders.map(async function (order) {
            const {rows: [items]} = await client.query(`
                SELECT * FROM product
                JOIN order_items ON product_id = product.id
                WHERE order_id = ${order.id}
            `)
            order.items = items;
            return order;
        }));
        return orderWithItems;
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
    deleteOrder,
    getAllOrders
}