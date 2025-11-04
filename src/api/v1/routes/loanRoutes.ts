import { Router } from "express";
import {
  createLoan,
  getAllLoans,
  getLoanById,
  approveLoan,
  rejectLoan
} from "../controllers/loanController";

const router = Router();

router.post("/loans", createLoan);
router.get("/loans", getAllLoans);
router.get("/loans/:id", getLoanById);
router.put("/loans/:id/approve", approveLoan);
router.put("/loans/:id/reject", rejectLoan);

export default router;