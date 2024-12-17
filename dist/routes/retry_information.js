"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retry_information_1 = require("../controllers/retry_information");
exports.default = (router) => {
    router.get("/get_registration_details", retry_information_1.getRegistrationDetails);
};
