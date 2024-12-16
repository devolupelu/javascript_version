"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define the schema for a single participant
const participantSchema = joi_1.default.object({
    first_name: joi_1.default.string().trim().min(2).max(50).required(),
    last_name: joi_1.default.string().trim().min(2).max(50).required(),
    email: joi_1.default.string().email().required(),
    phone_number: joi_1.default.string()
        .pattern(/^\d{10,15}$/)
        .required()
        .messages({
        "string.pattern.base": "Phone number must be between 10-15 digits",
    }),
    is_member: joi_1.default.boolean().required(),
    member_area_id: joi_1.default.string().allow("").optional(),
    bed_option: joi_1.default.string()
        .valid("registration_only", "registration_with_bed")
        .required(),
});
// Define the main validation schema
const validateEventRegistration = joi_1.default.object({
    organizerData: joi_1.default.object({
        organizerName: joi_1.default.string().trim().min(1).max(100).required(),
        organizerEmail: joi_1.default.string().email().required(),
    }).required(),
    participants: joi_1.default.array().items(participantSchema).min(1).required(),
    paymentReference: joi_1.default.number().integer().required(),
    paymentStatus: joi_1.default.string().valid("completed", "pending", "failed", "successful").required(),
    paymentAmount: joi_1.default.number().positive().required(),
    paymentCurrency: joi_1.default.string().valid("NGN", "USD", "EUR").required(),
});
// Export the schema
exports.default = validateEventRegistration;
