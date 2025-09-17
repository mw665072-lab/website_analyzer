import { useMutation } from "@tanstack/react-query";
import { analyzeWebsite, AnalyzePayload, AnalyzeResponse } from "@/lib/analyzeApi";

export function useAnalyzeWebsite() {
  return useMutation<AnalyzeResponse, Error, AnalyzePayload>({
    mutationFn: analyzeWebsite,
  });
}
