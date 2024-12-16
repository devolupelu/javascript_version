// src/utils/generateRegistrationNumber.js

import Joi from "joi"; 

// Define the schema for a single participant
const participantSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).required(),
  last_name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10-15 digits",
    }),
  is_member: Joi.boolean().required(),
  member_area_id: Joi.string().allow("").optional(),
  bed_option: Joi.string()
    .valid("registration_only", "registration_with_bed")
    .required(),
});

// Define the main validation schema
const validateEventRegistration = Joi.object({
  organizerData: Joi.object({
    organizerName: Joi.string().trim().min(1).max(100).required(),
    organizerEmail: Joi.string().email().required(),
  }).required(),
  participants: Joi.array().items(participantSchema).min(1).required(),
  paymentReference: Joi.number().integer().required(),
  paymentStatus: Joi.string()
    .valid("completed", "pending", "failed", "successful")
    .required(),
  paymentAmount: Joi.number().positive().required(),
  paymentCurrency: Joi.string().valid("NGN", "USD", "EUR").required(),
});

// Export the schema
export default validateEventRegistration;
//export default Logger;
