const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/CartController.js');

cartRouter.post('/addToCart', cartController.addToCart, (req, res) => {
    console.log('res.locals.added: ', res.locals.addedItem) 
    return res.status(200).json(res.locals.addedItem)
  });

module.exports = cartRouter;