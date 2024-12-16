"use strict";
// src/controllers/AllRegistrationsController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRegistrations = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Import your models
const bulk_registration_1 = __importDefault(require("../models/bulk_registration"));
const whatsapp_registration_1 = __importDefault(require("../models/whatsapp_registration"));
const registration_1 = __importDefault(require("../models/registration"));
/**
 * Get all registrations from BulkEventRegistration, EventRegistration, and RegistrationModel
 * without any limit, search, or pagination.
 */
exports.getAllRegistrations = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const [bulkRegistrations, eventRegistrations, whatsappRegistrations] = await Promise.all([
            bulk_registration_1.default.find().exec(),
            whatsapp_registration_1.default.find().exec(),
            registration_1.default.find().exec(),
        ]);
        // Option A: Return them as separate arrays in one response object
        res.status(200).json({
            success: true,
            data: {
                bulkRegistrations,
                eventRegistrations,
                whatsappRegistrations,
            },
        });
        // Option B: Combine everything into a single array (uncomment if you prefer a unified list)
        // const allRegistrations = [
        //   ...bulkRegistrations,
        //   ...eventRegistrations,
        //   ...whatsappRegistrations,
        // ];
        // return res.status(200).json({ success: true, data: allRegistrations });
    }
    catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message || error,
        });
    }
});
