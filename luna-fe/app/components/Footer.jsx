"use client";
import React from "react";
import { prefix } from "../utils/prefix"; // Import prefix
import { Box, Flex, Text, Image } from "@chakra-ui/react";

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
      <Flex justify="center" mb={8}>
        <Image
          src={prefix("logo.png")} // Use prefix here
          alt="Casa Luna Footer Logo"
          h="80px"
          w="auto"
          objectFit="contain"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
        />
      </Flex>

      <Text mb={8} fontSize="lg">
        {t.footer.slogan}
      </Text>

      <Box borderTopWidth="1px" borderColor="gray.800" pt={8} fontSize="sm">
        &copy; {new Date().getFullYear()} Casa Luna. {t.footer.rights}
      </Box>
    </Box>
  );
}
