const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const ResearchService = require("../../../research/services/research.services");
const CommunityResearchService = require("../../../communityresearchmodule/services/communityResearch.services");
const SavedResearchService = require("../../../communityresearchmodule/services/savedResearch.services");
const RecycleBinService = require("../../services/recycleBin.services");

const logger = require("../../../../../../logger.conf");

exports.bulkDeleteResearch = async (req, res, next) => {
  try {
    let deletedResearch = [];
    // get the array of ids from the body
    const { research_ids } = req.body;
    // loop through idss and delete from community while adding to banned researchs and user's researchs
    for (let i = 0; i < research_ids.length; i++) {
      // future implementation
      // search for research and if report count exceed a certain value ,delete
      // check if research exist
      console.log("IDS ============ ", research_ids[i]);
      const research = await new ResearchService().findAResearch({_id: research_ids[i]});
      if(!research){
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: `Id At Position ${i} is Invalid`,
              statusCode: HTTP.Ok,
              data: {},
              code: HTTP.Ok,
            },
          ])
        );
      }
      deletedResearch.push(research);
      // search for researchs in community and delete
      const deletedresearch = await new CommunityResearchService().deletOne({
        original_research_id: research_ids[i],
      });
      console.log("DELETED COMMUNITY research ===" , deletedresearch)
      //delete from users researchs
      const deletedUserResearchs = await new ResearchService().deleteOne({
        _id: research_ids[i],
      });
      // update tweets and reresearched
      const updatedReresearch = await new ResearchService().update(
        { research_id: research_ids[i] },
        { original_is_deleted: true }
      );

      const updatedSavedResearch = await new SavedResearchService().update(
        { research_id: research_ids[i] },
        { original_is_deleted: true }
      );
      //    save to recyclebin
      const dataToBin = {
        deleted_by: "admin",
        deleter_id: req.user.user_id,
        ...research
      }
    //   save to recycle bin
      const bin = await new RecycleBinService().create(dataToBin);
    }
    return createResponse("Research Deleted", deletedResearch)(
      res,
      HTTP.OK
    );
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
