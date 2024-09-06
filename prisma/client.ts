import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log("Failed to connect to DB", e);
  });
