const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const CalculateAge = require("../../../../_helpers/research/calculateAge");
const { createResponse } = require("../../../../_helpers/createResponse");

const logger = require("../../../../../logger.conf");

exports.checkAccountAge = async (req, res, next) => {
  try {
     const { twitter_createdAt } = req.body;
     const accountAge = await CalculateAge(twitter_createdAt); 
    return createResponse(`Age Computed Successfully`, accountAge)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
