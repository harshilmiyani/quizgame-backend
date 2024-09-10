import { Router } from "express";
import { getContests, getContestQue, setNewContest } from "../controllers";
import { getContestQueValidator, setNewContestValidator } from "../validators";

const contestRoute = Router();

contestRoute.get("/get_contest", getContests);

contestRoute.post(
  "/get_questions_by_contest",
  getContestQueValidator,
  getContestQue
);

contestRoute.post("/set_new_contest", setNewContestValidator, setNewContest);

export { contestRoute };
