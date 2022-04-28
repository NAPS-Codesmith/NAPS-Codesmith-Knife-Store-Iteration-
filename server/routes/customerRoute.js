const express = require('express');
const customerRouter = express.Router();
const customerController = require('../controllers/customerController.js');
const authController = require('../controllers/authController.js');


customerRouter.get('/:username', customerController.getCustomer, (req, res) => {
  return res.status(200).json(res.locals.customer);
});
//
customerRouter.post('/addCustomer', customerController.createCustomer, customerController.login, (req, res) => {
  return res.status(200).json(res.locals.authentication);
});
//
customerRouter.post('/login', customerController.login, authController.createSessionId, (req, res) => {
  return res.status(200).json(res.locals.authentication);
});

customerRouter.delete('/:id', customerController.deleteCustomer, (req, res) => {
  return res.status(200).json(res.locals.deletedCustomer);
});

customerRouter.put('/:id', customerController.updateCustomer, (req, res) => {
  return res.status(200).json(res.locals.updatedCustomer);
});

module.exports = customerRouter;