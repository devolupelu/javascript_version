// src/validators/registrationValidator.js

import Joi from "joi";

const registrationSchema = Joi.object({
  is_member: Joi.boolean().optional(),
  member_area_id: Joi.string().when("is_member", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.allow("").optional(),
  }),
  bed_option: Joi.string()
    .valid("registration_with_bed", "registration_only")
    .required(),
  baseAmount: Joi.number().required(),
  bedFeeAmount: Joi.number().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required(),
  paymentReference: Joi.number().required(),
  paymentStatus: Joi.string().required(),
  paymentAmount: Joi.number().required(),
  paymentCurrency: Joi.string().length(3).required(),
});

export default registrationSchema;
