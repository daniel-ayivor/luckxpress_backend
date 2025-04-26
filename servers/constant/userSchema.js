const Joi = require('joi');

module.exports = {
  registerSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    // add other registration fields
  }),

  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // other schemas...
};