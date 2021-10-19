const {client} = require('./client.js');

module.exports = {
    ...require("./product/product.js"),
    ...require("./cart/createCart.js"),
    ...require("./cart_items/cart_item.js"),
    ...require("./order"),
    ...require("./user")
};