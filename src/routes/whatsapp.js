import express from "express";
import whatsapp_register from "../controllers/whatsapp_registration.js";

const whatsappRegistrationRoutes = (router) => {
  router.post("/whatsapp_registration", whatsapp_register);
};

export default whatsappRegistrationRoutes;
