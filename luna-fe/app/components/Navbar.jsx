"use client";
import React, { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react"; // Removed Trees icon import
import {
  Box,
  Flex,
  Button,
  IconButton,
  Drawer,
  useDisclosure,
  VStack,
  Text,
  HStack,
  Image, // 1. Add Image import here
} from "@chakra-ui/react";

export default function Navbar({
  t,
  language,
  toggleLanguage,
  scrollToSection,
}) {
  const { open, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id) => {
    scrollToSection(id);
    onClose();
  };

  const navLinks = [
    { id: "rooms", label: t.nav.rooms },
    { id: "amenities", label: t.nav.amenities },
    { id: "location", label: t.nav.location },
    { id: "pricing", label: t.nav.pricing },
  ];

  // COLORS & SHADOWS
  const textColor = scrolled ? "gray.800" : "white";
  const hoverColor = "orange.500";
  const textShadow = scrolled ? "none" : "0 2px 4px rgba(0,0,0,0.6)";

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      w="full"
      zIndex={50}
      transition="all 0.3s ease-in-out"
      bg={scrolled ? "white" : "transparent"}
      bgGradient={
        !scrolled
          ? "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)"
          : "none"
      }
      boxShadow={scrolled ? "sm" : "none"}
      pt={scrolled ? 3 : 8}
      pb={scrolled ? 3 : 8}
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
        px={6}
      >
        {/* Logo - UPDATED */}
        <HStack
          gap={2}
          cursor="pointer"
          onClick={() => handleNav("hero")}
          // Removed color and textShadow props from HStack as they don't apply to the image
        >
          <Image
            src="/logo.png" // Ensure logo.png is in your public folder
            alt="Casa Luna Logo"
            h="50px" // Adjust height as needed depending on your logo aspect ratio
            w="auto"
            objectFit="contain"
            transition="all 0.3s"
          />
        </HStack>

        {/* Desktop Nav */}
        <Flex display={{ base: "none", md: "flex" }} gap={8} align="center">
          {navLinks.map((item) => (
            <Button
              key={item.id}
              variant="plain"
              color={textColor}
              textShadow={textShadow}
              _hover={{ color: hoverColor, textShadow: "none" }}
              onClick={() => handleNav(item.id)}
              fontWeight="medium"
              fontSize="md"
              px={0}
            >
              {item.label}
            </Button>
          ))}

          <Button
            variant="ghost"
            onClick={toggleLanguage}
            color={textColor}
            textShadow={textShadow}
            _hover={{
              bg: "whiteAlpha.200",
              color: hoverColor,
              textShadow: "none",
            }}
            fontWeight="bold"
            size="sm"
          >
            <Globe size={18} style={{ marginRight: "6px" }} />
            {language.toUpperCase()}
          </Button>

          <Button
            onClick={() => handleNav("contact")}
            bg={scrolled ? "orange.500" : "white"}
            color={scrolled ? "white" : "gray.900"}
            _hover={{ bg: scrolled ? "orange.600" : "gray.100" }}
            rounded="full"
            px={6}
            fontWeight="bold"
            boxShadow="md"
          >
            {t.nav.book}
          </Button>
        </Flex>

        {/* Mobile Toggle */}
        <Flex display={{ md: "none" }} gap={4} align="center">
          <Button
            variant="plain"
            onClick={toggleLanguage}
            color={textColor}
            textShadow={textShadow}
            fontSize="sm"
            px={0}
          >
            <Globe size={18} style={{ marginRight: "4px" }} />
            {language.toUpperCase()}
          </Button>

          <IconButton
            onClick={onOpen}
            variant="ghost"
            color={textColor}
            aria-label="Open Menu"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            <Menu
              size={28}
              style={{
                filter: !scrolled
                  ? "drop-shadow(0px 2px 2px rgba(0,0,0,0.6))"
                  : "none",
              }}
            />
          </IconButton>
        </Flex>
      </Flex>

      {/* Mobile Menu Drawer */}
      <Drawer.Root
        open={open}
        onOpenChange={(e) => (e.open ? onOpen() : onClose())}
        placement="end"
        size="full"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="white" color="gray.900">
            <Drawer.CloseTrigger asChild position="absolute" top="6" right="6">
              <IconButton
                variant="ghost"
                color="gray.500"
                _hover={{ bg: "gray.100" }}
              >
                <X size={28} />
              </IconButton>
            </Drawer.CloseTrigger>

            <Drawer.Body
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <VStack spacing={8}>
                {navLinks.map((item) => (
                  <Button
                    key={item.id}
                    variant="plain"
                    fontSize="2xl"
                    fontWeight="semibold"
                    color="gray.800"
                    _hover={{ color: "orange.500" }}
                    onClick={() => handleNav(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  size="xl"
                  colorPalette="orange"
                  rounded="full"
                  px={12}
                  py={6}
                  fontSize="xl"
                  onClick={() => handleNav("contact")}
                  mt={4}
                  fontWeight="bold"
                  boxShadow="xl"
                >
                  {t.nav.book}
                </Button>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}
