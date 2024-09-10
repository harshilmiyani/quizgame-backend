import { Router } from "express";
import { accessTokenValidator, socialAuthValidator } from "../validators";
import { postAccessToken, postSocialAuth } from "../controllers";

const authRoute = Router();

authRoute.post("/user_login", socialAuthValidator, postSocialAuth);

authRoute.post("/access-token", accessTokenValidator, postAccessToken);

export { authRoute };
