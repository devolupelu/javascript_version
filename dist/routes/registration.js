"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registration_1 = require("../controllers/registration");
exports.default = (router) => {
    router.post("/registration", registration_1.createRegistration);
};
