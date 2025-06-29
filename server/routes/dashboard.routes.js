import express from "express";

import { adminAuth, userAuth, workerAuth } from "../utils/userAuth.js";
import {
  adminDasboard,
  getUsers,
  passengersDashboard,
  useTransaction,
} from "../controllers/dashboard.js";

const router = express.Router();

router
  .get("/info", userAuth, adminAuth, adminDasboard)
  .get("/passengers", userAuth, adminAuth, passengersDashboard)
  .get("/users", userAuth, adminAuth, getUsers)
  .get("/transactions", userAuth, adminAuth, useTransaction);

export default router;
