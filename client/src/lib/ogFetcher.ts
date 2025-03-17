// Utility function to fetch Open Graph data for WhatsApp group links
import { apiRequest } from "./queryClient";

export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export async function fetchOpenGraphData(url: string): Promise<OGData> {
  try {
    const response = await apiRequest('POST', '/api/fetch-og', { url });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Open Graph data:', error);
    return {
      title: "WhatsApp Group",
      description: "No description available",
      image: undefined,
      url
    };
  }
}
