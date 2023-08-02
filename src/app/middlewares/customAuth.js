const { HTTP } = require('../../_constants/http');
const { RESPONSE } = require('../../_constants/response');
const createError = require('../../_helpers/createError');
const KEYS = require('../../_config/keys');
const { default: axios } = require('axios');

exports.customAuth = (role = []) => {
  return async (req, res, next) => {
    const message = 'Unauthorized';
    const token =
      req.headers['authorization'] &&
      req.headers['authorization'].split(' ')[1];
    if (!token) {
        next();
    }
    try {
      //   validate
      const user = await axios.get(
        `${KEYS.AUTH_URI}/auth/v1/user/validate-token?platform=web`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (role.includes(String(user.data.data.user_type))) {
        req.user = user.data.data;
        req.token = token;
        next();
      } else {
        return next(
          createError(HTTP.UNAUTHORIZED, [
            {
              status: RESPONSE.ERROR,
              message: 'Unauthorized',
              statusCode: HTTP.UNAUTHORIZED,
              data: {},
              code: HTTP.UNAUTHORIZED,
            },
          ])
        );
      }
    } catch (err) {
      // console.log(err);
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: err.message
              ? err.response.statusText
              : 'Opps, probably Network, we know we working on it',
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
  };
};
