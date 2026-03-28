const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export type HealthResponse = {
  ok: boolean;
  endpoint: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/todos/1`);

  if (!response.ok) {
    throw new Error(`Health request failed: ${response.status}`);
  }

  return {
    ok: true,
    endpoint: API_BASE_URL
  };
}
