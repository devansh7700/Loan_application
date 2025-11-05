import { Router } from "express";
import {createLoan, getAllLoans, getLoanById, approveLoan, rejectLoan} from "../controllers/loanController";
import { authorize } from "../middleware/authorizationMiddleware";

const router = Router();

router.post("/loans", createLoan);
router.get("/loans", getAllLoans);
router.get("/loans/:id", getLoanById);

//Protected Endpoints
router.put("/:id/approve", authorize({ roles: ["officer"] }), approveLoan);
router.put("/:id/reject", authorize({ roles: ["officer"] }), rejectLoan);

export default router;