"use client";
import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { galleryImages as fallbackImages } from "../data/content";
import { prefix } from "../utils/prefix";
import { Box, Heading, Text, Button, Flex, Container } from "@chakra-ui/react";

export default function Hero({ t, scrollToSection }) {
  const [activeImage, setActiveImage] = useState(0);
  const [desktopImages, setDesktopImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);

  // 1. Detectăm dimensiunea ecranului la nivel de JS pentru a gestiona corect bulinele (dots)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); // 768px este breakpoint-ul 'md' din Chakra
    };

    handleResize(); // Verificare inițială
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Preluăm listele de imagini separat din Cloudinary
  useEffect(() => {
    const fetchDesktop = fetch(
      "https://res.cloudinary.com/dnnpsia65/image/list/hero.json",
    )
      .then((res) => (res.ok ? res.json() : { resources: [] }))
      .catch(() => ({ resources: [] }));

    const fetchMobile = fetch(
      "https://res.cloudinary.com/dnnpsia65/image/list/hero-mobile.json",
    )
      .then((res) => (res.ok ? res.json() : { resources: [] }))
      .catch(() => ({ resources: [] }));

    Promise.all([fetchDesktop, fetchMobile]).then(
      ([desktopData, mobileData]) => {
        const dImages = desktopData.resources.map((r) => r.public_id);
        const mImages = mobileData.resources.map((r) => r.public_id);

        // Setăm listele separat. Dacă una e goală, facem fallback de siguranță
        setDesktopImages(dImages.length > 0 ? dImages : fallbackImages);
        setMobileImages(mImages.length > 0 ? mImages : fallbackImages);
      },
    );
  }, []);

  // Resetăm indexul activ la zero dacă se schimbă lista de imagini din cauza resize-ului
  useEffect(() => {
    setActiveImage(0);
  }, [isMobileView]);

  // 3. Intervalul pentru slider (se adaptează listei active în funcție de ecran)
  useEffect(() => {
    const activeListLength = isMobileView
      ? mobileImages.length
      : desktopImages.length;
    if (activeListLength === 0) return;

    const interval = setInterval(() => {
      setActiveImage((prevIndex) =>
        prevIndex >= activeListLength - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [desktopImages, mobileImages, isMobileView]);

  // Helper generare URL (Cloudinary vs Local static)
  const getImageUrl = (imgData, isMobile = false) => {
    if (!imgData) return "";
    if (typeof imgData === "object") {
      if (isMobile && imgData.urlMobile) return prefix(imgData.urlMobile);
      return prefix(imgData.url);
    }

    const transform = isMobile
      ? "c_fill,g_center,w_600,h_1000,f_auto,q_auto"
      : "c_fill,g_auto,w_1920,h_1080,f_auto,q_auto";

    return `https://res.cloudinary.com/dnnpsia65/image/upload/${transform}/${imgData}`;
  };

  const currentList = isMobileView ? mobileImages : desktopImages;
  if (currentList.length === 0) return <Box h="100vh" bg="gray.900" />;

  const currentImage = currentList[activeImage % currentList.length];

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
            md: "linear(to-r, blackAlpha.700 30%, blackAlpha.200 80%)",
          }}
          zIndex={10}
        />

        {/* Imagine Mobile - Rulează EXCLUSIV lista hero-mobile */}
        <Box
          as="img"
          src={getImageUrl(currentImage, true)}
          alt="Pensiune Casa Luna Rucăr Argeș - Cazare de poveste pe Culoarul Rucăr-Bran"
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
          display={{ base: "block", md: "none" }}
        />

        {/* Imagine Desktop - Rulează EXCLUSIV lista hero */}
        <Box
          as="img"
          src={getImageUrl(currentImage, false)}
          alt="Pensiune Casa Luna Rucăr Argeș - Cazare de poveste pe Culoarul Rucăr-Bran"
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
          display={{ base: "none", md: "block" }}
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
          {/* Textul */}
          <Box maxW={{ base: "full", md: "xl", lg: "2xl" }} order={1}>
            <Heading
              as="h1"
              size={{ base: "2xl", md: "4xl", lg: "5xl" }}
              color="white"
              mb={4}
              lineHeight="shorter"
              textShadow="0 4px 12px rgba(0,0,0,0.6)"
            >
              {t.hero.title_start}{" "}
              <Text
                as="span"
                color="orange.200"
                display={{ base: "block", md: "inline" }}
              >
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

          {/* Butoanele */}
          <Box mt={{ base: 0, md: 8 }} order={2} w="full">
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              w={{ base: "full", sm: "auto" }}
              maxW={{ base: "280px", sm: "none" }}
              mx={{ base: "auto", md: "0" }}
              justify={{ base: "center", md: "flex-start" }}
              align="center"
            >
              <Button
                size={{ base: "md", md: "lg" }}
                variant="outline"
                bg="rgba(251, 146, 60, 0.4)"
                borderColor="orange.300"
                color="white"
                _hover={{ bg: "rgba(251, 146, 60, 0.55)" }}
                _active={{ bg: "rgba(251, 146, 60, 0.7)" }}
                leftIcon={<Calendar size={18} />}
                onClick={() => scrollToSection("contact-section")}
                w={{ base: "full", sm: "auto" }}
                px={8}
                py={{ base: 5, md: 7 }}
                backdropFilter="blur(12px)"
                textShadow="0 1px 4px rgba(0,0,0,0.4)"
              >
                {t.hero.check_avail}
              </Button>

              <Button
                size={{ base: "md", md: "lg" }}
                variant="outline"
                bg="rgba(23, 25, 35, 0.45)"
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

      {/* Bulinele de navigare (Sincronizate dinamic cu tipul de ecran) */}
      <Flex
        position="absolute"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        zIndex={20}
        gap={2}
        justify="center"
      >
        {currentList.map((_, idx) => (
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