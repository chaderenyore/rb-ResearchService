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

router.get(
  "/user/all-research",
  authorizeAdmin(["super", "admin", "moderator", "account-view", "account-edit"]),
  validateRequest(FetchSingleUserResearch.getSingleUserResearchSchema, "query"),
  SingleUsersResearchController.adminFetchSingleUserResearch
);

module.exports = router;
