import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import { AppStrings, parseStatusError } from "../utils";
import { AppRequestType } from "../types";
import { AuthService } from "../services";

export const isAuth = (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.get("Authorization")) {
      throw parseStatusError(AppStrings.TOKEN_EXPIRED, 401);
    }

    const token = req.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw parseStatusError(AppStrings.TOKEN_EXPIRED, 401);
    }

    const tokenData = AuthService.verifyJWTToken(token);
    if (!tokenData) {
      throw parseStatusError(AppStrings.TOKEN_EXPIRED, 401);
    }

    if (typeof tokenData !== "string" && tokenData?.type !== "access") {
      throw parseStatusError(AppStrings.invalidAccessToken, 400);
    }

    if (typeof tokenData !== "string") {
      req.userId = tokenData.userId;
    }

    if (!req.userId) {
      throw parseStatusError(AppStrings.TOKEN_EXPIRED, 401);
    }

    next();
  } catch (error) {
    throw parseStatusError(AppStrings.TOKEN_EXPIRED, 401);
  }
};
