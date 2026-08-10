import { pgTable, uuid, varchar, integer, timestamp, numeric, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  walletBalance: integer('wallet_balance').default(10000).notNull(),
  avatarUrl: text('avatar_url'),
  totalWins: integer('total_wins').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const gameTransactions = pgTable('game_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  gameId: varchar('game_id', { length: 50 }).notNull(),
  betAmount: integer('bet_amount').notNull(),
  payoutAmount: integer('payout_amount').notNull(),
  multiplier: numeric('multiplier', { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const jackpotPools = pgTable('jackpot_pools', {
  id: varchar('id', { length: 50 }).primaryKey(),
  gameCategory: varchar('game_category', { length: 50 }).notNull(),
  currentAmount: integer('current_amount').default(250000).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
