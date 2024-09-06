import { NextFunction, Response } from "express";
import { AppRequestType, IPostSetUserCoins } from "../types";
import { CoinService } from "../services/coinService";

const getUserCoinsScore = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const currentCoins = await CoinService.getUserCoins(userId);

  return res.status(200).json(currentCoins);
};

const getTrackerData = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const coinHistory = await CoinService.getCoinsHistory(userId);

  return res.status(200).json(coinHistory);
};

const setUserCoins = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const coinsData = req.body as IPostSetUserCoins;
  const { coins } = await CoinService.setUserCoins(userId, coinsData);
  return res.status(200).json({ coins });
};

export { getUserCoinsScore, getTrackerData, setUserCoins };
