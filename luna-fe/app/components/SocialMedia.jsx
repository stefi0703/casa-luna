"use client";
import React from "react";
import {
  Dialog,
  HStack,
  VStack,
  Text,
  Button,
  Icon,
  Link,
  Box,
  Image,
} from "@chakra-ui/react";
import { Instagram, Facebook, Youtube, X } from "lucide-react";
import { prefix } from "../utils/prefix";

// Note the addition of 't' in the props
export default function SocialMedia({
  isMobile = false,
  color = "gray.800",
  t,
}) {
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      isImage: false,
      url: "https://www.instagram.com/casalunaromania/",
      color: "#E1306C",
      bg: "pink.50",
    },
    {
      name: "Facebook",
      icon: Facebook,
      isImage: false,
      url: "https://www.facebook.com/profile.php?id=61585733996565",
      color: "#1877F2",
      bg: "blue.50",
    },
    {
      name: "TikTok",
      imageSrc: prefix("/tiktok.png"),
      isImage: true,
      url: "https://www.tiktok.com/@casalunaromania1?lang=en",
      bg: "gray.100",
    },
    {
      name: "YouTube",
      icon: Youtube,
      isImage: false,
      url: "https://www.youtube.com/@CasaLunaRomania",
      color: "#FF0000",
      bg: "red.50",
    },
  ];

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button
          variant="plain"
          color={color}
          fontWeight="medium"
          fontSize={isMobile ? "2xl" : "md"}
          _hover={{ color: "orange.500" }}
          px={0}
        >
          {/* Use translation for trigger text */}
          {t.amenities.view_guide}
        </Button>
      </Dialog.Trigger>

      <Dialog.Backdrop bg="black/50" backdropFilter="blur(4px)" />
      <Dialog.Positioner>
        <Dialog.Content bg="white" borderRadius="3xl" p={8} maxW="sm" w="90%">
          <Dialog.CloseTrigger asChild position="absolute" top="4" right="4">
            <Button size="sm" variant="ghost" color="gray.400">
              <X size={20} />
            </Button>
          </Dialog.CloseTrigger>

          <Dialog.Body p={0}>
            <VStack spacing={6}>
              <Box textAlign="center">
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {/* Title from translation: "Follow Us" or "Urmărește-ne" */}
                  {t.contact.email_form.send.includes("Trimite")
                    ? "Urmărește-ne"
                    : "Follow Us"}
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {/* Subtitle from translation: "Stay up to date" */}
                  {t.footer.slogan}
                </Text>
              </Box>

              <HStack spacing={4} justify="center" wrap="wrap">
                {socialLinks.map((social) => (
                  <Link key={social.name} href={social.url} target="_blank">
                    <VStack spacing={2}>
                      <Box
                        p={4}
                        borderRadius="2xl"
                        bg={social.bg}
                        color={social.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="all 0.3s"
                        _hover={{
                          transform: "translateY(-5px)",
                          boxShadow: "lg",
                        }}
                      >
                        {social.isImage ? (
                          <Image
                            src={social.imageSrc}
                            alt={social.name}
                            boxSize="24px"
                            objectFit="contain"
                          />
                        ) : (
                          <Icon as={social.icon} boxSize={6} />
                        )}
                      </Box>
                      <Text fontSize="xs" fontWeight="medium" color="gray.600">
                        {social.name}
                      </Text>
                    </VStack>
                  </Link>
                ))}
              </HStack>
            </VStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
