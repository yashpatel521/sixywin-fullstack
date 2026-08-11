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
  numbers: text('numbers').notNull(),
  cost: numeric('cost', { precision: 18, scale: 2 }).default('200.00').notNull(),
  status: text('status').default('PENDING').notNull(),
  payoutAmount: numeric('payout_amount', { precision: 18, scale: 2 }).default('0.00').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 24-Hour Automated Lottery Draws History Table Schema
export const lotteryDraws = pgTable('lottery_draws', {
  id: uuid('id').defaultRandom().primaryKey(),
  drawCode: text('draw_code').notNull().unique(),
  winningNumbers: text('winning_numbers').notNull(),
  bonusBall: text('bonus_ball').notNull(),
  jackpotPool: numeric('jackpot_pool', { precision: 18, scale: 2 }).default('1250000.00').notNull(),
  totalWinners: text('total_winners').default('0').notNull(),
  seedHash: text('seed_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Contact Us Submissions Table Schema
export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type LotteryTicket = InferSelectModel<typeof lotteryTickets>;
export type NewLotteryTicket = InferInsertModel<typeof lotteryTickets>;
export type LotteryDraw = InferSelectModel<typeof lotteryDraws>;
export type NewLotteryDraw = InferInsertModel<typeof lotteryDraws>;
export type ContactMessage = InferSelectModel<typeof contactMessages>;
export type NewContactMessage = InferInsertModel<typeof contactMessages>;
