const {client} = require('./client.js');

module.exports = {
    ...require("./product/product.js"),
    ...require("./cart/cart.js"),
};