import { parseStatusError } from "../utils";
import { prisma } from "../../prisma/client";
import { IPostSetUserCoins } from "../types";

class CoinService {
  static getUserCoins = async (userId: string) => {
    try {
      const { coins } = await prisma.coin.findFirst({
        where: { userId },
        select: { coins: true },
      });
      return coins;
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static getCoinsHistory = async (userId: string) => {
    try {
      const { coinHistory } = await prisma.coin.findFirst({
        where: { userId },
        select: { coinHistory: true },
      });
      return coinHistory;
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static setUserCoins = async (
    userId: string,
    coinsData: IPostSetUserCoins
  ) => {
    try {
      let coins = 0;
      if (!isNaN(Number(coinsData.coins))) {
        coins = Number(coinsData.coins);
      }

      const finalCoinsData = await prisma.coin.update({
        where: { userId },
        select: { coins: true },
        data: { coins: { increment: coins }, coinHistory: { push: coinsData } },
      });
      return finalCoinsData;
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };
}

export { CoinService };
