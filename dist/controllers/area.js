"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveArea = void 0;
const area_1 = __importDefault(require("../models/area"));
// Save a new area
const saveArea = async (req, res) => {
    const { id, name } = req.body;
    // Check if area already exists by ID to avoid duplicates
    try {
        const existingArea = await area_1.default.findOne({ id });
        if (existingArea) {
            res.status(400).json({
                success: false,
                message: "Area with this ID already exists.",
            });
            return;
        }
        const newArea = new area_1.default({ id, name });
        await newArea.save();
        res.status(201).json({
            success: true,
            message: "Area saved successfully",
            data: newArea,
        });
    }
    catch (error) {
        console.error("Error saving area:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
};
exports.saveArea = saveArea;
