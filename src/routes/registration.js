import express from "express";
import createRegistration  from "../controllers/registration.js";

const registrationRoutes = (router) => {
  router.post("/registration", createRegistration);
};

export default registrationRoutes;
