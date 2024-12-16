"use strict";
// src/controllers/eventRegistrationController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventRegistration = void 0;
const axios_1 = __importDefault(require("axios"));
const bulk_registration_1 = __importDefault(require("../models/bulk_registration"));
const bulk_registration_2 = __importDefault(require("../validator/bulk_registration"));
const bulk_registration_3 = __importDefault(require("../template/bulk_registration"));
const registration_gen_1 = require("../utils/registration_gen");
const config_1 = __importDefault(require("../config"));
const FLW_SECRET_KEY = config_1.default.FLUTTERWAVE_SECRET_KEY || "";
// Utility function to verify payment with Flutterwave
const verifyPaymentWithFlutterwave = async (paymentReference) => {
    const flutterwaveVerificationUrl = `https://api.flutterwave.com/v3/transactions/${paymentReference}/verify`;
    const response = await axios_1.default.get(flutterwaveVerificationUrl, {
        headers: {
            Authorization: `Bearer ${FLW_SECRET_KEY}`,
        },
    });
    return response.data;
};
const createEventRegistration = async (req, res) => {
    const { organizerData, participants, paymentReference, paymentAmount, paymentCurrency, } = req.body;
    try {
        // Step 1: Validate the incoming data
        const { error } = bulk_registration_2.default.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            res.status(400).json({
                error: "Validation failed",
                details: error.details.map((err) => err.message),
            });
            return;
        }
        // Step 2: Check if the paymentReference already exists
        const existingRegistration = await bulk_registration_1.default.findOne({
            paymentReference,
        });
        if (existingRegistration) {
            res.status(400).json({
                error: "This payment reference has already been used for a registration.",
            });
            return;
        }
        // Step 3: Verify payment with Flutterwave
        let paymentData;
        try {
            paymentData = await verifyPaymentWithFlutterwave(paymentReference);
        }
        catch (err) {
            res
                .status(400)
                .json({ error: "Failed to verify payment with Flutterwave." });
            return;
        }
        // Step 4: Validate Flutterwave payment response
        const { status, data } = paymentData;
        if (status !== "success" || data.status !== "successful") {
            res.status(400).json({
                error: "Payment verification failed. Payment not successful.",
            });
            return;
        }
        if (data.amount !== paymentAmount || data.currency !== paymentCurrency) {
            res.status(400).json({
                error: "Payment details mismatch. Ensure the amount and currency are correct.",
            });
            return;
        }
        // Step 5: Generate registration numbers for each participant
        const participantsWithRegistrationNumbers = await Promise.all(participants.map(async (participant) => ({
            ...participant,
            registrationNumber: await (0, registration_gen_1.generateRegistrationNumber)(),
        })));
        // Step 6: Save registration details to the database
        const newEventRegistration = new bulk_registration_1.default({
            organizerData,
            participants: participantsWithRegistrationNumbers,
            paymentReference,
            paymentStatus: data.status, // Map "successful" from Flutterwave
            paymentAmount,
            paymentCurrency,
        });
        const savedRegistration = await newEventRegistration.save();
        // Step 7: Generate the confirmation HTML
        const confirmationHtml = (0, bulk_registration_3.default)(organizerData.organizerName, participantsWithRegistrationNumbers, paymentReference, data.status, paymentAmount, paymentCurrency);
        // Step 8: Respond with the HTML
        res.status(201).send(confirmationHtml);
    }
    catch (error) {
        console.error("Error creating event registration:", error.message);
        // Handle duplicate key error (E11000)
        if (error.code === 11000) {
            if (error.keyPattern && error.keyPattern.paymentReference) {
                res.status(400).json({
                    error: "This payment reference has already been used for a registration.",
                });
                return;
            }
            if (error.keyPattern && error.keyPattern.registrationNumber) {
                res.status(500).json({
                    error: "Duplicate registration number generated. Please try again.",
                });
                return;
            }
        }
        res.status(500).json({
            error: "Internal server error. Please try again later.",
        });
    }
};
exports.createEventRegistration = createEventRegistration;
