import { check } from "express-validator";
import { AppStrings } from "../utils";

export const getContestQueValidator = [
  check("contest_id", AppStrings.somethingWentWrong)
    .isString()
    .notEmpty()
    .trim(),
];

export const setNewContestValidator = [
  check("contestName", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("description", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("end_date", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("categoryId", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("image", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("image", AppStrings.invalidCoins).isString().notEmpty().trim(),
  check("isLive", AppStrings.invalidCoins).isBoolean().notEmpty(),
  check("entryCoins", AppStrings.invalidCoins).isNumeric().notEmpty(),
  check("participants", AppStrings.invalidCoins).isNumeric().notEmpty(),
  check("winnerAnnouncement", AppStrings.invalidCoins)
    .isString()
    .notEmpty()
    .trim(),
  check("winnerCoinsPrize", AppStrings.invalidCoins).isNumeric().notEmpty(),
];
