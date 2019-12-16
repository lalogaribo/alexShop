const express = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restricTo('admin'),
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(
    authController.protect,
    authController.restricTo('admin'),
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restricTo('admin'),
    productController.deletOne
  );

module.exports = router;
