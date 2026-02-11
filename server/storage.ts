import { sajuLogs, type SajuLog, type InsertSajuLog } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSajuLog(log: InsertSajuLog): Promise<SajuLog>;
  getSajuLog(id: number): Promise<SajuLog | undefined>;
}

export class MemStorage implements IStorage {
  async createSajuLog(log: InsertSajuLog): Promise<SajuLog> {
    const [newLog] = await db.insert(sajuLogs).values(log).returning();
    return newLog;
  }

  async getSajuLog(id: number): Promise<SajuLog | undefined> {
    const [log] = await db.select().from(sajuLogs).where(eq(sajuLogs.id, id));
    return log;
  }
}

export const storage = new MemStorage();
