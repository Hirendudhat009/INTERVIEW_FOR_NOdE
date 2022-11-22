
import { conflictError } from "../../utils/response/responseCode"
import GeneralError from "./general-error"

class ConflictException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = conflictError
  }
}

export default ConflictException

