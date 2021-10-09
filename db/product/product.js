/* ----- PRODUCT CATEGORIES ----- */
// const createProductCategory = require("./productCategories/createProductCategory.js");

/* ----- PRODUCT ITEMS ----- */
const createProductItem = require("./productItems/createProductItem.js");
const deleteProductItem = require("./productItems/deleteProductItem.js");
const editProductItem = require("./productItems/editProductItem.js");
const getAllProductItems = require("./productItems/getAllProductItems.js");
const getProductItemById = require("./productItems/getProductItemById.js");

/* ----- PRODUCT INVENTORY ----- */
const createProductInventory = require("./productInventory/createProductInventory.js");
const deleteProductInventory = require("./productInventory/deleteProductInventory.js");
const editProductInventory = require("./productInventory/editProductInventory.js");


module.exports = {
    createProductItem,
    deleteProductItem,
    editProductItem,
    getAllProductItems,
    getProductItemById,
    createProductInventory,
    editProductInventory,
    deleteProductInventory,
}