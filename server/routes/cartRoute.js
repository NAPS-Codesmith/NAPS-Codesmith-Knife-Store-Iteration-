const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController.js');
const authController = require('../controllers/authController.js');

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

cartRouter.get(
  '/myCart',
  authController.getSessionId,
  cartController.getCart,
  (req, res) => {
    // return an array of objects (cart items)
    return res.status(200).json(res.locals.cartItems);
  }
);

module.exports = cartRouter;
