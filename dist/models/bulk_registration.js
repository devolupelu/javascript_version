"use strict";
// src/models/BulkEventRegistration.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ParticipantSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, index: true }, // Indexed for faster email searches
    phone_number: { type: String, required: true },
    is_member: { type: Boolean, required: true },
    member_area_id: { type: String, default: "" },
    bed_option: {
        type: String,
        enum: ["registration_only", "registration_with_bed"],
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    }, // Indexed and unique
});
const EventRegistrationSchema = new mongoose_1.Schema({
    organizerData: {
        organizerName: { type: String, required: true, index: true }, // Indexed
        organizerEmail: { type: String, required: true, index: true }, // Indexed
    },
    participants: { type: [ParticipantSchema], required: true },
    paymentReference: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ["completed", "pending", "failed", "successful"],
        required: true,
    },
    paymentAmount: { type: Number, required: true },
    paymentCurrency: {
        type: String,
        enum: ["NGN", "USD", "EUR"],
        required: true,
    },
});
const BulkEventRegistration = mongoose_1.default.model("Bulk-EventRegistration", EventRegistrationSchema);
exports.default = BulkEventRegistration;
