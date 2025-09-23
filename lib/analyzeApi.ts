import axios from "axios";

export interface AnalyzePayload {
  url: string;
  options?: Record<string, any>;
}

const API_BASE_URL = "https://website-analyzer-backend-one.vercel.app/api";

export interface AnalyzeResponse {
  // Define expected response shape here
  [key: string]: any;
}

export const analyzeWebsite = async (payload: AnalyzePayload) => {
  const response = await axios.post<AnalyzeResponse>(
    `${API_BASE_URL}/analyze`,
    payload
  );
  return response.data;
};

export const redirectCheck = async (payload: { url: string }) => {
  // Post to local redirect-check endpoint used by the developer environment
  const response = await axios.post<AnalyzeResponse>(
    `${API_BASE_URL}/redirect-check`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const websiteSeo = async (payload: { url: string }) => {
  // Post to local website-seo endpoint used by the developer environment
  const response = await axios.post<AnalyzeResponse>(
    `${API_BASE_URL}/seoWebsiteAnalyzer`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

