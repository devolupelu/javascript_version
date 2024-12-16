"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bulk_registration_1 = require("../controllers/bulk_registration");
exports.default = (router) => {
    router.post("/assembly-registration", bulk_registration_1.createEventRegistration);
};
