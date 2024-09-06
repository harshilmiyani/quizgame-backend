import { Router } from "express";
import {
  getContestQue,
  getTrackerData,
  getUserCoinsScore,
  setUserCoins,
} from "../controllers";
import { isAuth } from "../middleware";

const coinRoutes = Router();

coinRoutes.get("/get_user_coin_score", isAuth, getUserCoinsScore);

coinRoutes.get("/get_tracker_data", isAuth, getTrackerData);

coinRoutes.post("/set_user_coin_score", isAuth, setUserCoins);

export { coinRoutes };
