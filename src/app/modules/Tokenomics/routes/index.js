const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");


// vallidators
const ComputeTokenomicsSchema = require('../../../vallidators/tokenomics/computeTokenomics.validator');
const ComputeTokenomicsAllocationSchema = require('../../../vallidators/tokenomics/calculateTokenomicsALlocation.validators');
const SaveTokenomcisDraft = require("../../../vallidators/tokenomics/saveDraftTokenomics.validator");
const GetAllDraftsDarfts = require("../../../vallidators/tokenomics/getAllTokenomicsDraft.validator");
const GetResearchTokenomics = require("../../../vallidators/tokenomics/getResearchTokenomics.validator");


// controllers
const ComputeTokenomicsController = require('../controllers/computeTokenomics.controller');
const ComputeAllocationController = require('../controllers/calculateTokenomicsAllocation.controller');
const SaveDraftsController = require('../controllers/saveDraftTokenomics.controller');
const GetAllTokenomicsDraftController = require('../controllers/getAllDraftTokenmics.controller');
const GetSingleResearchTokenomicsController = require('../controllers/getResearchTokenomics.controller');



const router = Router();

router.post(
  '/compute',
  authorize(['user','org']),
  validateRequest(ComputeTokenomicsSchema.computeTokenomicsSchema, 'body'),
  ComputeTokenomicsController.computeTokenomics
);

router.post(
  '/allocation',
  authorize(['user','org']),
  validateRequest(ComputeTokenomicsAllocationSchema.calculateTokenomicsAllocationSchema, 'body'),
  ComputeAllocationController.computeTokenomicsAllocationPercentages
);

router.post(
  '/save-drafts',
  authorize(['user','org']),
  validateRequest(SaveTokenomcisDraft.saveDraftTokenomicsSchema, "body"),
  SaveDraftsController.saveDraftTokenomics
);


router.get(
  '/drafts-all',
  authorize(['user','org']),
  validateRequest(GetAllDraftsDarfts.getAllTokenomicsDraftsSchema, "query"),
  GetAllTokenomicsDraftController.getTokenomicsDraftCheck
);

router.get(
  '/research/:research_id',
  authorize(['user','org']),
  validateRequest(GetResearchTokenomics.getSingleResearchTokenomicsSchema, "params"),
  GetSingleResearchTokenomicsController.getSingleResearchTokenomics
);


module.exports = router;
