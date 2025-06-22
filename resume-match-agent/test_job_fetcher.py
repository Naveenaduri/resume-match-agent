import asyncio
import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from job_fetcher import JobFetcher

async def test_job_fetcher():
    """Test the job fetcher functionality"""
    fetcher = JobFetcher()
    
    print("Testing job fetcher...")
    print("=" * 50)
    
    # Test Remotive jobs
    print("Fetching Remotive jobs...")
    remotive_jobs = await fetcher.fetch_remotive_jobs()
    print(f"Found {len(remotive_jobs)} Remotive jobs")
    if remotive_jobs:
        print("Sample Remotive job:")
        print(f"  Title: {remotive_jobs[0]['title']}")
        print(f"  Company: {remotive_jobs[0]['company']}")
        print(f"  Source: {remotive_jobs[0]['source']}")
        print()
    
    # Test We Work Remotely jobs
    print("Fetching We Work Remotely jobs...")
    weworkremotely_jobs = await fetcher.fetch_weworkremotely_jobs()
    print(f"Found {len(weworkremotely_jobs)} We Work Remotely jobs")
    if weworkremotely_jobs:
        print("Sample We Work Remotely job:")
        print(f"  Title: {weworkremotely_jobs[0]['title']}")
        print(f"  Company: {weworkremotely_jobs[0]['company']}")
        print(f"  Source: {weworkremotely_jobs[0]['source']}")
        print()
    
    # Test combined jobs
    print("Fetching all jobs...")
    all_jobs = await fetcher.fetch_all_jobs()
    print(f"Total jobs: {len(all_jobs)}")
    print(f"Remotive: {len([j for j in all_jobs if j['source'] == 'remotive'])}")
    print(f"We Work Remotely: {len([j for j in all_jobs if j['source'] == 'weworkremotely'])}")
    
    # Test search functionality
    if all_jobs:
        print("\nTesting search functionality...")
        python_jobs = fetcher.search_jobs(all_jobs, query="python")
        print(f"Jobs with 'python' in title/description: {len(python_jobs)}")
        
        if python_jobs:
            print("Sample Python job:")
            print(f"  Title: {python_jobs[0]['title']}")
            print(f"  Company: {python_jobs[0]['company']}")
            print(f"  Source: {python_jobs[0]['source']}")

if __name__ == "__main__":
    asyncio.run(test_job_fetcher()) 