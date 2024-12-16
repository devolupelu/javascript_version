import express from "express";
import saveArea from "../controllers/area.js";

const areaRoutes = (router) => {
  router.post("/areas", saveArea);
};

export default areaRoutes;
