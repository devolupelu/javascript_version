"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = void 0;
// src/validators/registrationValidator.ts
const joi_1 = __importDefault(require("joi"));
exports.registrationSchema = joi_1.default.object({
    is_member: joi_1.default.boolean().optional(),
    member_area_id: joi_1.default.string().when("is_member", {
        is: true,
        then: joi_1.default.required(),
        otherwise: joi_1.default.allow("").optional(),
    }),
    bed_option: joi_1.default.string()
        .valid("registration_with_bed", "registration_only")
        .required(),
    baseAmount: joi_1.default.number().required(),
    bedFeeAmount: joi_1.default.number().required(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone_number: joi_1.default.string().pattern(/^\d{10,15}$/).required(),
    paymentReference: joi_1.default.number().required(),
    paymentStatus: joi_1.default.string().required(),
    paymentAmount: joi_1.default.number().required(),
    paymentCurrency: joi_1.default.string().length(3).required(),
});
