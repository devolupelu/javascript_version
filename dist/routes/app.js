"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = __importDefault(require("./payment"));
const area_1 = __importDefault(require("./area"));
const registration_1 = __importDefault(require("./registration"));
const bulk_registration_1 = __importDefault(require("./bulk_registration"));
const admin_1 = __importDefault(require("./admin"));
const router = express_1.default.Router();
exports.default = () => {
    (0, payment_1.default)(router);
    (0, area_1.default)(router);
    (0, registration_1.default)(router);
    (0, bulk_registration_1.default)(router);
    (0, admin_1.default)(router);
    //whatsapp(router);
    return router;
};
