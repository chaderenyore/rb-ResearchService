const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// vallidators
const AddFavCoin = require('../../../vallidators/favouriteCoins/add.validator');
const RemoveFavCoin = require("../../../vallidators/favouriteCoins/remove.validator");
const FetchAllFavCoin = require("../../../vallidators/favouriteCoins/fetchAllUsersFavoCoin.validator")
const ValidateFavCoin = require("../../../vallidators/favouriteCoins/validate")


// controllers
const AddFavCoinController = require('../favCoinControllers/addFavCoin.controllers');
const GetFavCoinController = require('../favCoinControllers/fetchUsersFavCoin.controller');
const RemoveFavCoinController = require('../favCoinControllers/removeFavCoin.controller');
const ValidateFavCoinController = require('../favCoinControllers/validate');



const router = Router();

router.post(
  '/',
  authorize(['user','org']),
  validateRequest(AddFavCoin.addFavCoinBodySchema, 'body'),
  AddFavCoinController.addFavCoin
);

router.get(
  '/',
  authorize(['user','org']),
  validateRequest(FetchAllFavCoin.getAllUsersFavCOinQuerySchema, 'query'),
  GetFavCoinController.fetchUsersFavCoin
);

router.delete(
    '/delete',
    authorize(['user','org']),
    validateRequest(RemoveFavCoin.removeFavCoinQuerySchema, "query"),
    RemoveFavCoinController.removefavCoin
  );

router.post(
    '/validate',
    authorize(['user','org']),
    validateRequest(ValidateFavCoin.validateFavSchema, "query"),
    ValidateFavCoinController.validateFavCoin
  );



module.exports = router;
