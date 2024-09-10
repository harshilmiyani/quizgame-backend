import { NextFunction, Response } from "express";
import { AppRequestType } from "../types";
import { CategoryService } from "../services";

const getCategories = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  const allCategories = await CategoryService.getCategory();

  const response = { categories: allCategories };
  return res.status(200).json(response);
};

export { getCategories };
