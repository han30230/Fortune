import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sajuLogs = pgTable("saju_logs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birthDate: text("birth_date").notNull(), // ISO date string YYYY-MM-DD
  birthTime: text("birth_time").notNull(), // HH:mm
  gender: text("gender").notNull(), // 'male' | 'female'
  calendarType: text("calendar_type").notNull(), // 'solar' | 'lunar'
  pillars: jsonb("pillars").notNull(), // Store the 4 pillars data
  interpretation: text("interpretation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSajuLogSchema = createInsertSchema(sajuLogs).omit({
  id: true,
  createdAt: true,
  interpretation: true,
  pillars: true // Calculated on server
});

export type SajuLog = typeof sajuLogs.$inferSelect;
export type InsertSajuLog = z.infer<typeof insertSajuLogSchema>;

// API Request/Response
export const analyzeSajuSchema = insertSajuLogSchema;
export type AnalyzeSajuRequest = z.infer<typeof analyzeSajuSchema>;

export interface Pillar {
  gan: string; // Heavenly Stem (Hanja)
  zhi: string; // Earthly Branch (Hanja)
  ganKorean: string;
  zhiKorean: string;
}

export interface SajuResult {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

export interface AnalyzeSajuResponse {
  pillars: SajuResult;
  interpretation: string;
}
