"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = require("../controllers/area");
exports.default = (router) => {
    router.post("/areas", area_1.saveArea);
};
