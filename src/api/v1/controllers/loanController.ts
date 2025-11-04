import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const createLoan = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.CREATED).json({ message: "Loan application created successfully." });
};

export const getAllLoans = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({ message: "List of all loan applications." });
};

export const getLoanById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(HTTP_STATUS.OK).json({ message: `Details for loan ID: ${id}` });
};

export const approveLoan = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(HTTP_STATUS.OK).json({ message: `Loan ID: ${id} approved.` });
};

export const rejectLoan = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(HTTP_STATUS.OK).json({ message: `Loan ID: ${id} rejected.` });
};
