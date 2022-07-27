import { Context } from 'telegraf';
import * as prisma from './prisma';
import { User } from './types';

export function getUserFromCtx(ctx: Context) {
  return { name: ctx.message.from.username } as User;
}
export const { getUserBalance } = prisma;
export const { getUserServersOnline } = prisma;
export const { getUserServersTotal } = prisma;
