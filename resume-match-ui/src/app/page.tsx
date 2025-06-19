"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  Textarea,
  Heading,
  Text,
  Stack,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function HomePage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ fit_score: number; suggestions: string } | null>(null);
  const [error, setError] = useState("");

  const isMobile = useBreakpointValue({ base: true, md: false });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    if (!resume || !jd) {
      setError("Please upload a resume and enter a job description.");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);
    try {
      const res = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to get results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="6xl" py={12}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        align="center"
        justify="center"
        minH="70vh"
      >
        <Box
          w={{ base: "100%", md: result ? "50%" : "50%" }}
          transition="width 0.4s"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box bg="white" boxShadow="xl" borderRadius="xl" p={8} w="100%">
            <Heading as="h2" size="lg" color="purple.700" mb={2}>
              Score Checker
            </Heading>
            <Text mb={6} color="gray.600">
              Upload your resume and a job description to see how well you match and get improvement suggestions.
            </Text>
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Box>
                  <Text fontWeight="medium" mb={1}>Resume (PDF)</Text>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={e => setResume(e.target.files?.[0] || null)}
                    bg="white"
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Job Description</Text>
                  <Textarea
                    value={jd}
                    onChange={e => setJd(e.target.value)}
                    placeholder="Paste the job description here..."
                    minH="100px"
                    bg="white"
                  />
                </Box>
                <Button
                  type="submit"
                  colorScheme="purple"
                  loading={loading}
                  w="full"
                >
                  Check Match
                </Button>
              </Stack>
            </form>
            {error && (
              <Box mt={6} bg="red.50" borderRadius="md" p={4} color="red.700" fontWeight="medium">
                Error: {error}
              </Box>
            )}
          </Box>
        </Box>
        {result && (
          <Box
            bg="purple.50"
            borderRadius="xl"
            p={4}
            boxShadow="xl"
            minW="320px"
            maxH={{ base: "none", md: "70vh" }}
            overflowY="auto"
            w={{ base: "100%", md: "50%" }}
            ml={{ base: 0, md: 0 }}
            mt={{ base: 8, md: 0 }}
            display="flex"
            flexDirection="column"
          >
            <Box p={4} pb={6} mb={4}>
              <Text fontSize="xl" fontWeight="bold" color="purple.800" mb={4}>
                Fit Score: {result.fit_score}/10
              </Text>
              <Text color="gray.700" whiteSpace="pre-line">
                {result.suggestions}
              </Text>
            </Box>
          </Box>
        )}
      </Flex>
    </Container>
  );
}
