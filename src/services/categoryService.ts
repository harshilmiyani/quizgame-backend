import { prisma } from "../../prisma/client";
import { parseStatusError } from "../utils";
class CategoryService {
  static getCategory = async () => {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      throw parseStatusError(error.message, error.statusCode);
    }
  };
}

export { CategoryService };
