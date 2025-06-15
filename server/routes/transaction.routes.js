import express from "express";

import { adminAuth, userAuth, workerAuth } from "../utils/userAuth.js";
import {
  createManyPassenger,
  createTransaction,
  getAllTransactions,
  getMyTransactions,
  getTransaction,
  getUserTransactions,
} from "../controllers/transaction.js";

const router = express.Router();

router
  .post("/create", userAuth, workerAuth, createTransaction)
  .get("/getMy", userAuth, getMyTransactions)
  .get("/get/:_id", userAuth, getTransaction)
  .get("/pay/:client", userAuth, workerAuth, getUserTransactions)
  .get("/all", userAuth, adminAuth, getAllTransactions)
  .post("/Passenger", createManyPassenger);

export default router;
