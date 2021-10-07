const createProductItem = require("./productItems/createProductItem.js");
const deleteProductItem = require("./productItems/deleteProductItem.js");
const editProductItem = require("./productItems/editProductItem.js");
const getAllProductItems = require("./productItems/getAllProductItems.js");
const getProductItemById = require("./productItems/getProductItemById.js");

module.exports = {
    createProductItem,
    deleteProductItem,
    editProductItem,
    getAllProductItems,
    getProductItemById,
}