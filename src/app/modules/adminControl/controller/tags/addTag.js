const { HTTP } = require('../../../../../_constants/http');
const { RESPONSE } = require('../../../../../_constants/response');
const createError = require('../../../../../_helpers/createError');
const { createResponse } = require('../../../../../_helpers/createResponse');
const TagsService = require('../../services/tags.service');

exports.addTag = async (req, res, next) => {
  try {
    //check if tag already exists
    const tag = await new TagsService().findATag({
      tag_name: req.body.tag_name,
    });

    if (tag) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: 'Tag already exists',
            statusCode: HTTP.OK,
            data: {
              tag,
            },
            code: HTTP.OK,
          },
        ])
      );
    } else {
      const newTagData = {
        added_by: req.body.added_by,
        tag_name: req.body.tag_name,
      };
      const newTag = await new TagsService().create(newTagData);

      return createResponse('Tag Created', newTag)(res, HTTP.CREATED);

    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
