const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");


// vallidators
const CheckACcountAgeSchema = require('../../../vallidators/premcheck/getAccountAge.validator');
const CheckPremResultsSchema = require('../../../vallidators/premcheck/premCheck.vallidator');
const GetAllPremCheckDrafts = require("../../../vallidators/premcheck/getDraftsPremCheck.validator");
const SavePremCheckDarfts = require("../../../vallidators/premcheck/saveDraft.vallidator");
const GetResearchPremCheck = require("../../../vallidators/premcheck/getSingleResearchpremCheck.validator");



// controllers
const CheckAccountAgeController = require('../controllers/checkAge.controller');
const CheckPremResultsController = require('../controllers/checkPremResults.controller');
const SavePremCheckDraftsController = require('../controllers/saveDraft.controller');
const GetAllPremChecksDraftController = require('../controllers/getAllDraftPremCheck.controller');
const GetResearchPremCheckController = require('../controllers/getResearchPremCheck.controller');


const router = Router();

router.post(
  '/account-age',
  authorize(['user','org']),
  validateRequest(CheckACcountAgeSchema.getAccountSchema, 'query'),
  CheckAccountAgeController.checkAccountAge
);

router.post(
  '/',
  authorize(['user','org']),
  validateRequest(CheckPremResultsSchema.premCheckSchema, "body"),
  CheckPremResultsController.premCheck
);

router.post(
  '/save-draft',
  authorize(['user','org']),
  validateRequest(SavePremCheckDarfts.saveDraftPremCheckSchema, "body"),
  SavePremCheckDraftsController.saveDraftPremCheck
);

router.get(
  '/drafts',
  authorize(['user','org']),
  validateRequest(GetAllPremCheckDrafts.getAllDraftsPremCheckSchema, "query"),
  GetAllPremChecksDraftController.getDraftPremCheck
);

router.get(
  '/research/:research_id',
  authorize(['user','org']),
  validateRequest(GetResearchPremCheck.getSingleResearchPremCheckSchema, "params"),
  GetResearchPremCheckController.getSingleResearchPremCheck
);


module.exports = router;
