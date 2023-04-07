const { Router } = require('express');
const { authorize } = require('../../../middlewares/authorizeUser');
const { authorizeAdmin } = require('../../../middlewares/authorizeAdmin');
const validateRequest = require('../../../middlewares/vallidate');

// vallidators
const TagsSchema = require('../../../vallidators/adminControl/tags.validator');

// controllers
const AddTagController = require('../controller/tags/addTag');
const GetTagController = require('../controller/tags/getAllTags');

const router = Router();

router.post(
  '/tags',
  authorizeAdmin(['admin']),
  validateRequest(TagsSchema.addTagsSchema, 'body'),
  AddTagController.addTag
);

router.get(
  '/tags',
  authorizeAdmin(['admin']),
  validateRequest(TagsSchema.getTagSchema, 'body'),
  GetTagController.getAllTags
);

router.get(
  '/user/tags',
  authorize(['user', 'org']),
  validateRequest(TagsSchema.getTagSchema, 'body'),
  GetTagController.getAllTags
);


module.exports = router;
