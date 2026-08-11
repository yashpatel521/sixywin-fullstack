import { pgTable, uuid, text, timestamp, boolean, numeric } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Users Table Schema
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  avatarUrl: text('avatar_url'),
  sixyCoinsBalance: numeric('sixy_coins_balance', { precision: 18, scale: 2 }).default('10000.00').notNull(),
  vipLevel: text('vip_level').default('BRONZE').notNull(),
  referralCode: text('referral_code').unique(),
  referredBy: text('referred_by'),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Real 6/49 Lottery Tickets Table Schema
export const lotteryTickets = pgTable('lottery_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  ticketCode: text('ticket_code').notNull(),
  numbers: text('numbers').notNull(), // Comma separated, e.g. "6,7,14,21,42,49"
  cost: numeric('cost', { precision: 18, scale: 2 }).default('200.00').notNull(),
  status: text('status').default('PENDING').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type LotteryTicket = InferSelectModel<typeof lotteryTickets>;
export type NewLotteryTicket = InferInsertModel<typeof lotteryTickets>;
