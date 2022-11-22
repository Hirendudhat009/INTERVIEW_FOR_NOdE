
import { unAuthorized } from "../../utils/response/responseCode"
import GeneralError from "./general-error"

class UnauthorizeException extends GeneralError {
  constructor(message) {
    super()
    this.message = message || 'Unauthenticated.'
    this.status = unAuthorized
  }
}

export default UnauthorizeException
