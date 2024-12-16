"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsapp_register = void 0;
const whatsapp_registration_1 = __importDefault(require("../models/whatsapp_registration"));
const registration_gen_1 = require("../utils/registration_gen"); // Generates unique registration numbers
const whatsapp_reg_temp_1 = __importDefault(require("../template/whatsapp_reg_temp"));
const whatsapp_register = async (req, res) => {
    try {
        const { firstName, lastName, Email, PhoneNumber, isMember, MemberArea, RegistrationOption, } = req.body;
        // Validate required fields
        if (!firstName ||
            !lastName ||
            !Email ||
            !PhoneNumber ||
            !RegistrationOption) {
            res.status(400).json({
                message: "All required fields must be provided.",
            });
            return; // Exit the function after sending the response
        }
        // Check if registration already exists
        const existingRegistration = await whatsapp_registration_1.default.findOne({ Email });
        if (existingRegistration) {
            res.status(400).json({
                message: "A registration with this email already exists.",
            });
            return; // Exit the function after sending the response
        }
        // Generate registration number
        const registrationNumber = await (0, registration_gen_1.generateRegistrationNumber)();
        // Create a new registration document
        const newRegistration = new whatsapp_registration_1.default({
            firstName,
            lastName,
            Email,
            PhoneNumber,
            isMember,
            MemberArea,
            RegistrationOption,
            registrationNumber, // Include the generated registration number
        });
        // Save to database
        await newRegistration.save();
        // Generate HTML content
        const emailContent = (0, whatsapp_reg_temp_1.default)(firstName, lastName, Email, PhoneNumber, isMember, MemberArea, RegistrationOption, registrationNumber);
        // Send success response with HTML content
        res.status(201).send(emailContent);
    }
    catch (error) {
        console.error("Error during registration:", error);
        // Differentiate between validation errors and unexpected errors
        if (error instanceof Error && error.name === "ValidationError") {
            res.status(400).json({
                message: "Validation error occurred.",
                details: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "An unexpected error occurred during registration."
            });
        }
    }
};
exports.whatsapp_register = whatsapp_register;
