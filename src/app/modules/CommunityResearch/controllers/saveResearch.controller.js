const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const MySavedResearchService = require("../services/savedResearch.services");

exports.saveResearch = async (req, res, next) => {
  try {
    // Get body info
    const { research_info } = req.body;

    const dataToSavedResearch = {
      research_id: research_info._id,
      researcher_id: research_info.researcher_id,
      saver_id: req.user.user_id,
      research_info,
    };
    const savedResearch = await new MySavedResearchService().create(
      dataToSavedResearch
    );
    return createResponse(`Research Saved`, savedResearch)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
