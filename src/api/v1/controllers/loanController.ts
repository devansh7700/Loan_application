import { Request, Response, NextFunction} from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { NotFoundError, BadRequestError } from "../errors/AppError";


export const createLoan = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.CREATED).json({ message: "Loan application created successfully." });
};

export const getAllLoans = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({ message: "List of all loan applications." });
};

export const getLoanById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // Hardcoded loan for testing
  const loan = { id, amount: 1000, status: "pending", applicant: "John Doe" };

  if (!loan) {
    return next(new NotFoundError(`Loan with ID ${id} not found`));
  }

  res.status(HTTP_STATUS.OK).json({
    message: `Loan details for ID ${id}`,
    loan,
  });
};

export const approveLoan = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new BadRequestError("Loan ID is required"));
  }

  res.status(HTTP_STATUS.OK).json({ message: `Loan ID: ${id} approved.` });
};

export const rejectLoan = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new BadRequestError("Loan ID is required"));
  }

  res.status(HTTP_STATUS.OK).json({ message: `Loan ID: ${id} rejected.` });
};