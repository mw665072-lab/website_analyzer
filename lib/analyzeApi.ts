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
    "http://localhost:7000/api/analyze",
    payload
  );
  return response.data;
};

export const redirectCheck = async (payload: { url: string }) => {
  // Post to local redirect-check endpoint used by the developer environment
  const response = await axios.post<AnalyzeResponse>(
    "http://localhost:7000/api/redirect-check",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const websiteSeo = async (payload: { url: string }) => {
  // Post to local website-seo endpoint used by the developer environment
  const response = await axios.post<AnalyzeResponse>(
    "http://localhost:7000/api/website-seo",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

