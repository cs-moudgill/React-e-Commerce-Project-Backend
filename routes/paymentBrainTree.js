var express = require("express");
var router = express.Router();
const { isLoggedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentBrainTree");


router.get('/payment/gettoken/:userId',isLoggedIn,isAuthenticated,getToken)
router.post('/payment/braintree/:userId',isLoggedIn,isAuthenticated,processPayment)


module.exports = router;