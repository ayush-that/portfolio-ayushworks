import { PrismaClient } from "@prisma/client";
import { env } from "~/constants/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: env.POSTGRES_PRISMA_URL,
      },
    },
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
