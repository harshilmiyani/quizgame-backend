import { Router } from "express";
import { accessTokenValidator, socialAuthValidator } from "../validators";
import { postAccessToken, postSocialAuth } from "../controllers";

const authRoutes = Router();

authRoutes.post("/user_login", socialAuthValidator, postSocialAuth);

authRoutes.post("/access-token", accessTokenValidator, postAccessToken);

export { authRoutes };
