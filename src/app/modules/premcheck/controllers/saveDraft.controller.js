const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const ResearchService = require("../../research/services/research.services");
const PremCheckService = require("../services/premCheck.service");
const KEYS = require("../../../../_config/keys");

exports.saveDraftPremCheck = async (req, res, next) => {
  try {
    // Get user Info for creating post
    const user = await axios.get(
      `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    if (user && user.data && user.data.code === 200) {
            // Create Research with info supplied supplied
    const dataToResearch = {
        researcher_username: user.data.data.username ? user.data.data.username : "",
        researcher_firstname: user.data.data.firstname ? user.data.data.firstname : "",
        researcher_lastame: user.data.data.lastname ? user.data.data.lastname : "",
        researcher_id: req.user.user_id,
        poster_id: req.user.user_id,
        researcher_image_url: user.data.data.image ? user.data.data.image : "",
        tags: req.body.tags ? req.body.tags : "",
        is_draft: true,
        ...req.body,
      };
      const newResearch = await new ResearchService().createResearch(
        dataToResearch
      );
      if (newResearch) {
        // create prem check entry
        const dataToPremCheck = {
          researcher_id: req.user.user_id,
          research_id: newResearch._id,
          tags: req.body.tags ? req.body.tags : [""],
          is_draft: true,
          ...req.body,
        };
        const draftPremCheck = await new PremCheckService().create(
          dataToPremCheck
        );
        console.log("drafts ================ ", draftPremCheck)
        return createResponse(`Draft Saved`, draftPremCheck)(res, HTTP.OK);
      }
    }

  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
