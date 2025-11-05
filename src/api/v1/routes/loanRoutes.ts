import { Router } from "express";
import {createLoan, getAllLoans, getLoanById, approveLoan, rejectLoan} from "../controllers/loanController";
import { authorize } from "../middleware/authorizationMiddleware";

const router = Router();

router.post("/loans", createLoan);
router.get("/loans", getAllLoans);
router.get("/loans/:id", getLoanById);
router.put("/loans/:id/approve", approveLoan);
router.put("/loans/:id/reject", rejectLoan);
router.get("/", authorize({ roles: ["admin", "officer"] }), getAllLoans);
router.put("/:id/approve", authorize({ roles: ["officer"] }), approveLoan);
export default router;