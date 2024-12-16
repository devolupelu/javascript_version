"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("../controllers/payment");
exports.default = (router) => {
    router.post("/verify-registration-payment", payment_1.verifyRegistration);
};
