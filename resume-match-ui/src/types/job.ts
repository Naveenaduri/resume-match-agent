export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  url: string;
  published_at: string;
  source: 'remotive' | 'weworkremotely';
}

export interface JobResponse {
  jobs: Job[];
  total: number;
  sources?: string[];
  error?: string;
}

export interface JobFilters {
  query?: string;
  company?: string;
  source?: string;
  limit?: number;
} 