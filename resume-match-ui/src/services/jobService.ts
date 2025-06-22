import { JobResponse, JobFilters } from '@/types/job';

// Default API URL - can be overridden by environment variable
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: check for environment variable
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  // Server-side: use default
  return 'http://localhost:8000';
};

export class JobService {
  static async fetchJobs(filters: JobFilters = {}): Promise<JobResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.query) params.append('query', filters.query);
      if (filters.company) params.append('company', filters.company);
      if (filters.source) params.append('source', filters.source);
      if (filters.limit) params.append('limit', filters.limit.toString());
      
      const apiUrl = getApiUrl();
      const url = `${apiUrl}/jobs${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return {
        jobs: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch jobs'
      };
    }
  }

  static async fetchRemotiveJobs(): Promise<JobResponse> {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/jobs/remotive`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Remotive jobs:', error);
      return {
        jobs: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch Remotive jobs'
      };
    }
  }

  static async fetchWeWorkRemotelyJobs(): Promise<JobResponse> {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/jobs/weworkremotely`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching We Work Remotely jobs:', error);
      return {
        jobs: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch We Work Remotely jobs'
      };
    }
  }
} 