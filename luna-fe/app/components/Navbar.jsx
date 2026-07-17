"use client";
import React, { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { prefix } from "../utils/prefix";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Drawer,
  useDisclosure,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
// IMPORT SOCIAL MEDIA
import SocialMedia from "./SocialMedia";

export default function Navbar({
  t,
  language,
  toggleLanguage,
  scrollToSection,
  onOpenGallery,
  isSolid = false,
}) {
  const { open, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNavbarWhite = scrolled || isSolid;

  const handleNav = (id) => {
    const isFacilitiesPage = window.location.pathname.includes("/facilities");

    if (id === "gallery") {
      if (isFacilitiesPage) {
        window.location.href = prefix("/#gallery");
      } else {
        onOpenGallery();
      }
    } else if (id === "facilities-page") {
      window.location.href = prefix("/facilities");
    } else if (id === "hero") {
      isFacilitiesPage
        ? (window.location.href = prefix("/"))
        : scrollToSection("hero");
    } else {
      if (isFacilitiesPage) {
        window.location.href = prefix(`/#${id}`);
      } else {
        scrollToSection(id);
      }
    }
    onClose();
  };

  const navLinks = [
    { id: "rooms", label: t.nav.rooms },
    { id: "amenities", label: t.nav.amenities },
    { id: "facilities-page", label: t.nav.facilitiesPage },
    { id: "location", label: t.nav.location },
    { id: "pricing", label: t.nav.pricing },
    { id: "gallery", label: t.nav.gallery },
  ];

  const textColor = isNavbarWhite ? "gray.800" : "white";
  const hoverColor = "orange.50";
  const activeHoverColor = "orange.500";
  const textShadow = isNavbarWhite ? "none" : "0 2px 4px rgba(0,0,0,0.6)";

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
      bg={isNavbarWhite ? "white" : "transparent"}
      bgGradient={
        !isNavbarWhite
          ? "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)"
          : "none"
      }
      boxShadow={isNavbarWhite ? "sm" : "none"}
      pt={isNavbarWhite ? 3 : 8}
      pb={isNavbarWhite ? 3 : 8}
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
        px={6}
      >
        <HStack gap={2} cursor="pointer" onClick={() => handleNav("hero")}>
          <Image
            src={prefix("/logo.png")}
            alt="Logo"
            h="50px"
            w="auto"
            objectFit="contain"
            transition="all 0.3s"
            filter={
              isNavbarWhite
                ? "invert(1) brightness(0.2)"
                : "drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
            }
          />
        </HStack>

        {/* --- NAVBAR DESKTOP --- */}
        <Flex display={{ base: "none", md: "flex" }} gap={4} align="center">
          {navLinks.map((item) => (
            <Button
              key={item.id}
              variant="plain"
              color={textColor}
              textShadow={textShadow}
              _hover={{ color: activeHoverColor, textShadow: "none" }}
              onClick={() => handleNav(item.id)}
              fontWeight="medium"
              fontSize="md"
              px={0}
            >
              {item.label}
            </Button>
          ))}

          <SocialMedia
            color={textColor}
            t={t}
            label={language === "en" ? "See More" : "Vezi mai mult"}
          />

          <Button
            variant="ghost"
            onClick={toggleLanguage}
            color={textColor}
            textShadow={textShadow}
            _hover={{
              bg: "whiteAlpha.200",
              color: activeHoverColor,
              textShadow: "none",
            }}
            fontWeight="bold"
            size="sm"
          >
            <Globe size={18} style={{ marginRight: "6px" }} />
            {language.toUpperCase()}
          </Button>

          <Button
            onClick={() => handleNav("contact-section")}
            bg={isNavbarWhite ? "orange.500" : "white"}
            color={isNavbarWhite ? "white" : "gray.900"}
            _hover={{ bg: isNavbarWhite ? "orange.600" : "gray.100" }}
            rounded="full"
            px={6}
            fontWeight="bold"
            boxShadow="md"
          >
            {t.nav.book}
          </Button>
        </Flex>

        {/* --- REZERVARE + BURGER (MOBILE) --- */}
        <Flex display={{ base: "flex", md: "none" }} gap={2} align="center">
          <Button
            onClick={() => handleNav("contact-section")}
            bg="orange.500"
            color="white"
            _hover={{ bg: "orange.600" }}
            _active={{ bg: "orange.700" }}
            rounded="full"
            px={{ base: 4, sm: 5 }}
            h="40px"
            fontSize={{ base: "sm", sm: "md" }}
            fontWeight="bold"
            boxShadow="md"
            whiteSpace="nowrap"
          >
            {t.nav.book}
          </Button>

          <IconButton
            onClick={onOpen}
            variant="ghost"
            color={textColor}
            aria-label="Open Menu"
            minW="40px"
            h="40px"
          >
            <Menu size={28} />
          </IconButton>
        </Flex>
      </Flex>

      {/* --- DRAWER MOBIL (MENIUL LATERAL) --- */}
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
              <IconButton variant="ghost" color="gray.500">
                <X size={28} />
              </IconButton>
            </Drawer.CloseTrigger>
            <Drawer.Body
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <VStack spacing={6} w="full">
                {navLinks.map((item) => (
                  <Button
                    key={item.id}
                    variant="plain"
                    fontSize="2xl"
                    fontWeight="semibold"
                    color="gray.800"
                    onClick={() => handleNav(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* REPARARE: Adăugarea butonului de schimbare a limbii în meniul de mobil */}
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleLanguage();
                    onClose();
                  }}
                  color="orange.500"
                  borderColor="orange.200"
                  _hover={{ bg: hoverColor }}
                  fontWeight="bold"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  mt={4}
                >
                  <Globe size={20} style={{ marginRight: "8px" }} />
                  {language === "en" ? "RO" : "EN"}
                </Button>

                {/* --- SOCIAL MEDIA (MOBILE MENU) --- */}
                <Box pt={2}>
                  <SocialMedia
                    isMobile={true}
                    color="gray.800"
                    t={t}
                    label={language === "en" ? "Follow Us" : "Urmărește-ne"}
                  />
                </Box>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}