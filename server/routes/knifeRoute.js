const express = require('express');
const knifeRouter = express.Router();
const knifeController = require('../controllers/knifeController.js');


knifeRouter.get('/', knifeController.getAllKnives, (req, res) => {
    return res.status(200).json(res.locals.knives);
  });
  
knifeRouter.post('/addKnife', knifeController.createKnife, (req, res) => {
  return res.status(200).json(res.locals.addedKnife);
});

knifeRouter.delete('/:id', knifeController.deleteKnife, (req, res) => {
  return res.status(200).json(res.locals.deletedKnife);
});

knifeRouter.put('/:id', knifeController.updateKnife, (req, res) => {
  return res.status(200).json(res.locals.updatedKnife);
});


module.exports = knifeRouter;