import { PrismaClient } from '@prisma/client';
import { User } from './types';

const prisma = new PrismaClient();

async function getUserInfoPrisma(user: User) {
  const userdb = await prisma.user.findFirst({
    where: {
      name: user.name,
    },
  });
  if (!userdb) {
    await prisma.user.create({
      data: {
        name: user.name,
        balance: 0,
      },
    });
  }
  return userdb;
}

export async function getUserBalance(user: User) {
  const userPrisma = await getUserInfoPrisma(user);
  return userPrisma.balance;
}

export async function getUserServersTotal(user: User) {
  const userPrisma = await getUserInfoPrisma(user);
  const serversCount = await prisma.server.count({
    where: {
      User: userPrisma,
    },
  });
  return serversCount;
}

export async function getUserServersOnline(user: User) {
  // unimplemented normally from MVP
  const serversOnlineCount = await getUserServersTotal(user);
  return serversOnlineCount;
}
