"use strict";
// src/controllers/registrationController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistration = void 0;
const axios_1 = __importDefault(require("axios"));
const registration_1 = __importDefault(require("../models/registration"));
const registration_gen_1 = require("../utils/registration_gen");
const schema_1 = require("../validator/schema");
const template_1 = __importDefault(require("../template/template"));
const config_1 = __importDefault(require("../config"));
const FLUTTERWAVE_SECRET_KEY = config_1.default.FLUTTERWAVE_SECRET_KEY;
const createRegistration = async (req, res) => {
    const { error, value } = schema_1.registrationSchema.validate(req.body);
    if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return;
    }
    const { paymentReference, paymentAmount, email, first_name, last_name, is_member, bed_option, phone_number } = value;
    try {
        // Check if a completed registration already exists with this paymentReference
        const existingRegistration = await registration_1.default.findOne({
            paymentReference,
            paymentStatus: "completed",
        });
        if (existingRegistration) {
            res.status(400).json({
                success: false,
                message: "A completed registration with this payment reference already exists.",
            });
            return;
        }
        // Verify payment with Flutterwave
        const flutterwaveResponse = await axios_1.default.get(`https://api.flutterwave.com/v3/transactions/${paymentReference}/verify`, {
            headers: {
                Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
            },
        });
        const { data } = flutterwaveResponse.data;
        if (data.status === "successful" &&
            data.amount === paymentAmount &&
            data.currency === value.paymentCurrency) {
            // Generate a unique registration number
            const registrationNumber = await (0, registration_gen_1.generateRegistrationNumber)();
            // Include the unique registration number in the new registration data
            const newRegistrationData = { ...value, registrationNumber };
            // Save the validated data with the unique registration number
            const newRegistration = new registration_1.default(newRegistrationData);
            await newRegistration.save();
            // Generate HTML content for registration confirmation
            const emailHtml = (0, template_1.default)(first_name, last_name, is_member || false, bed_option, paymentReference, "completed", paymentAmount, value.paymentCurrency, email, phone_number, registrationNumber);
            // Respond with the registration number, message, and HTML content
            res.status(200).json({
                message: "Registration completed successfully!",
                registrationNumber,
                emailHtml,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Payment verification failed or mismatched amount/currency.",
            });
        }
    }
    catch (err) {
        console.error("Error verifying payment with Flutterwave:", err);
        res.status(500).json({
            success: false,
            message: "Payment verification error",
            error: err,
        });
    }
};
exports.createRegistration = createRegistration;
