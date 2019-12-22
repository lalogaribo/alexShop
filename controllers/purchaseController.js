const stripe = require('stripe');
const Product = require('../models/productModel');
const Purchase = require('../models/purchaseModel');
const catchAsync = require('./../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get current product
  const product = await Product.findById(req.params.productID);
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?product=${
      req.params.productID
    }&user=${req.user.id}&price=${product.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.productID,
    line_items: [
      {
        name: `${product.name} product`,
        description: product.description,
        amount: product.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });
  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});
