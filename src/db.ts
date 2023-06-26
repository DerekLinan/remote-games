/**
 * Singleton to prevent development issues caused by new connections and hot reloading in nextjs.
 * @link https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#:~:text=The%20solution%20in%20this%20case%20is%20to%20instantiate,already%20present%20to%20prevent%20instantiating%20extra%20PrismaClient%20instances.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
