import JobList from '@/components/JobList';

export default function JobsPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <div style={{ 
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '12px'
          }}>
            Remote Jobs
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#718096',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover remote opportunities from Remotive and We Work Remotely. 
            Search, filter, and find your next remote position.
          </p>
        </div>
        
        <JobList />
      </div>
    </div>
  );
} 