const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const { authorizeAdmin } = require("../../../middlewares/authorizeAdmin");
const validateRequest = require("../../../middlewares/vallidate");

// tags vallidators
const TagsSchema = require("../../../vallidators/adminControl/tags.validator");

// tag controllers
const AddTagController = require("../controller/tags/addTag");
const GetTagController = require("../controller/tags/getAllTags");

// research validators
const FetchAllResearch = require("../../../vallidators/adminControl/research/fetchAllResearch.validator");
const FetchAllCommunityResearch = require("../../../vallidators/adminControl/research/fetchAllCommunityResearch.validator");
const FetchSingleUserResearch = require("../../../vallidators/adminControl/research/fetchSIngleUsersResearch.validator");

// research controllers
const AllResearchController = require("../controller/research/fetchAllResearch");
const AllCommunityResearchController = require("../controller/research/fecthAllCOmmunityResearch");
const SingleUsersResearchController = require("../controller/research/getSingleUsersResearch");

// Research Controls Validators
const PremCheckControlSchema = require("../../../vallidators/adminControl/premCheckControl/addPremCheckControl.validator");
const TokenomicsControlSchema = require("../../../vallidators/adminControl/tokenomicsControl/addTokenomicsControl.validator");
const AllResearchControlSchema = require("../../../vallidators/adminControl/research/fetchAllResearchControls.validator");
const BannedResearchSchema = require("../../../vallidators/adminControl/research/banResearch.validator");
const AllBannedResearchSchema = require("../../../vallidators/adminControl/research/banResearch.validator");
const DeleteResearchSchema = require("../../../vallidators/adminControl/research/deleteResearch.validator");
const DeletePremcheckControlSchema = require("../../../vallidators/adminControl/premCheckControl/deletePremCheckControl");
const DeleteTokenomicsControlSchema = require("../../../vallidators/adminControl/tokenomicsControl/deleteTokenomics");



// research controls controllers
const PremCheckControlController = require("../controller/premCheck/addPremCheckControl");
const TokenomicsControlController = require("../controller/tokenomicsHealth/addTokenomicsControl");
const AllResearchControlsController = require("../controller/research/fetchAllResearchControl");
const BannedResearchControlsController = require("../controller/research/banResearch");
const FetchAllBannedResearchController = require("../controller/research/fetchAllBannedResearch");
const DeleteResearchController = require("../controller/research/deleteResearch");
const DeletePremcheckControlController = require("../controller/premCheck/deletePremCheckControl");
const DeleteTokenomicsControlController = require("../controller/tokenomicsHealth/deleteTokenomicsControl");




const router = Router();

router.post(
  "/tags",
  authorizeAdmin([
    "super",
    "admin",
    "moderator",
    "account-view",
    "account-edit",
  ]),
  validateRequest(TagsSchema.addTagsSchema, "body"),
  AddTagController.addTag
);

router.get(
  "/tags",
  authorizeAdmin([
    "super",
    "admin",
    "moderator",
    "account-view",
    "account-edit",
  ]),
  validateRequest(TagsSchema.getTagSchema, "body"),
  GetTagController.getAllTags
);

router.get(
  "/user/tags",
  authorize(["user", "org"]),
  validateRequest(TagsSchema.getTagSchema, "body"),
  GetTagController.getAllTags
);

// research routes

router.get(
  "/all-research",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(FetchAllResearch.getAllPlatformResearchSchema, "query"),
  AllResearchController.adminFetchAllResearch
);

router.get(
  "/community-research",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(FetchAllCommunityResearch.getAllCommunityResearchSchema, "query"),
  AllCommunityResearchController .adminFetchAllCommunityResearch
);

// research Controls
router.post(
  "/premcheck-control",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(PremCheckControlSchema.addPremCheckControlSchema, "body"),
  PremCheckControlController.addPremCheckControl
);

router.post(
  "/tokenomics-control",
  authorizeAdmin(["super", "admin", "moderator", "account-view", "account-edit"]),
  validateRequest(TokenomicsControlSchema.addTokenomicsControlSchema, "body"),
  TokenomicsControlController.addTokenomicsControl
);

router.get(
  "/all-controls",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(AllResearchControlSchema.getAllResearchControlsSchema, "query"),
  AllResearchControlsController.adminFetchAllResearchControl
);

router.put(
  "/ban-research",
  authorizeAdmin(["super", "admin", "moderator", "account-view", "account-edit"]),
  validateRequest( BannedResearchSchema.banResearchSchema, "query"),
  BannedResearchControlsController.banResearch
);

router.get(
  "/all-bannedresearch",
  authorizeAdmin(["super", "admin", "moderator", "account-view", "account-edit"]),
  validateRequest(AllBannedResearchSchema.banResearchSchema, "query"),
  FetchAllBannedResearchController.adminFetchAllBannedResearch
);

router.delete(
  "/delete-research",
  authorizeAdmin(["super", "admin", "moderator", "account-view", "account-edit"]),
  validateRequest(DeleteResearchSchema.deleteResearchSchema, "body"),
  DeleteResearchController.bulkDeleteResearch
);

router.delete(
  "/tokenomics-control/:id",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(DeletePremcheckControlSchema.deletePremCheckControlParamsSchema, "params"),
  DeletePremcheckControlController.deletePremCheckControl
);

router.delete(
  "/premcheck-control/:id",
  authorizeAdmin(["super", "admin", "moderator", "account-view", "account-edit"]),
  validateRequest(DeleteTokenomicsControlSchema.deleteTokenomicsControlParamsSchema, "params"),
  DeleteTokenomicsControlController.deleteTokenomicsControl
);


module.exports = router;
