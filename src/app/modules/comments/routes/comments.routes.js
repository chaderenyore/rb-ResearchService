const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// vallidators
const CreateComment = require('../../../vallidators/comments/addComment.validator');
const EditComment = require("../../../vallidators/comments/editComment.validator");
const DeleteComment = require("../../../vallidators/comments/deleteComment.validator");
const ReplyComment = require("../../../vallidators/comments/reply.validator");
const AllResearchComments = require("../../../vallidators/comments/getAllResearchComments.validator");
const AllCommentReplies = require("../../../vallidators/comments/getAllReplies.validator");

// controllers
const AddCommentController = require('../controllers/addComment.controller');
const EditCommentController = require('../controllers/editCommnet.controller');
const DeleteCommentController = require('../controllers/deleteComment.controller');
const ReplyCommentController = require('../controllers/replyAComment.controllers');
const AllCommentRepliesController = require('../controllers/getAllCommentsReplies.controller');
const AllResearchCommentsController = require('../controllers/getAResearchComents.controller');

const router = Router();

router.post(
  '/add-comment',
  authorize(['user','org']),
  validateRequest(CreateComment.addCommentSchema, 'body'),
  AddCommentController.createComment
);

router.post(
  '/edit',
  authorize(['user','org']),
  validateRequest(EditComment.editCommentSchema, "body"),
  EditCommentController.editComment
);
router.delete(
  '/',
  authorize(['user','org']),
  validateRequest(DeleteComment.deleteCommentSchema, "query"),
  DeleteCommentController.deleteComment
);

router.post(
  '/reply',
  authorize(['user','org']),
  validateRequest(ReplyComment.replyCommentSchema, "body"),
  ReplyCommentController.replyAComment
);

router.get(
  '/reply/all',
  authorize(['user','org']),
  validateRequest(AllCommentReplies.getAllRepliesQuerySchema, "query"),
  AllCommentRepliesController.getAllCommentReplies
);

router.get(
  '/research-comments/all',
  authorize(['user','org']),
  validateRequest(AllResearchComments.getAllResearchCommentQuerySchema, "query"),
  AllResearchCommentsController.getAllResearchComments
);


module.exports = router;
