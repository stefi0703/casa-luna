import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Flex,
  Image,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { X, ArrowLeft, ArrowRight, Play } from "lucide-react";
import { prefix } from "../utils/prefix";

// --- Helper: Verifică dacă fișierul este video ---
const isVideo = (src) => {
  if (!src) return false;
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
};

// --- Helper: Generator URL Cloudinary cu protecție totală anti-eroare 400 ---
const getImageUrl = (path, transform = "c_fill,g_auto,w_800,h_600,f_auto,q_auto") => {
  if (!path) return "";
  
  if (path.includes("/") && !path.startsWith("http")) {
    return prefix(path);
  }
  
  if (path.startsWith("http")) return path;

  const safeTransform = transform.includes("w_1920") || transform.includes("w_1600") || transform.includes("w_1200")
    ? "c_limit,w_1920,f_auto,q_auto" 
    : transform;

  return `https://res.cloudinary.com/dnnpsia65/image/upload/${safeTransform}/${path}`;
};

// --- Componentă ajutătoare: Caching în fundal pentru imagini instant ---
const GalleryPreloader = ({ mediaList }) => {
  useEffect(() => {
    if (!mediaList || mediaList.length === 0 || typeof window === "undefined") return;

    const timeoutId = setTimeout(() => {
      mediaList.forEach((path) => {
        if (!isVideo(path)) {
          const imgCache = new window.Image();
          imgCache.src = getImageUrl(path, "c_limit,w_1920,f_auto,q_auto");
        }
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [mediaList]);

  return null;
};

export const Gallery = ({ t, isOpen, onClose }) => {
  // Generăm dinamic butoanele pe baza traducerilor curente
  const categories = useMemo(() => {
    if (!t?.rooms?.items) return ["All"];
    return ["All", ...t.rooms.items.map((room) => room.title)];
  }, [t]);
  
  const [currentCategory, setCurrentCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleriesData, setGalleriesData] = useState({});
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // Resetăm stările de navigare când se deschide sau se închide fereastra mare
  useEffect(() => {
    if (isOpen) {
      setCurrentCategory("All");
      setActiveIndex(0);
      setIsFullscreenOpen(false);
    }
  }, [isOpen]);

  // Preluarea dinamică a pozelor din Cloudinary (Sincronizată securizat pe baza room.id)
  useEffect(() => {
    if (!t?.rooms?.items) return;

    t.rooms.items.forEach((room) => {
      // Folosim ID-ul (ex: room.id) ca o ancoră fixă ce nu se schimbă la traducere
      const roomIdentifier = room.id || room.title; 

      if (room.cloudinaryTag) {
        fetch(`https://res.cloudinary.com/dnnpsia65/image/list/${room.cloudinaryTag}.json`)
          .then((res) => (res.ok ? res.json() : { resources: [] }))
          .then((data) => {
            const images = data.resources.map((resource) => resource.public_id);
            
            if (images.length > 0) {
              setGalleriesData((prev) => ({ ...prev, [roomIdentifier]: images }));
            } else {
              const fallback = room.gallery && room.gallery.length > 0 ? room.gallery : [room.img];
              setGalleriesData((prev) => ({ ...prev, [roomIdentifier]: fallback }));
            }
          })
          .catch(() => {
            const fallback = room.gallery && room.gallery.length > 0 ? room.gallery : [room.img];
            setGalleriesData((prev) => ({ ...prev, [roomIdentifier]: fallback }));
          });
      } else {
        const fallback = room.gallery && room.gallery.length > 0 ? room.gallery : [room.img];
        setGalleriesData((prev) => ({ ...prev, [roomIdentifier]: fallback }));
      }
    });
  }, [t?.rooms?.items]);

  // Maparea corectă a array-urilor de imagini (Fără riscul de duplicare la nivel de string-uri)
  const currentGalleryMedia = useMemo(() => {
    if (!t?.rooms?.items) return [];

    if (currentCategory === "All") {
      let allMedia = [];
      // Iterăm ordonat strict prin structura de JSON primită, nu prin cheile stării, evitând cumularea limbilor
      t.rooms.items.forEach((room) => {
        const roomIdentifier = room.id || room.title;
        const photos = galleriesData[roomIdentifier] || (room.gallery && room.gallery.length > 0 ? room.gallery : [room.img]);
        photos.forEach((img) => {
          if (!allMedia.includes(img)) allMedia.push(img); // Prevenim duplicatele identice
        });
      });
      return allMedia;
    }

    // Căutăm camera selectată în listă pentru a-i afla ID-ul stabil
    const targetRoom = t.rooms.items.find((room) => room.title === currentCategory);
    if (!targetRoom) return [];
    
    const roomIdentifier = targetRoom.id || targetRoom.title;
    return galleriesData[roomIdentifier] || (targetRoom.gallery && targetRoom.gallery.length > 0 ? targetRoom.gallery : [targetRoom.img]);
  }, [currentCategory, galleriesData, t]);

  // Resetăm indexul la 0 când se schimbă categoria sau se modifică limba
  useEffect(() => {
    setActiveIndex(0);
  }, [currentCategory, t]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? currentGalleryMedia.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === currentGalleryMedia.length - 1 ? 0 : prev + 1));
  };

  const activeMedia = currentGalleryMedia[activeIndex];

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => (!e.open ? onClose() : null)}
      size="full"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Backdrop bg="rgba(255, 255, 255, 0.75)" backdropFilter="blur(15px)" />
      
      {isOpen && currentGalleryMedia.length > 0 && (
        <GalleryPreloader mediaList={currentGalleryMedia} />
      )}

      <Dialog.Positioner>
        <Dialog.Content bg="white" color="gray.900" h="100vh" w="100vw" p={0} position="relative" border="none">
          
          <Dialog.CloseTrigger asChild position="absolute" top="6" right="6" zIndex={100}>
            <IconButton
              variant="ghost"
              color="gray.500"
              _hover={{ bg: "orange.50", color: "orange.600" }}
              aria-label="Close gallery"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              boxShadow="sm"
              bg="white"
            >
              <X size={26} style={{ display: "block" }} />
            </IconButton>
          </Dialog.CloseTrigger>

          <Flex direction="column" h="full" w="full" py={8} px={{ base: 4, md: 12 }} justify="space-between" align="center">
            
            {/* ZONA DE SUS: Titlu + Linie portocalie + Meniu Butoane */}
            <Flex direction="column" align="center" w="full" gap={3} mt={2}>
              <Heading as="h2" size="2xl" color="gray.900" fontWeight="bold" textAlign="center">
                {t.gallery?.title || "Galerie Foto"}
              </Heading>
              <Box w="60px" h="3px" bg="orange.500" borderRadius="full" mb={2} />

              <Flex gap={3} wrap="wrap" justify="center" maxW="4xl" zIndex={10}>
                {categories.map((cat) => {
                  const isActive = currentCategory === cat;
                  return (
                    <Button
                      key={cat}
                      size="sm"
                      variant={isActive ? "solid" : "outline"}
                      colorScheme="orange"
                      bg={isActive ? "orange.500" : "transparent"}
                      color={isActive ? "white" : "gray.700"}
                      borderRadius="full"
                      px={5}
                      fontWeight="semibold"
                      borderColor={isActive ? "orange.600" : "gray.200"}
                      _hover={{ bg: isActive ? "orange.600" : "orange.50", borderColor: "orange.300" }}
                      onClick={() => setCurrentCategory(cat)}
                    >
                      {cat}
                    </Button>
                  );
                })}
              </Flex>
            </Flex>

            {/* ZONA DE MIJLOC: SLIDER LUMINOS */}
            <Flex position="relative" flex={1} w="full" maxW="6xl" align="center" justify="center" my={4}>
              
              {currentGalleryMedia.length > 1 && (
                <IconButton
                  aria-label="Previous image"
                  position="absolute"
                  left={{ base: "0", md: "-4" }}
                  zIndex={50}
                  size="xl"
                  variant="ghost"
                  color="orange.500"
                  borderRadius="full"
                  bg="whiteAlpha.900"
                  boxShadow="md"
                  _hover={{ color: "orange.600", bg: "orange.50", transform: "scale(1.05)" }}
                  onClick={handlePrev}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowLeft size={36} style={{ display: "block" }} />
                </IconButton>
              )}

              <Flex 
                justify="center" 
                align="center" 
                w="full" 
                h="full" 
                maxH="62vh" 
                overflow="hidden" 
                p={2}
                cursor="zoom-in"
                onClick={() => setIsFullscreenOpen(true)}
              >
                {activeMedia ? (
                  isVideo(activeMedia) ? (
                    <Box
                      as="video"
                      src={getImageUrl(activeMedia, "vc_auto,q_auto")}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      w="full"
                      h="full"
                      maxH="62vh"
                      objectFit="contain"
                    />
                  ) : (
                    <Image
                      src={getImageUrl(activeMedia, "c_limit,w_1920,f_auto,q_auto")}
                      alt="Gallery Slider View"
                      maxW="full"
                      maxH="62vh"
                      objectFit="contain"
                      borderRadius="xl"
                      boxShadow="xl"
                    />
                  )
                ) : (
                  <Text color="gray.400" fontSize="md">Se încarcă galeria...</Text>
                )}
              </Flex>

              {currentGalleryMedia.length > 1 && (
                <IconButton
                  aria-label="Next image"
                  position="absolute"
                  right={{ base: "0", md: "-4" }}
                  zIndex={50}
                  size="xl"
                  variant="ghost"
                  color="orange.500"
                  borderRadius="full"
                  bg="whiteAlpha.900"
                  boxShadow="md"
                  _hover={{ color: "orange.600", bg: "orange.50", transform: "scale(1.05)" }}
                  onClick={handleNext}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowRight size={36} style={{ display: "block" }} />
                </IconButton>
              )}
            </Flex>

            {/* Contor discret jos */}
            {currentGalleryMedia.length > 0 && (
              <Box pb={2}>
                <Text color="gray.500" fontSize="md" fontWeight="bold" letterSpacing="widest">
                  {activeIndex + 1} / {currentGalleryMedia.length}
                </Text>
              </Box>
            )}

          </Flex>

          {/* LIGHTBOX FULLSCREEN TOTAL */}
          {isFullscreenOpen && activeMedia && (
            <Box
              position="fixed"
              inset={0}
              bg="rgba(0, 0, 0, 0.95)"
              zIndex={2000}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setIsFullscreenOpen(false)}
            >
              <IconButton
                position="absolute"
                top={6}
                right={6}
                color="whiteAlpha.800"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200", color: "white" }}
                onClick={() => setIsFullscreenOpen(false)}
                aria-label="Close Fullscreen"
                zIndex={2100}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
              >
                <X size={36} style={{ display: "block" }} />
              </IconButton>

              {currentGalleryMedia.length > 1 && (
                <IconButton
                  position="absolute"
                  left={6}
                  color="whiteAlpha.700"
                  variant="ghost"
                  _hover={{ color: "white", transform: "scale(1.1)" }}
                  onClick={handlePrev}
                  aria-label="Previous Fullscreen"
                  zIndex={2100}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowLeft size={48} style={{ display: "block" }} />
                </IconButton>
              )}

              <Box maxW="95vw" maxH="90vh" onClick={(e) => e.stopPropagation()} cursor="zoom-out">
                {isVideo(activeMedia) ? (
                  <video
                    src={getImageUrl(activeMedia, "vc_auto,q_auto")}
                    controls
                    autoPlay
                    loop
                    style={{ maxWidth: "95vw", maxHeight: "90vh", objectFit: "contain" }}
                  />
                ) : (
                  <Image
                    src={getImageUrl(activeMedia, "c_limit,w_1920,f_auto,q_auto")}
                    alt="Fullscreen View"
                    maxW="95vw"
                    maxH="90vh"
                    objectFit="contain"
                    borderRadius="md"
                    onClick={() => setIsFullscreenOpen(false)}
                  />
                )}
              </Box>

              {currentGalleryMedia.length > 1 && (
                <IconButton
                  position="absolute"
                  right={6}
                  color="whiteAlpha.700"
                  variant="ghost"
                  _hover={{ color: "white", transform: "scale(1.1)" }}
                  onClick={handleNext}
                  aria-label="Next Fullscreen"
                  zIndex={2100}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowRight size={48} style={{ display: "block" }} />
                </IconButton>
              )}

              <Box position="absolute" bottom={6}>
                <Text color="whiteAlpha.700" fontSize="sm" fontWeight="semibold" letterSpacing="wider">
                  {activeIndex + 1} / {currentGalleryMedia.length}
                </Text>
              </Box>
            </Box>
          )}

        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};