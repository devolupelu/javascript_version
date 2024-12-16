"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_now = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect_now = async (connection) => {
    try {
        await mongoose_1.default.connect(connection);
        console.log("Connected");
    }
    catch (er) {
        console.log("Some bad", er);
    }
};
exports.connect_now = connect_now;
