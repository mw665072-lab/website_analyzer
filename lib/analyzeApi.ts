import axios from "axios";

export interface AnalyzePayload {
  url: string;
  options?: Record<string, any>;
}

export interface AnalyzeResponse {
  // Define expected response shape here
  [key: string]: any;
}

export const analyzeWebsite = async (payload: AnalyzePayload) => {
  const response = await axios.post<AnalyzeResponse>(
    "https://website-analyzer-backend-one.vercel.app/api/analyze",
    payload
  );
  return response.data;
};
