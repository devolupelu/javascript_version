"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_registration_1 = require("../controllers/whatsapp_registration");
exports.default = (router) => {
    router.post("/whatsapp_registration", whatsapp_registration_1.whatsapp_register);
};
