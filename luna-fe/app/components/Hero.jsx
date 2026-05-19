"use client";
import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { galleryImages } from "../data/content";
import { prefix } from "../utils/prefix"; 
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
      overflow="hidden"
      bg="gray.900"
    >
      {/* Zona de fundal (Imagini + Overlay) */}
      <Box position="absolute" inset={0} zIndex={0}>
        <Box 
          position="absolute" 
          inset={0} 
          bgGradient={{
            base: "linear(to-b, blackAlpha.700 20%, blackAlpha.400 50%, blackAlpha.700 90%)",
            md: "linear(to-r, blackAlpha.700 30%, blackAlpha.200 80%)"
          }}
          zIndex={10} 
        />
        
        <Box
          as="img"
          src={prefix(galleryImages[activeImage].urlMobile || galleryImages[activeImage].url)} 
          alt="Hero Mobile"
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
          display={{ base: "block", md: "none" }}
          transition="opacity 1s ease-in-out"
        />

        <Box
          as="img"
          src={prefix(galleryImages[activeImage].url)} 
          alt="Hero Desktop"
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
          display={{ base: "none", md: "block" }}
          transition="opacity 1s ease-in-out"
        />
      </Box>

      {/* Container Conținut */}
      <Container
        position="relative"
        zIndex={20}
        maxW="7xl"
        w="full"
        px={{ base: 6, md: 12 }}
        h={{ base: "full", md: "auto" }}
        pt={{ base: "120px", md: 0 }}
        pb={{ base: "80px", md: 0 }}
      >
        <Flex
          direction="column"
          h={{ base: "full", md: "auto" }}
          justifyContent={{ base: "space-between", md: "flex-start" }}
          textAlign={{ base: "center", md: "left" }}
        >
          {/* Blocul 1: Textul */}
          <Box 
            maxW={{ base: "full", md: "xl", lg: "2xl" }}
            order={1}
          >
            <Heading
              as="h1"
              size={{ base: "2xl", md: "4xl", lg: "5xl" }}
              color="white"
              mb={4}
              lineHeight="shorter"
              textShadow="0 4px 12px rgba(0,0,0,0.6)"
            >
              {t.hero.title_start}{" "}
              <Text as="span" color="orange.200" display={{ base: "block", md: "inline" }}>
                {t.hero.title_end}
              </Text>
            </Heading>
            
            <Text
              fontSize={{ base: "md", md: "xl" }}
              color="gray.100"
              fontWeight="normal"
              textShadow="0 2px 8px rgba(0,0,0,0.7)"
            >
              {t.hero.subtitle}
            </Text>
          </Box>

          {/* Blocul 2: Butoanele optimizate pentru contrast universal */}
          <Box 
            mt={{ base: 0, md: 8 }}
            order={2}
            w="full"
          >
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              w={{ base: "full", sm: "auto" }}
              maxW={{ base: "280px", sm: "none" }}
              mx={{ base: "auto", md: "0" }}
              justify={{ base: "center", md: "flex-start" }}
              align="center"
            >
              {/* 1. Buton Rezervare (Portocaliu Sticlos cu Text Întunecat/Contrastant) */}
              <Button
                size={{ base: "md", md: "lg" }}
                variant="outline"
                bg="rgba(251, 146, 60, 0.4)" // Creștem opacitatea fundalului portocaliu
                borderColor="orange.300"
                color="white" // Textul alb oferă contrastul maxim
                _hover={{ bg: "rgba(251, 146, 60, 0.55)" }}
                _active={{ bg: "rgba(251, 146, 60, 0.7)" }}
                leftIcon={<Calendar size={18} />}
                onClick={() => scrollToSection("pricing")}
                w={{ base: "full", sm: "auto" }}
                px={8}
                py={{ base: 5, md: 7 }}
                backdropFilter="blur(12px)" // Blur mai puternic pentru efect de sticlă mată realizat corect
                textShadow="0 1px 4px rgba(0,0,0,0.4)"
              >
                {t.hero.check_avail}
              </Button>
              
              {/* 2. Buton Explorare (Negru/Gri Sticlos - se decupează perfect pe peretele alb) */}
              <Button
                size={{ base: "md", md: "lg" }}
                variant="outline"
                bg="rgba(23, 25, 35, 0.45)" // Fundal închis semitransparent (Chakra gray.800 alpha)
                borderColor="whiteAlpha.600"
                color="white"
                _hover={{ bg: "rgba(23, 25, 35, 0.65)" }}
                _active={{ bg: "rgba(23, 25, 35, 0.8)" }}
                onClick={() => scrollToSection("rooms")}
                w={{ base: "full", sm: "auto" }}
                px={8}
                py={{ base: 5, md: 7 }}
                backdropFilter="blur(12px)"
                textShadow="0 1px 4px rgba(0,0,0,0.4)"
              >
                {t.hero.explore}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>

      {/* Slider dots */}
      <Flex 
        position="absolute"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        zIndex={20}
        gap={2}
        justify="center"
      >
        {galleryImages.map((_, idx) => (
          <Box
            key={idx}
            as="button"
            onClick={() => setActiveImage(idx)}
            h="1.5"
            borderRadius="full"
            transition="all 0.3s"
            bg={activeImage === idx ? "orange.300" : "whiteAlpha.500"}
            w={activeImage === idx ? "8" : "2"}
          />
        ))}
      </Flex>
    </Box>
  );
}