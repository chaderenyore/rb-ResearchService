const { HTTP } = require('../../../../../_constants/http');
const { RESPONSE } = require('../../../../../_constants/response');
const createError = require('../../../../../_helpers/createError');
const { createResponse } = require('../../../../../_helpers/createResponse');
const TagsService = require('../../services/tags.service');

exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await new TagsService().all(
      req.query.limit,
      req.query.page,
      {}
    );

    if (tags.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: 'No Tags At The Moment',
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }

    return createResponse("All Tags Retrieved", tags)(res, HTTP.OK);

  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
