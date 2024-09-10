import { NextFunction, Response } from "express";
import {
  AppRequestType,
  IPostGetContestById,
  IPostSetNewContest,
} from "../types";
import { Contest } from "../services";
import { validatorErrorsHandler } from "../utils";

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

const setNewContest = async (
  req: AppRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    validatorErrorsHandler(req);
    const contestData = req.body as IPostSetNewContest;
    const contest = await Contest.setNewContest(contestData);
    return res.status(200).json(contest);
  } catch (error) {
    next(error);
  }
};

export { getContests, getContestQue, setNewContest };
