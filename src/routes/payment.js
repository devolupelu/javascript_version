import express from "express";
import verifyRegistration from "../controllers/payment.js";

const paymentRoutes = (router) => {
  router.post("/verify-registration-payment", verifyRegistration);
};

export default paymentRoutes;
