import { prisma } from "../../prisma/client";
import { ICreateUserServicePayload } from "../types";
import { parseStatusError } from "../utils";

class UserService {
  static findUserByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findFirst({ where: { email } });
      if (user) {
        const userId = user.id;
        const coins = await prisma.coin.findFirst({
          where: { userId },
        });

        const finalUserData = {
          ...user,
          coins: Number(coins.coins),
        };
        return finalUserData;
      } else {
        return null;
      }
    } catch (error: any) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static findUser = async (filters: object) => {
    try {
      const user = await prisma.user.findFirst({ where: filters });
      return user;
    } catch (error: any) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static createUser = async (reqBody: ICreateUserServicePayload) => {
    try {
      const user = await prisma.user.create({
        data: {
          email: reqBody.email || "",
          name: reqBody.name || "",
          fcm_id: reqBody.fcm_id ?? "",
          firebase_id: reqBody.firebase_id ?? "",
          profile: reqBody.profile ?? "",
        },
      });
      const coins = await prisma.coin.create({
        data: {
          coins: Number(reqBody.coins),
          userId: user.id,
        },
      });

      const finalUserData = {
        ...user,
        coins: Number(coins.coins),
      };
      return finalUserData;
    } catch (error: any) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };
}

export { UserService };
