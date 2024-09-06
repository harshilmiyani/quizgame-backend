import { NextFunction, Response } from "express";
import { AppRequestType, IPostGetContestById } from "../types";
import { Contest } from "../services";

const getContests = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const contest = await Contest.listContests();
    return res.status(200).json(contest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getContestQue = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contest_id } = req.body as IPostGetContestById;
    const contest = await Contest.getContestById({ contestId: contest_id });
    return res.status(200).json(contest);
  } catch (error) {
    next(error);
  }
};

export { getContests, getContestQue };
