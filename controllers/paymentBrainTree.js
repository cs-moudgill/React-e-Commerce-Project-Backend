const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  var nonceFromTheClient = req.body.paymentMethodNonce;
  var amountFromClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromClient,
      paymentMethodNonce: nonceFromTheClient,
      deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
};
