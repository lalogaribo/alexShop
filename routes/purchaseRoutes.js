const express = require('express');
const purchaseController = require('./../controllers/purchaseController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect);
router.get(
  '/checkout-session/:productID',
  purchaseController.getCheckoutSession
);

module.exports = router;
