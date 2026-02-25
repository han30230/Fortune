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

// 운세 종류
export const fortuneTypeOptions = [
  { value: "today", label: "오늘의 운세" },
  { value: "monthly", label: "이달의 운세" },
  { value: "newyear", label: "신년 운세" },
  { value: "career_wealth", label: "직업/재물운" },
  { value: "compatibility", label: "궁합" },
] as const;

export const fortuneTypeEnum = ["today", "monthly", "newyear", "career_wealth", "compatibility"] as const;

// 사주 분석 API용 스키마 (SajuForm, use-saju 등에서 사용)
export const analyzeSajuSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  birthTime: z.string(),
  gender: z.string(),
  calendarType: z.string(),
  fortuneType: z.enum(fortuneTypeEnum).optional(),
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
