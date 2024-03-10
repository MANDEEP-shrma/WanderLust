const Joi = require("joi");

const listingSchema = Joi.object({
  // humm yaha pai uss schema ka naam likhte
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(1),
    image: Joi.string().allow("", null),
  }).required(),
});

const reviewSchema = Joi.object({
  // humm yaha upar pai uss schema ka naam likhte and niche apne model ka
  review: Joi.object({
    ratings: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
