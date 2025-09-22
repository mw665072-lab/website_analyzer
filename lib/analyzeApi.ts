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

export const redirectCheck = async (payload: { url: string }) => {
  // Post to local redirect-check endpoint used by the developer environment
  const response = await axios.post<AnalyzeResponse>(
    "https://website-analyzer-backend-one.vercel.app/api/redirect-check",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
