import expressJoiValidation from "express-joi-validation";

const validator = expressJoiValidation.createValidator({
  passError: true,
})

export default validator
