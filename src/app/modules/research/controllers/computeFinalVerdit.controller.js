const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../../premcheck/services/premCheck.service");
const TokenomicsService = require("../../tokenomicsHealth/services/tokenomics.service");
const AdoptionAndRecognitionService = require("../../research/services/researchAdoption.service");
const ResearchCommunityANdSpiritService = require("../../research/services/researchCommunity.service");
const ResearchComparisonService = require("../../research/services/comparison.services");
const ResearchService = require("../../research/services/research.services");

exports.computeFinalVerdit = async (req, res, next) => {
  try {
    // check if research exists
    const researchExist = await new ResearchService().findAResearch({
      _id: req.params.research_id,
    });
    if (researchExist) {
        let ComparisonData = {}
      // search for all research dependents
      const researchPremChecks = await new PremCheckService().findOne({
        research_id: req.params.research_id,
      });
      const researchTokenomics = await new TokenomicsService().findOne({
        research_id: req.params.research_id,
      });
      const researchAdoptionAndRecognition =
        await new AdoptionAndRecognitionService().findOne({
          research_id: req.params.research_id,
        });
      const researchCommunityAndTeamSpirit =
        await new ResearchCommunityANdSpiritService().findOne({
          research_id: req.params.research_id,
        });
      const researchComparison = await new ResearchComparisonService().findOne({
        research_id: req.params.research_id,
      });
      let dataMessage = {
        message: "Not Found"
      }
    //   build final veridt info
    const finalverditInfo = {

    }
    // check for score
    let ResearchBuddyVerdit;
    if(Number(researchExist.verdit_score) < 50){
        ResearchBuddyVerdit = {
            Verdit: "Poor",
            Comments:"Not Advisable",
            Score:Number(researchExist.verdit_score)
        }
    }
    if(Number(researchExist.verdit_score) === 50){
        ResearchBuddyVerdit = {
            Verdit: "Fair",
            Comments:"Not Advisable",
            Score:Number(researchExist.verdit_score)
        }
    }
    if(Number(researchExist.verdit_score) > 50 && Number(researchExist.verdit_score) < 60 ){
        ResearchBuddyVerdit = {
            Verdit: "Good",
            Comments:"Can Buy",
            Score:Number(researchExist.verdit_score)
        }
    }
    if(Number(researchExist.verdit_score) >= 60 && Number(researchExist.verdit_score) < 70 ){
        ResearchBuddyVerdit = {
            Verdit: "Solid",
            Comments:"Can Buy",
            Score:Number(researchExist.verdit_score)
        }
    }

    if(Number(researchExist.verdit_score) >= 70){
        ResearchBuddyVerdit = {
            Verdit: "Excellent",
            Comments:"Can Buy",
            Score:Number(researchExist.verdit_score)
        }
    }
      const DataToClient = {
        PremChecks: researchPremChecks || dataMessage,
        Tokenomics: researchTokenomics || dataMessage,
        Adoption_And_Recognition: researchAdoptionAndRecognition || dataMessage,
        Community_And_TeamSpirit: researchCommunityAndTeamSpirit || dataMessage,
        Comparison: researchComparison || dataMessage,
        ResearchBuddyVerdit,
      };
      return createResponse(`Final Verdit Comuted Successfully`, DataToClient)(
        res,
        HTTP.OK
      );
    } else {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Research Does Not Exist",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
