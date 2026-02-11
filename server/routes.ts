import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

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

  return httpServer;
}
