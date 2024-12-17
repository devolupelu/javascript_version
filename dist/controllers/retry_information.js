"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistrationDetails = void 0;
const whatsapp_registration_1 = __importDefault(require("../models/whatsapp_registration"));
const whatsapp_reg_temp_1 = __importDefault(require("../template/whatsapp_reg_temp"));
const getRegistrationDetails = async (req, res) => {
    try {
        /**
         * Because `req.query` can contain strings, arrays, or objects,
         * we cast them to string | undefined and handle carefully.
         */
        const nameQuery = typeof req.query.name === "string" ? req.query.name.trim() : undefined;
        const registrationNumberQuery = typeof req.query.registrationNumber === "string"
            ? req.query.registrationNumber.trim()
            : undefined;
        // Validate required fields
        if (!nameQuery && !registrationNumberQuery) {
            res.status(400).json({
                message: "Either name or registration number must be provided.",
            });
            return;
        }
        /**
         * Build a query object for .findOne() using $or.
         * If both name and registrationNumber are given, either will match.
         * If only one is given, the other condition becomes irrelevant.
         */
        const queryConditions = [];
        if (registrationNumberQuery) {
            // direct match on registrationNumber field
            queryConditions.push({ registrationNumber: registrationNumberQuery });
        }
        if (nameQuery) {
            // safer splitting: handle 1 word, 2 words, or more
            const [firstName, lastName = ""] = nameQuery.split(" ");
            if (firstName) {
                queryConditions.push({ $and: [{ firstName }, { lastName }] });
            }
        }
        // If for some reason, both conditions are empty, throw error
        if (!queryConditions.length) {
            res.status(400).json({
                message: "Invalid query parameters. 'name' must have at least one word.",
            });
            return;
        }
        // Fetch registration details based on name or registration number
        const registration = (await whatsapp_registration_1.default.findOne({
            $or: queryConditions,
        }));
        if (!registration) {
            res.status(404).json({
                message: "Registration not found.",
            });
            return;
        }
        // Generate HTML content
        const emailContent = (0, whatsapp_reg_temp_1.default)(registration.firstName, registration.lastName, registration.Email, registration.PhoneNumber, registration.isMember, registration.MemberArea, registration.RegistrationOption, registration.registrationNumber);
        // Send success response with HTML content
        res.status(200).send(emailContent);
    }
    catch (error) {
        console.error("Error fetching registration details:", error);
        res.status(500).json({
            message: "An unexpected error occurred while fetching registration details.",
        });
    }
};
exports.getRegistrationDetails = getRegistrationDetails;
