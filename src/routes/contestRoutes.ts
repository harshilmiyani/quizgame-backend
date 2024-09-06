import { Router } from "express";
import { isAuth } from "../middleware";
import { getContests, getContestQue } from "../controllers";

const contestRoutes = Router();

contestRoutes.get("/get_contest", getContests);

contestRoutes.post("/get_questions_by_contest", isAuth, getContestQue);

export { contestRoutes };
