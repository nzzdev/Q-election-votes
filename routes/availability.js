const Boom = require("boom");
const Joi = require("joi");

module.exports = {
  method: "POST",
  path: "/availability/{propertyName}",
  options: {
    validate: {
      payload: Joi.object()
    },
    cors: true
  },
  handler: function(request, h) {
    const item = request.payload.item;

    if (request.params.propertyName === "percentage") {
      let isAvailable = false;
      if (!item.isProjection) {
        isAvailable = true;
      }
      return {
        available: isAvailable
      };
    }

    if (request.params.propertyName === "projection") {
      let isAvailable = false;
      if (item.isProjection === true) {
        isAvailable = true;
      }
      return {
        available: isAvailable
      };
    }

    return Boom.badRequest();
  }
};
