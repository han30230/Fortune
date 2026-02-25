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
        let message = errorText || "운세 조회에 실패했습니다.";
        try {
          const json = JSON.parse(errorText);
          if (json.message) message = json.message;
        } catch (_) {}
        throw new Error(message);
      }

      const json = await res.json();
      // Validate response using the shared Zod schema
      return api.saju.analyze.responses[200].parse(json);
    },
  });
}
