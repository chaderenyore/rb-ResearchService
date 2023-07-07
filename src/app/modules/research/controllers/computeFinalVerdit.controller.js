const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const PremCheckService = require("../../premcheck/services/premCheck.service");
const TokenomicsService = require("../../tokenomicsHealth/services/tokenomics.service");
const TokenomicsAllocationService = require("../../tokenomicsHealth/services/tokenomicsAllocation.services");
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
      const researchTokenomicsAllocationData = await new TokenomicsAllocationService().all({research_id:req.params.research_id })
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
    // update base reserach info with verdict data
    const updatedResearch = await new ResearchService().update({_id: req.params.research_id}, {verdit: ResearchBuddyVerdit.Verdit, ResearchBuddyVerdit: ResearchBuddyVerdit})
      const DataToClient = {
        PremChecks: researchPremChecks || dataMessage,
        Preliminary_Results:researchExist.preliminary_score,
        Tokenomics: researchTokenomics || dataMessage,
        Tokenomics_AllocationData: researchTokenomicsAllocationData.data || dataMessage,
        Tokenomics_Rating:researchExist.tokenomics_rating,
        Adoption_And_Recognition: researchAdoptionAndRecognition || dataMessage,
        Community_And_TeamSpirit: researchCommunityAndTeamSpirit || dataMessage,
        Comparison: researchComparison || dataMessage,
        ResearchBuddyVerdit,
      };
      return createResponse(`Final Verdit Computed Successfully`, DataToClient)(
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
