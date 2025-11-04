import express from "express";
import { getUserDetails, setUserRole } from "../controllers/usercontroller";

const router = express.Router();

// GET user details by UID
router.get("/:uid", getUserDetails);

// POST assign role (admin use)
router.post("/setRole", setUserRole);

export default router;
