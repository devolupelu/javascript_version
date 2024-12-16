import express from "express";
import createEventRegistration from "../controllers/bulk_registration.js";

const bulkRegistrationRoutes = (router) => {
  router.post("/assembly-registration", createEventRegistration);
};

export default bulkRegistrationRoutes;
