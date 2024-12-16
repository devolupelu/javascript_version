"use strict";
// src/routes/registrationRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const admin_two_1 = require("../controllers/admin_two");
/**
 * Registration Routes
 *
 * @param router - Express Router instance
 */
const registrationRoutes = (router) => {
    router.get("/all-registrations", admin_two_1.getAllRegistrations);
};
exports.default = registrationRoutes;
