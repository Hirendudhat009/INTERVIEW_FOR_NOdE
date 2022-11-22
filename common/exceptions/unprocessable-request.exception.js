
import { validationError } from "../../utils/response/responseCode"
import GeneralError from "./general-error"

class UnprocessableException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = validationError
  }
}

export default UnprocessableException

