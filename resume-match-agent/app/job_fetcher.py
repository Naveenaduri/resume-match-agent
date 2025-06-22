import requests
import httpx
from bs4 import BeautifulSoup
from datetime import datetime
import re
from typing import List, Dict, Any
import asyncio
from urllib.parse import urljoin


class JobFetcher:
    def __init__(self):
        self.remotive_api_url = "https://remotive.com/api/remote-jobs"
        self.weworkremotely_url = "https://weworkremotely.com/categories/remote-programming-jobs"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

    async def fetch_remotive_jobs(self) -> List[Dict[str, Any]]:
        """Fetch jobs from Remotive API"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.remotive_api_url, headers=self.headers)
                response.raise_for_status()
                data = response.json()
                
                jobs = []
                for job in data.get('jobs', []):
                    normalized_job = {
                        'id': f"remotive_{job.get('id', '')}",
                        'title': job.get('title', ''),
                        'company': job.get('company_name', ''),
                        'description': job.get('description', ''),
                        'url': job.get('url', ''),
                        'published_at': job.get('publication_date', ''),
                        'source': 'remotive'
                    }
                    jobs.append(normalized_job)
                
                return jobs
        except Exception as e:
            print(f"Error fetching Remotive jobs: {e}")
            return []

    async def fetch_weworkremotely_jobs(self) -> List[Dict[str, Any]]:
        """Scrape jobs from We Work Remotely"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.weworkremotely_url, headers=self.headers)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                jobs = []
                
                # Find job listings
                job_sections = soup.find_all('section', class_='jobs')
                
                for section in job_sections:
                    job_listings = section.find_all('li')
                    
                    for job in job_listings:
                        try:
                            # Extract job link
                            job_link = job.find('a', href=True)
                            if not job_link:
                                continue
                                
                            job_url = urljoin(self.weworkremotely_url, job_link['href'])
                            
                            # Extract company and title
                            company_elem = job.find('span', class_='company')
                            title_elem = job.find('span', class_='title')
                            
                            if not company_elem or not title_elem:
                                continue
                                
                            company = company_elem.get_text(strip=True)
                            title = title_elem.get_text(strip=True)
                            
                            # Generate a simple ID from URL
                            job_id = f"weworkremotely_{hash(job_url) % 1000000}"
                            
                            # For now, we'll use placeholder description since we'd need to scrape individual job pages
                            # In a production system, you might want to scrape individual job pages for full descriptions
                            description = f"Remote position at {company} - {title}"
                            
                            normalized_job = {
                                'id': job_id,
                                'title': title,
                                'company': company,
                                'description': description,
                                'url': job_url,
                                'published_at': datetime.now().isoformat(),  # We Work Remotely doesn't show dates on listing page
                                'source': 'weworkremotely'
                            }
                            jobs.append(normalized_job)
                            
                        except Exception as e:
                            print(f"Error parsing individual job: {e}")
                            continue
                
                return jobs
        except Exception as e:
            print(f"Error fetching We Work Remotely jobs: {e}")
            return []

    async def fetch_all_jobs(self) -> List[Dict[str, Any]]:
        """Fetch and combine jobs from all sources"""
        # Fetch jobs from both sources concurrently
        remotive_jobs, weworkremotely_jobs = await asyncio.gather(
            self.fetch_remotive_jobs(),
            self.fetch_weworkremotely_jobs(),
            return_exceptions=True
        )
        
        # Handle exceptions
        if isinstance(remotive_jobs, Exception):
            print(f"Remotive fetch failed: {remotive_jobs}")
            remotive_jobs = []
        if isinstance(weworkremotely_jobs, Exception):
            print(f"We Work Remotely fetch failed: {weworkremotely_jobs}")
            weworkremotely_jobs = []
        
        # Combine all jobs
        all_jobs = remotive_jobs + weworkremotely_jobs
        
        # Sort by published_at (newest first)
        all_jobs.sort(key=lambda x: x.get('published_at', ''), reverse=True)
        
        return all_jobs

    def search_jobs(self, jobs: List[Dict[str, Any]], query: str = None, 
                   company: str = None, source: str = None) -> List[Dict[str, Any]]:
        """Filter jobs based on search criteria"""
        filtered_jobs = jobs
        
        if query:
            query_lower = query.lower()
            filtered_jobs = [
                job for job in filtered_jobs
                if (query_lower in job.get('title', '').lower() or
                    query_lower in job.get('description', '').lower() or
                    query_lower in job.get('company', '').lower())
            ]
        
        if company:
            company_lower = company.lower()
            filtered_jobs = [
                job for job in filtered_jobs
                if company_lower in job.get('company', '').lower()
            ]
        
        if source:
            source_lower = source.lower()
            filtered_jobs = [
                job for job in filtered_jobs
                if source_lower == job.get('source', '').lower()
            ]
        
        return filtered_jobs 