import { body, validationResult } from "express-validator";
export const validate = (Validation) => {
  return async (req, res, next) => {
    for (let validate of Validation) {
      const result = await validate.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};
export const LoginValidator = [
  body("email").trim().notEmpty().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password is required"),
];
export const SignupVaidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  ...LoginValidator,
];
