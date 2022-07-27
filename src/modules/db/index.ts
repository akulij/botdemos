import { Context } from "telegraf";
import * as prisma from "./prisma";

export type User = { name: string };

export function getUserFromCtx(ctx: Context) {
  return { name: ctx.message.from.username } as User;
}
export const getUserBalance = prisma.getUserBalance;
export const getUserServersOnline = prisma.getUserServersOnline;
export const getUserServersTotal = prisma.getUserServersTotal;
