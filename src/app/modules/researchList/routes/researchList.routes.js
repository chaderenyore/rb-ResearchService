const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// vallidators
const CreateList = require('../../../vallidators/researchList/createList.validator');
const AddResearchToList = require("../../../vallidators/researchList/addResearchToList.validator");
const DeleteList = require("../../../vallidators/researchList/deleteResearchList.validator");
const GetAllResearchInList = require("../../../vallidators/researchList/getListChildren.validator");


// controllers
const CreateListController = require('../controllers/createList');
const AddResearchToListController = require('../controllers/addReserachToList');
const DeleteListController = require('../controllers/deleteList');
const GetALllResearchInListController = require('../controllers/getAllListChildren');


const router = Router();

router.post(
  '/',
  authorize(['user','org']),
  validateRequest(CreateList.createResearchListSchema, 'body'),
  CreateListController.createResearchList
);

router.post(
  '/add-research',
  authorize(['user','org']),
  validateRequest(AddResearchToList.addResearchToListSchema, "body"),
  AddResearchToListController.addResearchToList
);
router.get(
  '/',
  authorize(['user','org']),
  validateRequest(GetAllResearchInList.getAllListChildrenQuerySchema, "query"),
  GetALllResearchInListController.fetchAllResearchInList
);

router.delete(
    '/',
    authorize(['user','org']),
    validateRequest(DeleteList.deleteResearchListQuerySchema, "query"),
    DeleteListController.deleteResearchList
  );




module.exports = router;
