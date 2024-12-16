"use strict";
// src/models/EventRegistration.ts
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
const EventRegistrationSchema = new mongoose_1.Schema({
    is_member: { type: Boolean, required: false },
    member_area_id: {
        type: String,
        ref: "Area",
        required: function () {
            return this.is_member === true;
        },
    },
    bed_option: {
        type: String,
        enum: ["registration_with_bed", "registration_only"],
        required: true,
    },
    baseAmount: { type: Number, required: true },
    bedFeeAmount: { type: Number, required: true },
    first_name: { type: String, required: true, index: true }, // Indexed for name searches
    last_name: { type: String, required: true, index: true }, // Indexed for name searches
    email: { type: String, required: true, unique: true, index: true }, // Indexed and unique
    phone_number: { type: String, required: true },
    paymentReference: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    paymentCurrency: { type: String, required: true },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    }, // Indexed and unique
}, {
    timestamps: true,
});
const EventRegistrationModel = mongoose_1.default.model("EventRegistration", EventRegistrationSchema);
exports.default = EventRegistrationModel;
