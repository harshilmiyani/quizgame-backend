import { check } from "express-validator";
import { AppStrings } from "../utils";

const baseEmailCheckValidation = check("email", AppStrings.invalidEmail)
  .isString()
  .notEmpty()
  .trim()
  .isEmail();

export const socialAuthValidator = [baseEmailCheckValidation.optional()];

export const accessTokenValidator = [
  check("refreshToken", AppStrings.invalidRefreshToken)
    .isString()
    .notEmpty()
    .trim(),
];
