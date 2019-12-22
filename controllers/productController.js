const Product = require('../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const factoryController = require('./factoryController');

exports.createProduct = factoryController.createOne(Product);
exports.updateProduct = factoryController.updateOne(Product);
exports.deletOne = factoryController.deleteOne(Product);
exports.getOneProduct = factoryController.getOne(Product);

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    data: {
      products
    }
  });
});
