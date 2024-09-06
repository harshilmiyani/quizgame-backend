import {
  formatHTTPLoggerResponse,
  httpLogger,
  parseStatusError,
} from "../utils";
import { LOG_ERROR } from "../constants";
import { prisma } from "../../prisma/client";

class Contest {
  static listContests = async () => {
    try {
      const allContest = await prisma.contest.findMany({
        select: {
          id: true,
          contestsName: true,
          description: true,
          end_date: true,
          categoryName: true,
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
}

export { Contest };
