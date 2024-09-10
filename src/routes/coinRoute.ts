import { Router } from "express";
import {
  getContestQue,
  getTrackerData,
  getUserCoinsScore,
  setUserCoins,
} from "../controllers";
import { isAuth } from "../middleware";
import { setUserCoinsValidator } from "../validators";

const coinRoute = Router();

coinRoute.get("/get_user_coin_score", isAuth, getUserCoinsScore);

coinRoute.get("/get_tracker_data", isAuth, getTrackerData);

coinRoute.post(
  "/set_user_coin_score",
  setUserCoinsValidator,
  isAuth,
  setUserCoins
);

export { coinRoute };
