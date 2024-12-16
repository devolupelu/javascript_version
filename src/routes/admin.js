import express from "express";
import { getAllRegistrations } from "../controllers/admin_two.js";

/**
 * Registration Routes
 *
 * @param router - Express Router instance
 */
const registrationRoutes = (router) => {
  router.get("/all-registrations", getAllRegistrations);
};

export default registrationRoutes;
