import { internalServerError, validationError } from '../../utils/response/responseCode'
import GeneralError from '../exceptions/general-error'

const error = (error, req, res, next) => {
  if (error instanceof GeneralError) {
    return res.status(error.status).json({ message: error.message })
  }

  if (error && error.error && error.error.isJoi) {
    return res.status(validationError).json({
      message: error.error.details[0].message,
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    return res.status(internalServerError).json({
      message: error.message,
      stack: error.stack,
    })
  }

  return res.status(internalServerError).json({
    message: 'Internal Server Error',
  })
}

module.exports = error
