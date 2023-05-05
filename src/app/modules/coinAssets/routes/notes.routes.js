const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// vallidators
const AddCoinNote = require('../../../vallidators/CoinAssets/addNote.validator');
const GetCoinNote = require("../../../vallidators/CoinAssets/getNote.validator");
const UpdateCoinNote = require("../../../vallidators/CoinAssets/editNote.validator");
const DeleteCoinNote = require("../../../vallidators/CoinAssets/deleteNote.validator");


// controllers
const AddCoinNoteController = require('../controllers/addCoinNotes');
const GetCoinNoteController = require('../controllers/getCoinNotes');
const UpdateCoinNoteController = require('../controllers/updateNotes');
const DeleteCoinNoteController = require('../controllers/deleteNotes');


const router = Router();

router.post(
  '/',
  authorize(['user','org']),
  validateRequest(AddCoinNote.addCoinNotesBodySchema, 'body'),
  validateRequest(AddCoinNote.addCoinNotesQuerySchema, 'query'),
  AddCoinNoteController.createNote
);

router.get(
  '/',
  authorize(['user','org']),
  validateRequest(GetCoinNote.coinNotesQuerySchema, "query"),
  GetCoinNoteController.getResearchNote
);
router.put(
  '/',
  authorize(['user','org']),
  validateRequest(UpdateCoinNote.updateNoteBodySchema, "body"),
  validateRequest(UpdateCoinNote.updateNotesQuerySchema, "query"),
  UpdateCoinNoteController.editResearchNote
);

router.delete(
    '/',
    authorize(['user','org']),
    validateRequest(DeleteCoinNote.deleteNotesQuerySchema, "query"),
    DeleteCoinNoteController.deleteResearchNote
  );




module.exports = router;
