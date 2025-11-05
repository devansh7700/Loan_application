import express from "express";
import { assignUserRole, getUserRole } from "../controllers/roleController";

const router = express.Router();

// POST → Assign a role to a user
router.post("/assign", assignUserRole);

// GET → Retrieve a user's assigned role
router.get("/:uid", getUserRole);

export default router;
