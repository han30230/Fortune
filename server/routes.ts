import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { calculateSaju } from '@fullstackfamily/manseryeok';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.saju.analyze.path, async (req, res) => {
    try {
      const input = api.saju.analyze.input.parse(req.body);

      // 1. Calculate Pillars using library
      const year = parseInt(input.birthDate.split('-')[0]);
      const month = parseInt(input.birthDate.split('-')[1]);
      const day = parseInt(input.birthDate.split('-')[2]);
      const [hourStr, minuteStr] = input.birthTime.split(':');
      const hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);

      const saju = calculateSaju(year, month, day, hour, minute);

      // 2. Format Pillars
      const pillars = {
        year: {
          gan: saju.yearPillarHanja.charAt(0),
          zhi: saju.yearPillarHanja.charAt(1),
          ganKorean: saju.yearPillar.charAt(0),
          zhiKorean: saju.yearPillar.charAt(1),
        },
        month: {
          gan: saju.monthPillarHanja.charAt(0),
          zhi: saju.monthPillarHanja.charAt(1),
          ganKorean: saju.monthPillar.charAt(0),
          zhiKorean: saju.monthPillar.charAt(1),
        },
        day: {
          gan: saju.dayPillarHanja.charAt(0),
          zhi: saju.dayPillarHanja.charAt(1),
          ganKorean: saju.dayPillar.charAt(0),
          zhiKorean: saju.dayPillar.charAt(1),
        },
        hour: {
          gan: saju.hourPillarHanja.charAt(0),
          zhi: saju.hourPillarHanja.charAt(1),
          ganKorean: saju.hourPillar.charAt(0),
          zhiKorean: saju.hourPillar.charAt(1),
        },
      };

      // 3. Generate AI Interpretation
      const prompt = `
      Analyze the following Saju (Four Pillars of Destiny) for a ${input.gender} born on ${input.birthDate} ${input.birthTime} (${input.calendarType}):
      
      Year Pillar: ${pillars.year.gan}${pillars.year.zhi} (${pillars.year.ganKorean}${pillars.year.zhiKorean})
      Month Pillar: ${pillars.month.gan}${pillars.month.zhi} (${pillars.month.ganKorean}${pillars.month.zhiKorean})
      Day Pillar: ${pillars.day.gan}${pillars.day.zhi} (${pillars.day.ganKorean}${pillars.day.zhiKorean})
      Hour Pillar: ${pillars.hour.gan}${pillars.hour.zhi} (${pillars.hour.ganKorean}${pillars.hour.zhiKorean})

      Please provide a comprehensive and mystical but modern interpretation covering:
      1. General Personality (성격)
      2. Career & Talents (직업 및 재능)
      3. Wealth Fortune (재물운)
      4. Advice for the future (조언)

      Write in Korean. Use markdown formatting. Be polite and encouraging.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }],
      });

      const interpretation = completion.choices[0].message.content || "Failed to generate interpretation.";

      // 4. Save to DB (optional, but good for history)
      await storage.createSajuLog({
        ...input,
        pillars,
        interpretation
      });

      // 5. Respond
      res.json({
        pillars,
        interpretation
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Saju analysis error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
