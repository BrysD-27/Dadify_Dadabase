const {Router} = require("express");
const apiGetAllProducts = require("./getAllProducts");
const apiCreatingProduct = require("./createProduct");
const apiPatchProduct = require("./patchProduct");
const apiDeleteProduct = require("./deleteProduct");

const productsRouter = Router();
productsRouter.get("/", apiGetAllProducts);
productsRouter.post("/", apiCreatingProduct);
productsRouter.patch("/:routineId", apiPatchProduct);
productsRouter.delete("/:routineId", apiDeleteProduct);

module.exports = productsRouter;