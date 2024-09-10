import { NextFunction, Response } from "express";
import {
  AppRequestType,
  IPostAccessTokenPayload,
  IPostSocialAuthPayload,
} from "../types";
import { AppStrings, parseStatusError, validatorErrorsHandler } from "../utils";
import { AuthService, UserService } from "../services";

const postSocialAuth = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    validatorErrorsHandler(req);
    const { email, name, fcm_id, firebase_id, profile, coins } =
      req.body as IPostSocialAuthPayload;
    let foundedUser = null;
    if (email) {
      foundedUser = await UserService.findUserByEmail(email);
    }
    if (foundedUser) {
      const { authToken, refreshToken } = await AuthService.generateAuthTokens(
        foundedUser.email,
        foundedUser.id
      );
      const responsePayload = {
        data: {
          ...foundedUser,
          api_token: authToken,
          refreshToken,
          status: "1",
        },
        api_token: authToken,
        refreshToken,
      };
      res.status(200).json(responsePayload);
    } else {
      const user = await UserService.createUser({
        coins: Number(coins),
        email,
        name: email,
        fcm_id: fcm_id ?? "",
        firebase_id: firebase_id ?? "",
        profile: profile ?? "",
      });
      const { authToken, refreshToken } = await AuthService.generateAuthTokens(
        user.email,
        user.id
      );

      const responsePayload = {
        data: {
          ...user,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          api_token: authToken,
          refreshToken,
          status: "1",
        },
      };
      res.status(200).json(responsePayload);
    }
  } catch (error) {
    next(error);
  }
};

const postAccessToken = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    validatorErrorsHandler(req);
    const { refreshToken } = req.body as IPostAccessTokenPayload;
    const tokenData = AuthService.verifyJWTToken(refreshToken);
    if (!tokenData) {
      throw parseStatusError(AppStrings.TOKEN_EXPIRED, 401);
    }
    if (typeof tokenData !== "string" && tokenData?.type === "refresh") {
      const { authToken, refreshToken } = await AuthService.generateAuthTokens(
        tokenData?.email,
        tokenData?.userId
      );
      res.status(200).json({ authToken, refreshToken });
    } else {
      throw parseStatusError(AppStrings.invalidRefreshToken, 400);
    }
  } catch (error) {
    next(error);
  }
};

export { postSocialAuth, postAccessToken };
