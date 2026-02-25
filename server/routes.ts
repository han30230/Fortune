import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { calculateSaju, lunarToSolar } from "@fullstackfamily/manseryeok";
import type { Pillar } from "@shared/schema";

function toPillar(korean: string, hanja: string): Pillar {
  return {
    gan: hanja.charAt(0) || "",
    ganKorean: korean.charAt(0) || "",
    zhi: hanja.charAt(1) || "",
    zhiKorean: korean.charAt(1) || "",
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Mock Kimchi Premium Data
  app.get(api.crypto.premiums.path, async (req, res) => {
    const mockData = [
      { symbol: "BTC", name: "비트코인", domesticPrice: 142000000, globalPrice: 94500, premium: 1.25, change24h: 2.5, volume24h: 450000000000 },
      { symbol: "ETH", name: "이더리움", domesticPrice: 3850000, globalPrice: 2580, premium: 1.12, change24h: -1.2, volume24h: 120000000000 },
      { symbol: "SOL", name: "솔라나", domesticPrice: 285000, globalPrice: 190, premium: 1.5, change24h: 5.4, volume24h: 85000000000 },
      { symbol: "XRP", name: "리플", domesticPrice: 3800, globalPrice: 2.55, premium: 0.9, change24h: 0.8, volume24h: 150000000000 },
    ];
    res.json(mockData);
  });

  // 사주 분석 API
  app.post(api.saju.analyze.path, async (req, res) => {
    try {
      const { name, birthDate, birthTime, gender, calendarType } = req.body as {
        name: string;
        birthDate: string;
        birthTime: string;
        gender: string;
        calendarType: string;
      };

      const [y, m, d] = birthDate.split("-").map(Number);
      const [hour = 12, minute = 0] = (birthTime || "12:00").split(":").map(Number);

      let solarYear = y,
        solarMonth = m,
        solarDay = d;
      if (calendarType === "lunar") {
        const converted = lunarToSolar(y, m, d, false);
        solarYear = converted.solar.year;
        solarMonth = converted.solar.month;
        solarDay = converted.solar.day;
      }

      const saju = calculateSaju(solarYear, solarMonth, solarDay, hour, minute);

      const pillars = {
        year: toPillar(saju.yearPillar, saju.yearPillarHanja),
        month: toPillar(saju.monthPillar, saju.monthPillarHanja),
        day: toPillar(saju.dayPillar, saju.dayPillarHanja),
        hour: toPillar(saju.hourPillar, saju.hourPillarHanja),
      };

      const interpretation = [
        `**${name}**님의 사주팔자입니다.`,
        "",
        `- **년주(年柱)**: ${saju.yearPillarHanja} ${saju.yearPillar}`,
        `- **월주(月柱)**: ${saju.monthPillarHanja} ${saju.monthPillar}`,
        `- **일주(日柱)**: ${saju.dayPillarHanja} ${saju.dayPillar}`,
        `- **시주(時柱)**: ${saju.hourPillarHanja} ${saju.hourPillar}`,
        "",
        "동양의 전통 사주학에 따르면, 사주팔자는 태어난 시공간의 기운이 인생의 흐름에 영향을 준다고 봅니다. 위 네 기둥을 바탕으로 오늘의 운세, 이달의 운세, 신년 운세 등을 살펴보실 수 있습니다.",
      ].join("\n");

      res.json({ pillars, interpretation });
    } catch (err) {
      console.error("saju analyze error:", err);
      res.status(400).json({
        message: err instanceof Error ? err.message : "사주 계산 중 오류가 발생했습니다.",
      });
    }
  });

  return httpServer;
}
