var express = require("express");
var router = express.Router();
const { getUserById } = require("../controllers/user");
const { getProductById, createProduct,getProduct,mediaHandling } = require("../controllers/product");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);
router.post("/product/create/:userId",isLoggedIn,isAuthenticated,isAdmin,createProduct);
router.get('/product/:productId',getProduct);
router.get('/product/photo/:productId',mediaHandling);


module.exports = router;