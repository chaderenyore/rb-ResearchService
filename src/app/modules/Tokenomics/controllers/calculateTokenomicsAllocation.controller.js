const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ComputeTokenomicsHealth =
  require("../../../../_helpers/research/computeTokenomicsHealth").computeTokenomicsHealth;
const ResearchService = require("../../Research/services/research.services");
const logger = require("../../../../../logger.conf");
const TokenomicsService = require("../services/tokenomics.service");

exports.computeTokenomicsAllocation = async (req, res, next) => {
  try {
    // container for storing purpose
    let purposeData = {};
    // get body data
    const { allocation_purpose, circulating_supply, total_supply, max_supply } =
      req.body;
    //  get all items in purpose array
    for (let i = 0; i < allocation_purpose.length; i++) {}
    // update Tokenomics Data
    const updateTokenomics = await new TokenomicsService().update(
      { researcher_id: research_id },
      { ...req.body }
    );
    // get Prem check results from criteria

    const { message, data } = await ComputeTokenomicsHealth(coinData);
    const premCheckResults = {
      research_id: research_id,
      tokenomicsResults: {
        message,
        score: data,
      },
    };

    // dataToReturn
    const allocationData = {
      research_id: research_id,
      number_of_tradeable_tokens,
      is_main_token,
      has_enough_utility,
      token_type,
      circulating_supply,
      total_supply,
      max_supply,
      purpose,
      has_dao,
    };
    return createResponse(`${message}`, tokenomicsResults)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
