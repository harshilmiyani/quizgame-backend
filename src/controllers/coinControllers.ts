import { NextFunction, Response } from "express";
import { AppRequestType, IPostSetUserCoins } from "../types";
import { CoinService } from "../services/coinService";
import { validatorErrorsHandler } from "../utils";

const getUserCoinsScore = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const currentCoins = await CoinService.getUserCoins(userId);

    return res.status(200).json(currentCoins);
  } catch (error) {
    next(error);
  }
};

const getTrackerData = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const coinHistory = await CoinService.getCoinsHistory(userId);

    return res.status(200).json(coinHistory);
  } catch (error) {
    next(error);
  }
};

const setUserCoins = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    validatorErrorsHandler(req);

    const userId = req.userId;
    const coinsData = req.body as IPostSetUserCoins;
    const { coins } = await CoinService.setUserCoins(userId, coinsData);
    return res.status(200).json({ coins: Number(coins) });
  } catch (error) {
    next(error);
  }
};

export { getUserCoinsScore, getTrackerData, setUserCoins };
