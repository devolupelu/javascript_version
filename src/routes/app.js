// src/routes/index.js

import express from "express";
import payment from "./payment.js";
import area from "./area.js";
import registration from "./registration.js";
import bulk_registration from "./bulk_registration.js";
import whatsapp from "./whatsapp.js";
import admin from "./admin.js";

const router = express.Router();

const initializeRoutes = () => {
  payment(router);
  area(router);
  registration(router);
  bulk_registration(router);
  admin(router);
  // whatsapp(router);
  return router;
};

export default initializeRoutes;
