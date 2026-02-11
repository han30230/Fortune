import { z } from 'zod';
import { analyzeSajuSchema } from './schema';

export const api = {
  saju: {
    analyze: {
      method: 'POST' as const,
      path: '/api/saju/analyze' as const,
      input: analyzeSajuSchema,
      responses: {
        200: z.object({
          pillars: z.object({
            year: z.object({ gan: z.string(), zhi: z.string(), ganKorean: z.string(), zhiKorean: z.string() }),
            month: z.object({ gan: z.string(), zhi: z.string(), ganKorean: z.string(), zhiKorean: z.string() }),
            day: z.object({ gan: z.string(), zhi: z.string(), ganKorean: z.string(), zhiKorean: z.string() }),
            hour: z.object({ gan: z.string(), zhi: z.string(), ganKorean: z.string(), zhiKorean: z.string() }),
          }),
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
