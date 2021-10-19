const {client} = require('./client.js');

module.exports = {
    ...require("./product/product.js"),
    ...require("./cart"),
    ...require("./cart_items"),
    ...require("./order"),
    ...require("./user")
};