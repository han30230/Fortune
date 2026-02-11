import { z } from 'zod';
import { insertFavoriteSchema } from './schema';

export const api = {
  crypto: {
    premiums: {
      method: 'GET' as const,
      path: '/api/crypto/premiums' as const,
      responses: {
        200: z.array(z.object({
          symbol: z.string(),
          name: z.string(),
          domesticPrice: z.number(),
          globalPrice: z.number(),
          premium: z.number(),
          change24h: z.number(),
          volume24h: z.number(),
          logo: z.string().optional()
        }))
      }
    },
    favorites: {
      list: {
        method: 'GET' as const,
        path: '/api/crypto/favorites' as const,
        responses: {
          200: z.array(z.string())
        }
      },
      add: {
        method: 'POST' as const,
        path: '/api/crypto/favorites' as const,
        input: insertFavoriteSchema,
        responses: {
          201: z.object({ success: z.boolean() })
        }
      }
    }
  },
  saju: {
    analyze: {
      method: 'POST' as const,
      path: '/api/saju/analyze' as const,
      input: z.object({
        name: z.string(),
        birthDate: z.string(),
        birthTime: z.string(),
        gender: z.string(),
        calendarType: z.string(),
      }),
      responses: {
        200: z.object({
          pillars: z.any(),
          interpretation: z.string()
        })
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
