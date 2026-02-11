import { useMutation } from "@tanstack/react-query";
import { api, type AnalyzeSajuRequest, type AnalyzeSajuResponse } from "@shared/routes";

// POST /api/saju/analyze
export function useAnalyzeSaju() {
  return useMutation<AnalyzeSajuResponse, Error, AnalyzeSajuRequest>({
    mutationFn: async (data) => {
      // Validate input using the shared Zod schema before sending
      const validatedData = api.saju.analyze.input.parse(data);

      const res = await fetch(api.saju.analyze.path, {
        method: api.saju.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to analyze Saju");
      }

      const json = await res.json();
      // Validate response using the shared Zod schema
      return api.saju.analyze.responses[200].parse(json);
    },
  });
}
