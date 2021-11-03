/* ----- PRODUCT ITEMS ----- */
const createProductItem = require("./productItems/createProductItem.js");
const deleteProductItem = require("./productItems/deleteProductItem.js");
const updateProductItem = require("./productItems/updateProductItem.js");
const getAllProductItems = require("./productItems/getAllProductItems.js");
const getProductItemById = require("./productItems/getProductItemById.js");

/* ----- USER PRODUCTS ----- */
const getAllUserProductItems = require("./productItems/getAllUserProductItems.js");

/* ----- PRODUCT INVENTORY ----- */
const createProductInventory = require("./productInventory/createProductInventory.js");
const deleteProductInventory = require("./productInventory/deleteProductInventory.js");
const updateProductInventory = require("./productInventory/updateProductInventory.js");


module.exports = {
    createProductItem,
    deleteProductItem,
    updateProductItem,
    getAllProductItems,
    getProductItemById,
    createProductInventory,
    updateProductInventory,
    deleteProductInventory,
    getAllUserProductItems,
}