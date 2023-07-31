const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");


// vallidators
const FetchAllCommunityResearchSchema = require("../../../vallidators/community/allCommunityResearch.vallidator");
const GetAllSponsoredSchema = require("../../../vallidators/community/allSponsoredResearch.vallidator");
const GetCommunityResearchDetailsSchema = require("../../../vallidators/community/getResearchDetails.validator");
const GetMySavedResearchSchema = require("../../../vallidators/community/getMysavedResearch.validator");
const SaveResearchSchema = require("../../../vallidators/community/saveResearch.validator");
const ShareResearchSchema = require("../../../vallidators/community/shareResearch.validator");
const ViewUsersPublicResearchSchema = require("../../../vallidators/community/publicResearch.validator");
const ResearchGlobalSearchSchema = require("../../../vallidators/community/globalSearch.validator");
const PopularResearchSchema = require("../../../vallidators/community/popularResearch.validator");
const SearchCommunitByCoinNameSchema = require("../../../vallidators/community/searchByCoinName.validator");



// controllers
const FetchAllCommunityResearchController = require('../controllers/fetchAllCommunityResearch.controller');
const GetAllSponsoredController = require('../controllers/getAllSponsoredRsearch.controller');
const GetCommunityResearchDetailsController = require('../controllers/getCommunityResearchDetails.controller');
const GetMySavedResearchController = require('../controllers/getMySavedResearch.controller');
const SaveResearchController = require('../controllers/saveResearch.controller');
const ShareResearchController = require('../controllers/shareResearch.controller');
const ViewUsersPublicResearchController = require('../controllers/viewUserPublicResearch');
const ResearchGlobalSearchController = require('../controllers/globalSearchCommunityResearch.controller');
const PopularResearchController = require('../controllers/fetchPopularResearch');
const SearchCommunitByCoinNameController = require('../controllers/searchResearchByCoinName.controller');



const router = Router();

router.get(
  '/',
  validateRequest(FetchAllCommunityResearchSchema.getAllCommunityQuerySchema, 'query'),
  FetchAllCommunityResearchController.fetchAllCommunityResearch
);

router.get(
  '/sponsored',
  authorize(['user','org']),
  validateRequest(GetAllSponsoredSchema.getAllSpomnsoredCommunityQuerySchema, 'query'),
  GetAllSponsoredController.fetchAllSponsoredResearch
);

router.get(
  '/full-report',
  validateRequest(GetCommunityResearchDetailsSchema.getCommunityResearchDetailsQuerySchema, "query"),
  GetCommunityResearchDetailsController.getResearchDetails
);

router.get(
  '/save-research',
  authorize(['user','org']),
  validateRequest(GetMySavedResearchSchema.getMySavedResearchQuerySchema, "query"),
  GetMySavedResearchController.fetchMySavedResearch
);

router.post(
  '/save',
  authorize(['user','org']),
  validateRequest(SaveResearchSchema.saveResearchQuerySchema, "query"),
  SaveResearchController.saveResearch
);

router.post(
  '/share',
  authorize(['user','org']),
  validateRequest(ShareResearchSchema.shareResearchQuerySchema, "query"),
  ShareResearchController.shareResearch
);

router.get(
  '/user/public',
  validateRequest(ViewUsersPublicResearchSchema.viewUsersPublicResearchQuerySchema, "query"),
  ViewUsersPublicResearchController.fetchAllCommunityResearch
);

router.get(
  '/communityglobalsearch',
  validateRequest(ResearchGlobalSearchSchema.globalQuerySchema, 'query'),
  ResearchGlobalSearchController.searchResearchGlobally
);

router.get(
  '/popular-research',
  validateRequest(PopularResearchSchema.popularResearchQuerySchema, 'query'),
  PopularResearchController.fetchAllPopularResearch
);

router.get(
  '/filterbycoin',
  validateRequest(SearchCommunitByCoinNameSchema.searchByCoinNameQuerySchema, 'query'),
  SearchCommunitByCoinNameController.searchReserachByCoinName
);

module.exports = router;
