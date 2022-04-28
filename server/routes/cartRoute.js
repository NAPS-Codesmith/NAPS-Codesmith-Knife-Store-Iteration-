const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController.js');
const authController = require('../controllers/authController.js');

cartRouter.post(
  '/:knife_id/addOne',
  authController.getSessionId,
  cartController.addOneToCart,
  cartController.getCart,
  (req, res) => {
    return res.status(200).json({
      addedItem: res.locals.addedItem,
      updatedCart: res.locals.cartItems,
    });
  }
);

// remove product (one) from cart
cartRouter.post(
  '/:knife_id/removeOne',
  authController.getSessionId,
  cartController.removeOneFromCart,
  cartController.getCart,
  (req, res) => {
    return res.status(200).json({
      removedItem: res.locals.removedItem,
      updatedCart: res.locals.cartItems,
    });
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
