const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// validators
const LikeAResearchSchema = require("../../../vallidators/likes/Research/likeAResearch.validator");
const UnlikeAResearchSchema = require("../../../vallidators/likes/Research/unlikeAResearch.validator");
const GetAResearchLikes = require("../../../vallidators/likes/Research/getAllResearchLikes.validator");
const LikeAComment = require("../../../vallidators/likes/comments/likeComent.validator");
const UnlikeAComment = require("../../../vallidators/likes/comments/unlikeCommnent.validator");
const GetACommentsLikes = require("../../../vallidators/likes/comments/getAllCommentLikes.validator");

// controllers
const LikeAResearchController = require("../controllers/research/like.controller");
const UnlikeAResearchController = require("../controllers/research/unlike.controller");
const GetAllResearchLikesController = require("../controllers/research/getAllLikes.controller");
const LikeACommentController = require("../controllers/comments/like.controller");
const GetAllCOmmentLikesController = require("../controllers/comments/getAllLikes.controller");
const UnlikeACommentController = require("../controllers/comments/unlike.controller");

const router = Router();

router.post(
  "/research",
  authorize(['user','org']),
  validateRequest(LikeAResearchSchema.likeAResearchQuerySchema, "query"),
  LikeAResearchController.likeARsearch
);

router.post(
  "/unlike-research",
  authorize(['user','org']),
  validateRequest(UnlikeAResearchSchema.UnlikeAResearchQuerySchema, "query"),
  UnlikeAResearchController.unLikeAResearch
);

router.get(
    "/research-likes",
    authorize(['user','org']),
    validateRequest( GetAResearchLikes.getAllResearchLikesQuerySchema, "query"),
    GetAllResearchLikesController.getAResearchLikes
  );

router.post(
  "/comment",
  authorize(['user','org']),
  validateRequest(LikeAComment.likeACommentQuerySchema, "query"),
  LikeACommentController.likeAComment
);

router.post(
  "/unlike-comment",
  authorize(['user','org']),
  validateRequest(UnlikeAComment.UnlikeACommentQuerySchema, "query"),
  UnlikeACommentController.unLikeAComment
);

router.get(
    "/comment-likes",
    authorize(['user','org']),
    validateRequest( GetACommentsLikes.getCommentsLikesQuerySchema, "query"),
    GetAllCOmmentLikesController.getACommentLikes
  );


module.exports = router;
