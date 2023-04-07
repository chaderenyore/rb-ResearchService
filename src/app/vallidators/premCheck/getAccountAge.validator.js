const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.getAccountSchema = Joi.object().keys({
  date_to_check: Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required()
});
