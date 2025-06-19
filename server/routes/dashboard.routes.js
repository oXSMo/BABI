import express from "express";

import { adminAuth, userAuth, workerAuth } from "../utils/userAuth.js";
import {
  adminDasboard,
  passengersDashboard,
} from "../controllers/dashboard.js";

const router = express.Router();

router
  .get("/info", userAuth, adminAuth, adminDasboard)
  .get("/passengers", userAuth, adminAuth, passengersDashboard);

export default router;
