import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { env } from "process";
// import swaggerUi from "swagger-ui-express";
// import basicAuth from "express-basic-auth";
import "../prisma/client";
import { ErrorType } from "./types";
import { rateLimit } from "express-rate-limit";
// import swaggerDocument from "./docs/swagger.json";
import { authRoute, coinRoute, contestRoute, userRoute } from "./routes";
import { categoryRoute } from "./routes/categoryRoute";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

dotenv.config();

const app = express();

app.use(limiter);
app.use(cors());
app.use(bodyParser.json());
app.set("trust proxy", 1);

// const swaggerAuth = basicAuth({
//   users: { [env.SWAGGER_ADMIN_USERNAME]: env.SWAGGER_ADMIN_PASSWORD },
//   challenge: true,
// });

// app.use(
//   "/api-docs",
//   swaggerAuth,
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)
// );

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/contest", contestRoute);
app.use("/api/v1/coin", coinRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/", (req, res) => {
  res.status(100).json({ done: "done" });
});

app.get("/x-forwarded-for", (request, response) =>
  response.send(request.headers["x-forwarded-for"])
);

app.use((error: ErrorType, req: Request, res: Response, next: NextFunction) => {
  res
    .status(error.statusCode ?? 500)
    .send({ error: error.message, status: error.statusCode });
});

app.listen(+env.PORT);
