"use client";

import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

interface JobDescriptionAlertProps {
  onClear: () => void;
}

export default function JobDescriptionAlert({ onClear }: JobDescriptionAlertProps) {
  return (
    <Box 
      bg="purple.50" 
      border="1px" 
      borderColor="purple.200" 
      borderRadius="md" 
      p={4} 
      mb={4}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ flex: 1 }}>
          <Text fontWeight="medium" color="purple.800" mb={1}>
            🎯 Job Description Pre-filled
          </Text>
          <Text fontSize="sm" color="purple.700">
            A job description has been loaded from the jobs page. Upload your resume to check your match score!
          </Text>
        </div>
        <Button
          size="sm"
          variant="outline"
          colorScheme="purple"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
    </Box>
  );
} 