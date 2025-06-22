"use client";

import React, { useState, useEffect } from 'react';
import { Job, JobFilters } from '@/types/job';
import { JobService } from '@/services/jobService';
import { 
  Box, 
  Text, 
  Button, 
  Input, 
  Flex, 
  Spinner
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface JobListProps {
  initialFilters?: JobFilters;
}

export default function JobList({ initialFilters = {} }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    limit: 20,
    ...initialFilters
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await JobService.fetchJobs(filters);
      
      if (response.error) {
        setError(response.error);
      } else {
        setJobs(response.jobs);
      }
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query: query || undefined }));
  };

  const handleSourceFilter = (source: string) => {
    setFilters(prev => ({ ...prev, source: source || undefined }));
  };

  const handleShowDetails = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleCheckScore = (jobDescription: string) => {
    // Navigate to score checker page with job description
    const encodedDescription = encodeURIComponent(jobDescription);
    router.push(`/?jd=${encodedDescription}`);
    handleCloseModal();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const getSourceColor = (source: string) => {
    return source === 'remotive' ? 'blue' : 'green';
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading && jobs.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Box textAlign="center">
          <Spinner size="xl" color="blue.500" />
          <Text mt={4}>Loading jobs...</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1200px" mx="auto">
      {/* Search and Filters */}
      <Box mb={6}>
        <Flex gap={4} flexWrap="wrap" mb={4}>
          <Box flex="1" minW="200px">
            <Input
              placeholder="Search jobs, companies..."
              value={filters.query || ''}
              onChange={(e) => handleSearch(e.target.value)}
              size="lg"
            />
          </Box>
          <Box minW="150px">
            <select
              value={filters.source || ''}
              onChange={(e) => handleSourceFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '16px'
              }}
            >
              <option value="">All sources</option>
              <option value="remotive">Remotive</option>
              <option value="weworkremotely">We Work Remotely</option>
            </select>
          </Box>
        </Flex>
        
        {error && (
          <Box p={4} bg="red.50" border="1px" borderColor="red.200" borderRadius="md">
            <Text color="red.700">{error}</Text>
          </Box>
        )}
      </Box>

      {/* Job Count */}
      <Box mb={4}>
        <Text fontSize="lg" color="gray.600">
          {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
        </Text>
      </Box>

      {/* Job Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: 'white',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#2d3748'
              }}>
                {job.title}
              </h3>
              
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#718096', fontWeight: '500' }}>
                  🏢 {job.company}
                </span>
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#a0aec0' }}>
                  📅 {formatDate(job.published_at)}
                </span>
              </div>

              <p style={{
                fontSize: '14px',
                color: '#718096',
                marginBottom: '16px',
                lineHeight: '1.5'
              }}>
                {truncateText(job.description)}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{
                  backgroundColor: getSourceColor(job.source) === 'blue' ? '#3182ce' : '#38a169',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {job.source}
                </span>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(job.url, '_blank');
                  }}
                >
                  Apply →
                </Button>
              </div>

              {/* Show Details Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShowDetails(job)}
                style={{ width: '100%', marginTop: '8px' }}
              >
                Show Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && jobs.length === 0 && !error && (
        <Box textAlign="center" py={12}>
          <Text fontSize="lg" color="gray.500">
            No jobs found. Try adjusting your search criteria.
          </Text>
        </Box>
      )}

      {/* Custom Modal */}
      {isModalOpen && selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 24px 16px 24px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#2d3748',
                    marginBottom: '12px'
                  }}>
                    {selectedJob.title}
                  </h2>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>🏢</span>
                      <span style={{ fontWeight: '500', fontSize: '16px' }}>
                        {selectedJob.company}
                      </span>
                    </div>
                    <span style={{
                      backgroundColor: getSourceColor(selectedJob.source) === 'blue' ? '#3182ce' : '#38a169',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {selectedJob.source}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#a0aec0' }}>
                    📅 Posted on {formatDate(selectedJob.published_at)}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#a0aec0',
                    padding: '4px',
                    borderRadius: '4px',
                    marginLeft: '16px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4a5568'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '24px',
              flex: 1,
              overflow: 'auto'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#2d3748'
                }}>
                  Job Description
                </h3>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  maxHeight: '300px',
                  overflow: 'auto',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    fontSize: '14px',
                    color: '#4a5568',
                    margin: 0
                  }}>
                    {selectedJob.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <Button
                  colorScheme="purple"
                  size="lg"
                  onClick={() => handleCheckScore(selectedJob.description)}
                  style={{ width: '100%' }}
                >
                  📊 Check Resume Score for This Job
                </Button>
                
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => window.open(selectedJob.url, '_blank')}
                  style={{ width: '100%' }}
                >
                  🚀 Apply for This Position
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
} 