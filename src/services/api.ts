import { Platform } from 'react-native';
import type { UserProfile } from '../contexts/ProfileContext';

export const API_BASE_URL = Platform.OS === 'android' 
  ? "http://10.0.2.2:8000" 
  : "http://127.0.0.1:8000";

export type HealthResponse = {
  ok: boolean;
  endpoint: string;
};

export type Benefit = {
  icon: "food" | "energy" | "housing" | "health" | string;
  title: string;
  amount: string;
  description: string;
  matchPercent: number;
  url: string;
  tags: string[];
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/docs`);

  if (!response.ok) {
    throw new Error(`Health request failed: ${response.status}`);
  }

  return {
    ok: true,
    endpoint: API_BASE_URL
  };
}

export async function analyzeProfile(profile: UserProfile): Promise<Benefit[]> {
  console.log("Sending profile to:", `${API_BASE_URL}/api/analyze`);
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  });

  if (!response.ok) {
    throw new Error(`Analyze request failed: ${response.status}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.benefits || [];
}
