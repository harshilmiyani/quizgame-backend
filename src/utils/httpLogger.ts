import { Response } from "express";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { AppRequestType } from "../types";

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";

export const formatHTTPLoggerResponse = (
  req: AppRequestType,
  res: Response,
  responseBody: any // object or array sent with res.send()
) => {
  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
      clientIp: req?.socket.remoteAddress,
      requestId: req?.requestId,
      userId: req?.userId,
    },
    response: {
      headers: res ? res.getHeaders() : null,
      statusCode: res ? res.statusCode : null,
      body: responseBody,
    },
  };
};

// Logger for API endpoints
export const httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        data,
      };
      return JSON.stringify(response);
    })
  ),
  transports: [
    new DailyRotateFile({
      // each file name includes current date
      filename: "logs/rotating-logs-%DATE%.log",
      datePattern: "MMMM-DD-YYYY",
      zippedArchive: false, // zip logs true/false
      maxSize: "50m", // rotate if file size exceeds 20 MB
      maxFiles: "21d", // max files
    }),
  ],
});
