
import { forbidden } from "../../utils/response/responseCode"
import GeneralError from "./general-error"

class ForbiddenException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = forbidden
  }
}

export default ForbiddenException

