var express = require("express");
var router = express.Router();
const { getUserById } = require("../controllers/user");
const { getProductById} = require("../controllers/product");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");


//params
router.param("userId", getUserById);
router.param("productId", getProductById);



module.exports = router;