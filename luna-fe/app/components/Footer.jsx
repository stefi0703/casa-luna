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
  Link,
  VStack // Added Link for interactivity
} from "@chakra-ui/react";
import { Instagram, Facebook, Mail, Phone } from "lucide-react"; // Added Phone icon

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
          gap={8}
        >
          {/* LEFT: Logo & Contact Info */}
          <Stack align={{ base: "center", md: "flex-start" }} gap={4}>
            <Image
              src={prefix("logo.png")}
              alt="Casa Luna Logo"
              h="50px"
              w="auto"
              objectFit="contain"
              opacity={0.9}
            />

            <VStack align={{ base: "center", md: "flex-start" }} gap={1}>
              <Link
                href="tel:+407xx xxx xxx"
                variant="plain"
                color="gray.400"
                _hover={{ color: "orange.500" }}
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Phone size={14} /> +40 (750) 849 137
              </Link>
              <Link
                href="mailto:casaluna.rezervari@gmail.com"
                variant="plain"
                color="gray.400"
                _hover={{ color: "orange.500" }}
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Mail size={14} /> casaluna.rezervari@gmail.com
              </Link>
            </VStack>

            <Text fontSize="xs" color="gray.600">
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
                as="a"
                href="https://www.instagram.com/casalunaromania/"
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
                href="https://www.facebook.com/profile.php?id=61584490931813"
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

              {/* EMAIL */}
              <IconButton
                as="a"
                href="mailto:casaluna.rezervari@gmail.com"
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
