import { AppError } from "./Apperror";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}
