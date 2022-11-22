

import { notFound } from "../../utils/response/responseCode"
import GeneralError from "./general-error"

class NotFoundException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = notFound
  }
}

export default NotFoundException


