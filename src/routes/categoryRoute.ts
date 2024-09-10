import { Router } from "express";
import { getCategories } from "../controllers";

const categoryRoute = Router();

categoryRoute.get("/get_categories", getCategories);

export { categoryRoute };
