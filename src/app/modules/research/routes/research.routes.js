const { Router } = require('express');
const { authorize } = require('../../../middlewares/authorizeUser');
const validateRequest = require('../../../middlewares/vallidate');
const createResearchController = require('../controller/createResearch.controller');
const router = Router();

router.post(
  '/',
  authorize(['user', 'org']),
  createResearchController.createAResearch
);

module.exports = router;
