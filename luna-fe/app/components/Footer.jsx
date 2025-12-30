"use client";
import React from "react";
// import { Trees } from "lucide-react"; // Removed unused icon
import { Box, Flex, Text, Image } from "@chakra-ui/react"; // Added Image to imports

export default function Footer({ t }) {
  return (
    <Box
      as="footer"
      bg="gray.900"
      color="gray.400"
      py={16}
      px={6}
      textAlign="center"
    >
      {/* Replaced text/icon Flex with centered Image container */}
      <Flex justify="center" mb={8}>
        <Image
          src="/logo.png"
          alt="Casa Luna Footer Logo"
          h="80px" // Slightly larger size for the footer base
          w="auto"
          objectFit="contain"
          // Assuming the logo is light-colored, adding a subtle drop shadow
          // helps it stand out from the dark gray background.
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
        />
      </Flex>

      <Text mb={8} fontSize="lg">
        {t.footer.slogan}
      </Text>

      <Box borderTopWidth="1px" borderColor="gray.800" pt={8} fontSize="sm">
        {/* Updated brand name in copyright to match the logo */}
        &copy; {new Date().getFullYear()} Casa Luna. {t.footer.rights}
      </Box>
    </Box>
  );
}
