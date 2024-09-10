import { check } from "express-validator";
import { AppStrings } from "../utils";

export const setUserCoinsValidator = [
  check("coins", AppStrings.invalidCoins).notEmpty().isNumeric(),
  check("title", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("status", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("date", AppStrings.invalidCoins).isString().notEmpty().trim(),
];
