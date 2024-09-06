import { Request } from "express";

interface ErrorType extends Error {
  statusCode?: number;
}
interface AppRequestType extends Request {
  userId?: string;
  requestId?: string;
}

type ContestType = "ALL" | "CRICKET" | "TECH";

export { ErrorType, AppRequestType, ContestType };
