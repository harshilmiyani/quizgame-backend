import { parseStatusError } from "../utils";
import jwt from "jsonwebtoken";
import { env } from "process";

class AuthService {
  static generateNewJWT = async (payload: object, expiresIn: string) => {
    try {
      return jwt.sign(payload, env.JWT_SECRET_KEY!, { expiresIn });
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static generateAuthTokens = async (email: string, id: string) => {
    try {
      const authtokenPayload = { email, userId: id, type: "access" };
      const refreshtokenPayload = { email, userId: id, type: "refresh" };

      const authToken = await this.generateNewJWT(authtokenPayload, "7d");
      const refreshToken = await this.generateNewJWT(
        refreshtokenPayload,
        "28d"
      );
      return { authToken, refreshToken };
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };

  static verifyJWTToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET_KEY!);
  };
}

export { AuthService };
