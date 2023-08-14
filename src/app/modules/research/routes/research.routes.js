const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");


// vallidators
const LaunchReserachSchema = require('../../../vallidators/research/launchResearch.validator');
const ChangeResearchVisibilitySchema = require('../../../vallidators/research/changeVisibility.validator');
const SaveAdoptionAndRecognitionInfoSchema = require("../../../vallidators/research/saveAdoption.validator");
const SaveCoinComparisonInfoSchema = require("../../../vallidators/research/saveComparison.validator");
const SaveCommunityAndTeamSPritInfoSchema = require("../../../vallidators/research/saveTeamCommunitySpirit.validator");
const GetAllLeadersResearchInfoSchema = require("../../../vallidators/research/getAllLeadersResearch.validator");
const GetAllUserResearchSchema = require("../../../vallidators/research/getAllUsersResearch.validator");
const GetAllCoinComparisonDraftsSchema = require("../../../vallidators/research/allComparisonDraft.validator");
const GetAllAdoptionAndRecognitionDraftsSchema = require("../../../vallidators/research/getDraft.validator");
const UpdateResearchInfoSchema = require("../../../vallidators/research/updaTeResearchInfo.validator");
const GetAllSuggestedSchema = require("../../../vallidators/research/getSuggestedResearch.validator");
const DeleteResearchSchema = require("../../../vallidators/research/deleteResearch.validator");
const ResearchByIdSchema = require("../../../vallidators/research/getSingleResearch.validator");
const ComputeFinalSchema = require("../../../vallidators/research/computeFinalVerdit.controller");
const UsersLastResearchSchema = require("../../../vallidators/research/fetchUsersLastResearch.validator");






// controllers
const LaunchReserachController = require('../controllers/launchResearch.controller');
const ChangeResearchVisibilityController = require('../controllers/changeResearchVisibility.controller');
const SaveAdoptionAndRecognitionInfoController = require('../controllers/saveAdoptionRecongintion.controller');
const SaveCoinComparisonInfoController = require('../controllers/saveCoinComparison.controller');
const SaveCommunityAndTeamSPritInfoController = require('../controllers/saveCommunityDetails.controller');
const GetAllLeadersResearchInfoController = require('../controllers/getLeadersResearches.controller');
const GetAllUserResearchController = require('../controllers/getAllUsersResearch.controller');
const GetAllCoinComparisonDraftsController = require('../controllers/getAllCoinComparisonDraft.controller');
const GetAllAdoptionAndRecognitionDraftsController = require('../controllers/getAdoptionAndRecongintionDraft.controller');
const UpdateResearchInfoController = require('../controllers/updateResearchInfo.controller');
const FetchSuggetedResearchController = require('../controllers/getSugestedResearch.controller');
const DeleteResearchController = require('../controllers/deleteResearch.controller');
const ResearchByIdController = require('../controllers/getSingleResearchByid.controller');
const ComputeFinalController = require('../controllers/computeFinalVerdit.controller');
const FetchUserLastController = require('../controllers/fetchLastResearch');





const router = Router();

router.post(
  '/launch',
  authorize(['user','org']),
  validateRequest(LaunchReserachSchema.launchResearchQuerySchema, 'query'),
  LaunchReserachController.launchResearch
);

router.post(
  '/change-visibility',
  authorize(['user','org']),
  validateRequest(ChangeResearchVisibilitySchema.changeResearchVisibilitySchema, 'query'),
  ChangeResearchVisibilityController.changeVisibility
);

router.post(
  '/adoption-recognition',
  authorize(['user','org']),
  validateRequest(SaveAdoptionAndRecognitionInfoSchema.saveAdoptionAndRecognitionSchema, "body"),
  validateRequest(SaveAdoptionAndRecognitionInfoSchema.saveAdoptionAndRecQuerySchema, "query"),
  SaveAdoptionAndRecognitionInfoController.saveAdoptionAndRecognitionInfo
);

router.post(
  '/coin-comparison',
  authorize(['user','org']),
  validateRequest(SaveCoinComparisonInfoSchema.saveComparisonSchema, "body"),
  validateRequest(SaveCoinComparisonInfoSchema.saveComparisonQuerySchema, "query"),
  SaveCoinComparisonInfoController.saveResearchComparisonInfo
);

router.post(
  '/communityTeam-info',
  authorize(['user','org']),
  validateRequest( SaveCommunityAndTeamSPritInfoSchema.saveCommunityAndTeamInfoSchema, "body"),
  validateRequest( SaveCommunityAndTeamSPritInfoSchema.saveTeamAndCommunitySpiritQuerySchema, "query"),
  SaveCommunityAndTeamSPritInfoController.saveCommunitySpiritInfo
);

router.get(
  '/leaders',
  authorize(['user','org']),
  validateRequest(GetAllLeadersResearchInfoSchema.getAllLeadersResearchSchema, "query"),
  GetAllLeadersResearchInfoController.getLeadersResearch
);

router.get(
  '/user-research',
  authorize(['user','org']),
  validateRequest(GetAllUserResearchSchema.getAllUsersResearchSchema, "query"),
  GetAllUserResearchController.getUsersResearch
);

router.get(
  '/last-research',
  validateRequest(UsersLastResearchSchema.UserLastResearchQuerySchema, "query"),
  FetchUserLastController.fetchLastResearch
);

router.get(
  '/coin-comparison/draft',
  authorize(['user','org']),
  validateRequest(GetAllCoinComparisonDraftsSchema.getAllComparisonQuerySchema, "query"),
  GetAllCoinComparisonDraftsController.getComparisonDraft
);

router.get(
  '/draft/adoption-recognition',
  authorize(['user','org']),
  validateRequest(GetAllAdoptionAndRecognitionDraftsSchema.getDraftsQuerySchema, "query"),
  GetAllAdoptionAndRecognitionDraftsController.getAdoptionAndRecognitionDraft
);

router.put(
  '/update-research/:research_id',
  authorize(['user','org']),
  validateRequest(UpdateResearchInfoSchema.updateResearchInfoSchema, "body"),
  validateRequest(UpdateResearchInfoSchema.updateResearchInfoParamsSchema, "params"),
  UpdateResearchInfoController.updateResearchInfo
);

router.get(
  '/suggested/all',
  authorize(['user','org']),
  validateRequest(GetAllSuggestedSchema.getSugestedResearchSchema, "query"),
  FetchSuggetedResearchController.getSuggestedResearch
);

router.delete(
  '/:research_id',
  authorize(['user','org']),
  validateRequest(DeleteResearchSchema.deleteResearchSchema, "params"),
  DeleteResearchController.deleteResearch
);

router.get(
  '/research/:research_id',
  authorize(['user','org']),
  validateRequest(ResearchByIdSchema.singleResearchParamsSchema, "params"),
  ResearchByIdController.getSingleResearchById
);

router.post(
  '/final-verdit/:research_id',
  authorize(['user','org']),
  validateRequest(ComputeFinalSchema.computeFinalVerditSchema, "params"),
  ComputeFinalController.computeFinalVerdit
);


module.exports = router;
