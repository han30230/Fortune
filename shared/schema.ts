import { pgTable, text, serial, timestamp, doublePrecision, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const exchanges = pgTable("exchanges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  country: text("country").notNull(),
  logo: text("logo"),
});

export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  exchangeId: integer("exchange_id").references(() => exchanges.id),
  price: doublePrecision("price").notNull(),
  currency: text("currency").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  userId: text("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sajuLogs = pgTable("saju_logs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birthDate: text("birth_date").notNull(),
  birthTime: text("birth_time").notNull(),
  gender: text("gender").notNull(),
  calendarType: text("calendar_type").notNull(),
  pillars: jsonb("pillars").notNull(), 
  interpretation: text("interpretation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExchangeSchema = createInsertSchema(exchanges).omit({ id: true });
export const insertPriceSchema = createInsertSchema(prices).omit({ id: true, updatedAt: true });
export const insertFavoriteSchema = createInsertSchema(favorites).omit({ id: true, createdAt: true });

// 사주 분석 API용 스키마 (SajuForm, use-saju 등에서 사용)
export const analyzeSajuSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  birthTime: z.string(),
  gender: z.string(),
  calendarType: z.string(),
});
export const analyzeSajuResponseSchema = z.object({
  pillars: z.any(),
  interpretation: z.string(),
});

export type Exchange = typeof exchanges.$inferSelect;
export type Price = typeof prices.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type SajuLog = typeof sajuLogs.$inferSelect;
export type AnalyzeSajuRequest = z.infer<typeof analyzeSajuSchema>;
export type AnalyzeSajuResponse = z.infer<typeof analyzeSajuResponseSchema>;

/** 사주 기둥 한 개 (PillarCard에서 사용) */
export type Pillar = {
  gan: string;
  ganKorean: string;
  zhi: string;
  zhiKorean: string;
};
