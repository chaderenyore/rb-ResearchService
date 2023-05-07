const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// vallidators
const CreateList = require("../../../vallidators/researchList/createList.validator");
const FetchMyList = require("../../../vallidators/researchList/getAllList.valiator");
const AddResearchToList = require("../../../vallidators/researchList/addResearchToList.validator");
const DeleteList = require("../../../vallidators/researchList/deleteResearchList.validator");
const GetAllResearchInList = require("../../../vallidators/researchList/getListChildren.validator");
const DeleteResearchFromList = require("../../../vallidators/researchList/removeResearchFromList.validator");

// controllers
const CreateListController = require("../controllers/createList");
const FetchAllListController = require("../controllers/getAllList");
const AddResearchToListController = require("../controllers/addReserachToList");
const DeleteListController = require("../controllers/deleteList");
const GetALllResearchInListController = require("../controllers/getAllListChildren");
const DeleteResearchFromListController = require("../controllers/removeResearchFromList");

const router = Router();

router.post(
  "/",
  authorize(["user", "org"]),
  validateRequest(CreateList.createResearchListSchema, "body"),
  CreateListController.createResearchList
);

router.get(
  "/all",
  authorize(["user", "org"]),
  validateRequest(FetchMyList.getAllListQuerySchema, "query"),
  FetchAllListController.fetchAllResearchList
);

router.post(
  "/add-research",
  authorize(["user", "org"]),
  validateRequest(AddResearchToList.addResearchToListSchema, "query"),
  AddResearchToListController.addResearchToList
);
router.get(
  "/",
  authorize(["user", "org"]),
  validateRequest(GetAllResearchInList.getAllListChildrenQuerySchema, "query"),
  GetALllResearchInListController.fetchAllResearchInList
);

router.delete(
  "/delete-list",
  authorize(["user", "org"]),
  validateRequest(DeleteList.deleteResearchListQuerySchema, "query"),
  DeleteListController.deleteResearchList
);

router.delete(
  "/delete-research",
  authorize(["user", "org"]),
  validateRequest(DeleteResearchFromList.deleteResearchFromListQuerySchema, "query"),
  DeleteResearchFromListController.deleteResearchList
);

module.exports = router;
