"use client";
import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { galleryImages } from "../data/content";
import { prefix } from "../utils/prefix"; // Import prefix
import { Box, Heading, Text, Button, Flex, Container } from "@chakra-ui/react";

export default function Hero({ t, scrollToSection }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      as="header"
      id="hero"
      position="relative"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="gray.900"
    >
      <Box position="absolute" inset={0} zIndex={0}>
        <Box position="absolute" inset={0} bg="blackAlpha.400" zIndex={10} />
        <Box
          as="img"
          src={prefix(galleryImages[activeImage].url)} // Use prefix here
          alt="Hero"
          w="full"
          h="full"
          objectFit="cover"
          transition="opacity 1s ease-in-out"
        />
      </Box>

      <Container
        position="relative"
        zIndex={20}
        textAlign="center"
        maxW="4xl"
        mt={16}
      >
        <Heading
          as="h1"
          size={{ base: "3xl", md: "4xl", lg: "6xl" }}
          color="white"
          mb={6}
          lineHeight="shorter"
        >
          {t.hero.title_start} <br />{" "}
          <Text as="span" color="orange.200">
            {t.hero.title_end}
          </Text>
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.200"
          mb={10}
          fontWeight="light"
        >
          {t.hero.subtitle}
        </Text>

        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={4}
          justify="center"
        >
          <Button
            size="lg"
            colorScheme="orange"
            leftIcon={<Calendar size={20} />}
            onClick={() => scrollToSection("pricing")}
            px={8}
            py={7}
          >
            {t.hero.check_avail}
          </Button>
          <Button
            size="lg"
            variant="outline"
            colorScheme="whiteAlpha"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={() => scrollToSection("rooms")}
            px={8}
            py={7}
            backdropFilter="blur(5px)"
          >
            {t.hero.explore}
          </Button>
        </Flex>

        <Flex mt={12} justify="center" gap={2}>
          {galleryImages.map((_, idx) => (
            <Box
              key={idx}
              as="button"
              onClick={() => setActiveImage(idx)}
              h="1"
              borderRadius="full"
              transition="all 0.3s"
              bg={activeImage === idx ? "white" : "whiteAlpha.500"}
              w={activeImage === idx ? "8" : "2"}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
