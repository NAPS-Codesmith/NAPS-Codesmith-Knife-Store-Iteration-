const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/CartController.js');

// cartRouter.post('/addToCart', cartController.addToCart, (req, res) => {
//     console.log('res.locals.added: ', res.locals.addedItem)
//     return res.status(200).json(res.locals.addedItem)
//   });

// add product (one) to cart
cartRouter.post(
  '/:productId/addOne',
  cartController.addOneToCart,
  (req, res) => {
    return res.status(200).json(res.locals.addedItem);
  }
);

// remove product (one) from cart
cartRouter.post(
  '/:productId/removeOne',
  cartController.removeOneFromCart,
  (req, res) => {
    return res.status(200).json(res.locals.addedItem);
  }
);

module.exports = cartRouter;
