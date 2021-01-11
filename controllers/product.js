const Product = require("../models/product");
const formidable = require("formidable");
var _ = require("lodash");
var fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  var form = formidable.IncomingForm();
  form.keepExtensions = true; //if we want to keep the extension of image/object.
  form.parse(req, (err, fields, file) => {
    //field=info related to image/object; file=image/object itself.
    if (err) {
      return res.json({
        error: "Problem with Image",
      });
    }
    //Destructing of fields
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "All fields must be completed",
      });
    }
    var product = new Product(fields); //info related to image will be stores according to the product Schema.
    //file handling photo/object
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.json({
          error: "File is too big to upload",
        });
      }
      // here fs will ask the formidable to provide the path of the file uploaded by the user.
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //Save to DB
    product.save((err, product) => {
      if (err) {
        return res.json({
          error: "Saving item in DB failed",
        });
      }
      res.json(product);
    });
  });
};
