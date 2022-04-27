const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController.js');
const authController = require('../controllers/authController.js');

// cartRouter.post('/addToCart', cartController.addToCart, (req, res) => {
//     console.log('res.locals.added: ', res.locals.addedItem)
//     return res.status(200).json(res.locals.addedItem)
//   });

// add product (one) to cart
cartRouter.post(
  '/:productId/addOne',
  authController.getSessionId,
  cartController.addOneToCart,
  (req, res) => {
    return res.status(200).json(res.locals.addedItem);
  }
);

// remove product (one) from cart
cartRouter.post(
  '/:productId/removeOne',
  authController.getSessionId,
  cartController.removeOneFromCart,
  (req, res) => {
    return res.status(200).json(res.locals.addedItem);
  }
);

module.exports = cartRouter;
