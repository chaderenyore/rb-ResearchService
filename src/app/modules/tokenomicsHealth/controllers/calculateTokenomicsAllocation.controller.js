const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const AllPuposeIndicator = require("../../../../_helpers/research/tokenomicsIndicator");
const logger = require("../../../../../logger.conf");

exports.computeTokenomicsAllocationPercentages = async (req, res, next) => {
  try {
    // container for storing purpose
    let purposeDetailArray = [];
    let purposeData = [];
    // get body data
    const { allocation_data, total_supply } = req.body;
    //  get all items in purpose array
    for (let i = 0; i < allocation_data.length; i++) {
      // check if allocation data talies with what is expev=cted and filter
      let requiredIndicators = AllPuposeIndicator.allData;
      if (requiredIndicators.includes(allocation_data[i].name)) {
        purposeData.push(allocation_data[i]);
      }
    }
    if (purposeData.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "No Indicators Detected",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // check if total supply was passed and compute
      if (req.body.total_supply) {
        // get percentages of all purpose
        for (let i = 0; i < purposeData.length; i++) {
          // calculate total suplly from percnetage is passed
          if (purposeData[i].percentage) {
            const supplyForPurpose =
              (Number(purposeData[i].percentage) / 100) *
              Number(req.body.total_supply);
            let entryToAttach = {
              name: purposeData[i].name,
              allocation: supplyForPurpose,
            };
            purposeDetailArray.push(entryToAttach);
          }
          if (purposeData[i].total_allocation) {
            // calculate percentage
            const percentageData =
              (Number(purposeData[i].total_allocation) /
              Number(req.body.total_supply)) * 100;
            let entryToAttach = {
              name: purposeData[i].name,
              percentage_allocation: `${percentageData}%`,
            };
            purposeDetailArray.push(entryToAttach);
          }
        }
        // attach to purposeDetailArray
      } else {
        // check if allocation data has one of total allocation or percentage

        //  compute total suply form data entered
        let total_supply = 0;
        for (let i = 0; i < purposeData.length; i++) {
          // check if puposedata has one of allocation or percentage
          if (purposeData[i].total_allocation) {
            total_supply += Number(purposeData[i].total_allocation);
          }
          if (purposeData[i].percentage) {
            // get number from percentage
            const supplyForPurpose =
              (Number(purposeData[i].percentage) / 100) *
              Number(req.body.total_supply);
            total_supply += supplyForPurpose;
          }
        }
        // check if total suply exists
        // At this stage we have got total supply
        console.log("TOTAL SUPPLY ============= ", total_supply);
        // calculate either percentage or allocation
        for (let i = 0; i < purposeData.length; i++) {
          if (purposeData[i].total_allocation) {
            // calculate percentage
            const percentageData =
              (Number(purposeData[i].total_allocation) /
              Number(total_supply)) * 100;
            let entryToAttach = {
              name: purposeData[i].name,
              percentage_allocation: `${percentageData}%`,
            };
            purposeDetailArray.push(entryToAttach);
          }
          if (purposeData[i].percentage) {
            // calculate percentage
            const supplyData =
              (Number(purposeData[i].percentage) / 100) *
              Number(total_supply);
            let entryToAttach = {
              name: purposeData[i].name,
              allocation: supplyData,
            };
            purposeDetailArray.push(entryToAttach);
          }
        }
      }
      // dataToReturn
      const allocationData = {
        purpose_data: purposeDetailArray,
      };
      return createResponse(`Allocation Data Computed`, allocationData)(
        res,
        HTTP.OK
      );
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
