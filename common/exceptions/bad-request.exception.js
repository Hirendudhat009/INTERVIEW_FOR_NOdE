import { badRequest } from "../../utils/response/responseCode";
import GeneralError from "./general-error";

class BadRequestException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = badRequest
  }

}

export default BadRequestException
