import NextLink from "next/link";
import { Flex, Box, Link, Heading } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex as="nav" w="100%" bg="white" boxShadow="md" py={3} px={4} align="center" justify="space-between">
      <Heading as="h1" size="md" color="purple.700" letterSpacing="tight">
        Resume Match Agent
      </Heading>
      <Box display="flex" gap={4}>
        <Link as={NextLink} href="/" color="gray.700" _hover={{ color: "purple.600" }} fontWeight="medium">
          Score Checker
        </Link>
        <Link as={NextLink} href="/cold-email" color="gray.700" _hover={{ color: "purple.600" }} fontWeight="medium">
          Cold Email Generator
        </Link>
      </Box>
    </Flex>
  );
} 