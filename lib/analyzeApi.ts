import axios from "axios";

export interface AnalyzePayload {
  url: string;
  options?: Record<string, any>;
}

// Use the Next.js internal API routes. A relative base ensures requests go
// to this Next.js app's /api/* endpoints both in development and production.
const API_BASE_URL = "/api";

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

export const websiteSpeed = async (payload: { url: string }) => {
  // Post to local website-speed endpoint used by the developer environment
  const response = await axios.post<AnalyzeResponse>(
    `${API_BASE_URL}/speedAuditor`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};


