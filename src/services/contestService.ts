import { parseStatusError, encryptString } from "../utils";
import { prisma } from "../../prisma/client";
import { IPostSetNewContest } from "../types";

class Contest {
  static listContests = async () => {
    try {
      const allContest = await prisma.contest.findMany({
        select: {
          id: true,
          contestName: true,
          description: true,
          end_date: true,
          category: true,
          isLive: true,
          entryCoins: true,
          participants: true,
          winnerAnnouncement: true,
          winnerCoinsPrize: true,
          image: true,
        },
      });
      return allContest;
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static getContestById = async ({ contestId }: { contestId: string }) => {
    try {
      const contest = await prisma.contest.findFirst({
        where: { id: contestId },
        select: { quizQuestions: true },
      });
      return contest.quizQuestions;
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static setNewContest = async ({
    contestName,
    description,
    end_date,
    entryCoins,
    image,
    isLive,
    participants,
    quizQuestions,
    winnerAnnouncement,
    winnerCoinsPrize,
    categoryId,
  }: IPostSetNewContest) => {
    try {
      let allQuizQue = quizQuestions.map((q) => {
        const encryptAnswer = encryptString(q.answer);
        return { ...q, answer: encryptAnswer };
      });
      const contest = await prisma.contest.create({
        data: {
          contestName,
          description,
          end_date,
          entryCoins,
          image,
          isLive,
          participants,
          winnerAnnouncement,
          winnerCoinsPrize,
          quizQuestions: allQuizQue,
          categoryId,
        },
      });
      return contest;
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };
}

export { Contest };
