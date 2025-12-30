"use client";
import React from "react";
import { prefix } from "../utils/prefix";
import {
  Box,
  Container,
  Flex,
  Text,
  Image,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer({ t }) {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="gray.950"
      color="gray.400"
      py={10}
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={6}
        >
          {/* LEFT: Logo & Copyright */}
          <Stack align={{ base: "center", md: "flex-start" }} gap={3}>
            <Image
              src={prefix("logo.png")}
              alt="Casa Luna Logo"
              h="50px"
              w="auto"
              objectFit="contain"
              opacity={0.9}
            />
            <Text fontSize="xs" color="gray.500">
              &copy; {currentYear} Casa Luna. {t.footer.rights}
            </Text>
          </Stack>

          {/* RIGHT: Slogan & Socials */}
          <Stack align={{ base: "center", md: "flex-end" }} gap={4}>
            <Text fontStyle="italic" fontSize="sm" color="gray.300">
              "{t.footer.slogan}"
            </Text>

            <Flex gap={2}>
              {/* INSTAGRAM */}
              <IconButton
                as="a" // Renders as an <a> tag
                href="https://www.instagram.com/casalunaromania/" // <--- PUT LINK HERE
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                color="gray.400"
                _hover={{ color: "orange.500", bg: "whiteAlpha.100" }}
                size="xs"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </IconButton>

              {/* FACEBOOK */}
              <IconButton
                as="a"
                href="https://www.facebook.com/profile.php?id=61584490931813" // <--- PUT LINK HERE
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                color="gray.400"
                _hover={{ color: "orange.500", bg: "whiteAlpha.100" }}
                size="xs"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </IconButton>

              {/* EMAIL (Opens default mail app) */}
              <IconButton
                as="a"
                href="mailto:contact@casaluna.com"
                variant="ghost"
                color="gray.400"
                _hover={{ color: "orange.500", bg: "whiteAlpha.100" }}
                size="xs"
                aria-label="Email"
              >
                <Mail size={18} />
              </IconButton>
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
