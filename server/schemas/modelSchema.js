const Joi = require('joi');

module.exports.modelSchema = Joi.object({
  diet: Joi.string().required(),
  mealType: Joi.string().required(),
  time: Joi.string().required(),
  nutritionalGoals: Joi.string().required(),
  cuisine: Joi.string().required()
});


