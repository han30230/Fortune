import { pgTable, text, serial, timestamp, doublePrecision, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Cryptocurrency exchanges
export const exchanges = pgTable("exchanges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // e.g., "Upbit", "Binance"
  country: text("country").notNull(), // "KR" or "Global"
  logo: text("logo"),
});

// Cryptocurrency price data (for premium calculation)
export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(), // e.g., "BTC", "ETH"
  exchangeId: integer("exchange_id").references(() => exchanges.id),
  price: doublePrecision("price").notNull(),
  currency: text("currency").notNull(), // "KRW", "USDT"
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User favorites for tracking specific coin premiums
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  userId: text("user_id"), // Optional if we use Replit Auth later
  createdAt: timestamp("created_at").defaultNow(),
});

// Saju logs (keeping existing functionality but it's secondary now)
export const sajuLogs = pgTable("saju_logs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birthDate: text("birth_date").notNull(),
  birthTime: text("birth_time").notNull(),
  gender: text("gender").notNull(),
  calendarType: text("calendar_type").notNull(),
  pillars: text("pillars").notNull(), 
  interpretation: text("interpretation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExchangeSchema = createInsertSchema(exchanges).omit({ id: true });
export const insertPriceSchema = createInsertSchema(prices).omit({ id: true, updatedAt: true });
export const insertFavoriteSchema = createInsertSchema(favorites).omit({ id: true, createdAt: true });

export type Exchange = typeof exchanges.$inferSelect;
export type Price = typeof prices.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
