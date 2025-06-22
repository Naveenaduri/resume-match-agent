import { useState, useEffect } from 'react';

export function useApiUrl() {
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:8000');

  useEffect(() => {
    // Check for environment variable
    const envApiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envApiUrl) {
      setApiUrl(envApiUrl);
    }
  }, []);

  return apiUrl;
} 