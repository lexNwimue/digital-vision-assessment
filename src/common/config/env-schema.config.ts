import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // DATABASE_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().min(20).max(200).required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('1h'),
});
