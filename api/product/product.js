const {Router} = require("express");
const apiGetAllProducts = require("./getAllProducts");
const apiGetAllProductsByUser = require("./getAllProductsByUser");
const apiCreatingProduct = require("./createProduct");
const apiPatchProduct = require("./patchProduct");
const apiDeleteProduct = require("./deleteProduct");

const productsRouter = Router();
productsRouter.get("/", apiGetAllProducts);
productsRouter.get("/:products/username", apiGetAllProductsByUser);
productsRouter.post("/", apiCreatingProduct);
productsRouter.patch("/:productId", apiPatchProduct);
productsRouter.delete("/:productId", apiDeleteProduct);

module.exports = productsRouter;