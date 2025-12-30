import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  Flex,
  Dialog,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { X, Play, ArrowLeft } from "lucide-react";
import { prefix } from "../utils/prefix";

const isVideo = (src) => {
  if (!src) return false;
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
};

export const Gallery = ({ t, isOpen, onClose }) => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'cinema'
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setViewMode("grid");
      setCurrentCategory("All");
    }
  }, [isOpen]);

  const allMedia = useMemo(() => {
    let media = [];
    t.rooms.items.forEach((room) => {
      if (room.img) media.push({ src: room.img, category: room.title });
      if (room.gallery) {
        room.gallery.forEach((g) => {
          if (g !== room.img) media.push({ src: g, category: room.title });
        });
      }
    });
    return media;
  }, [t]);

  const filteredMedia = useMemo(() => {
    if (currentCategory === "All") return allMedia;
    return allMedia.filter((item) => item.category === currentCategory);
  }, [currentCategory, allMedia]);

  const categories = useMemo(() => {
    const cats = new Set(allMedia.map((m) => m.category));
    return ["All", ...Array.from(cats)];
  }, [allMedia]);

  const handleOpenImage = (index) => {
    setActiveIndex(index);
    setViewMode("cinema");
  };

  const activeMediaItem = filteredMedia[activeIndex];

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      size="full"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Backdrop bg="blackAlpha.900" backdropFilter="blur(8px)" />
      <Dialog.Positioner>
        <Dialog.Content bg="gray.900" boxShadow="none" h="100vh" w="100vw">
          {/* Header Actions */}
          <Box
            position="absolute"
            top="4"
            right="4"
            zIndex={50}
            display="flex"
            gap={2}
          >
            {/* Back Button (Only in Cinema Mode) */}
            {viewMode === "cinema" && (
              <Button
                onClick={() => setViewMode("grid")}
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                <ArrowLeft size={20} style={{ marginRight: "8px" }} /> Back to
                Grid
              </Button>
            )}

            {/* Close Button */}
            <IconButton
              onClick={onClose}
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              aria-label="Close"
            >
              <X size={32} />
            </IconButton>
          </Box>

          <Dialog.Body p={0} h="full" display="flex" flexDirection="column">
            {/* --- VIEW 1: GRID MODE --- */}
            {viewMode === "grid" && (
              <Box
                p={{ base: 4, md: 12 }}
                h="full"
                overflowY="auto"
                className="custom-scrollbar"
              >
                <Box textAlign="center" mb={10} pt={8}>
                  <Heading as="h2" size="2xl" mb={4} color="white">
                    Gallery
                  </Heading>
                  <Text color="gray.400">Explore our cabin collection.</Text>
                </Box>

                {/* Filters */}
                <Flex wrap="wrap" justify="center" gap={3} mb={10}>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={currentCategory === cat ? "solid" : "outline"}
                      colorPalette={currentCategory === cat ? "orange" : "gray"}
                      borderColor={
                        currentCategory === cat ? "transparent" : "gray.600"
                      }
                      color={currentCategory === cat ? "black" : "gray.300"}
                      _hover={{
                        bg: "orange.500",
                        color: "black",
                        borderColor: "transparent",
                      }}
                      onClick={() => {
                        setCurrentCategory(cat);
                        setActiveIndex(0);
                      }}
                      borderRadius="full"
                      px={6}
                    >
                      {cat}
                    </Button>
                  ))}
                </Flex>

                {/* Grid */}
                <SimpleGrid
                  columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
                  gap={4}
                  maxW="8xl"
                  mx="auto"
                >
                  {filteredMedia.map((item, index) => {
                    const isVid = isVideo(item.src);
                    return (
                      <Box
                        key={index}
                        borderRadius="lg"
                        overflow="hidden"
                        cursor="pointer"
                        position="relative"
                        aspectRatio={1}
                        bg="gray.800"
                        role="group"
                        onClick={() => handleOpenImage(index)}
                        borderWidth="1px"
                        borderColor="transparent"
                        _hover={{ borderColor: "orange.500" }}
                        transition="all 0.2s"
                      >
                        {isVid ? (
                          <Box
                            w="full"
                            h="full"
                            position="relative"
                            display="flex"
                            align="center"
                            justify="center"
                          >
                            <video
                              src={prefix(item.src)}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              muted
                              preload="metadata"
                            />
                            <Box
                              position="absolute"
                              inset={0}
                              bg="blackAlpha.400"
                              display="flex"
                              align="center"
                              justify="center"
                            >
                              <Play size={24} color="white" fill="white" />
                            </Box>
                          </Box>
                        ) : (
                          <Image
                            src={prefix(item.src)}
                            alt="Gallery"
                            w="full"
                            h="full"
                            objectFit="cover"
                            transition="transform 0.4s"
                            _groupHover={{ transform: "scale(1.05)" }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>
            )}

            {/* --- VIEW 2: CINEMA MODE --- */}
            {viewMode === "cinema" && activeMediaItem && (
              <Grid
                templateRows={{ base: "1fr auto", md: "1fr 140px" }}
                h="full"
                w="full"
                maxW="9xl"
                mx="auto"
                gap={4}
                p={{ base: 4, md: 6 }}
              >
                {/* Main Viewer */}
                <Flex
                  justify="center"
                  align="center"
                  position="relative"
                  bg="black"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="dark-lg"
                  w="full"
                  h="full"
                >
                  {isVideo(activeMediaItem.src) ? (
                    <Box
                      as="video"
                      src={prefix(activeMediaItem.src)}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      objectFit="contain"
                      w="full"
                      h="full"
                      maxH="85vh"
                      sx={{ outline: "none" }}
                    />
                  ) : (
                    <Image
                      src={prefix(activeMediaItem.src)}
                      alt="Main view"
                      w="full"
                      h="full"
                      objectFit="contain"
                      maxH="85vh"
                    />
                  )}
                  <Box
                    position="absolute"
                    bottom={4}
                    left={4}
                    bg="blackAlpha.700"
                    px={3}
                    py={1}
                    borderRadius="md"
                  >
                    <Text color="white" fontSize="sm" fontWeight="bold">
                      {activeMediaItem.category} • {activeIndex + 1} /{" "}
                      {filteredMedia.length}
                    </Text>
                  </Box>
                </Flex>

                {/* Thumbnail Strip */}
                <Box
                  overflowY="auto"
                  className="custom-scrollbar"
                  maxH={{ base: "100px", md: "140px" }}
                >
                  <SimpleGrid columns={{ base: 5, md: 8, lg: 12 }} spacing={2}>
                    {filteredMedia.map((item, index) => {
                      const isVid = isVideo(item.src);
                      const isActive = index === activeIndex;

                      return (
                        <Box
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          cursor="pointer"
                          borderRadius="md"
                          overflow="hidden"
                          borderWidth="2px"
                          borderColor={isActive ? "orange.500" : "transparent"}
                          opacity={isActive ? 1 : 0.4}
                          _hover={{ opacity: 1 }}
                          transition="all 0.2s"
                          aspectRatio={1}
                          bg="gray.800"
                          position="relative"
                        >
                          {isVid ? (
                            <Box
                              w="full"
                              h="full"
                              display="flex"
                              align="center"
                              justify="center"
                            >
                              <video
                                src={prefix(item.src)}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                muted
                                preload="metadata"
                              />
                            </Box>
                          ) : (
                            <Image
                              src={prefix(item.src)}
                              alt="Thumb"
                              w="full"
                              h="full"
                              objectFit="cover"
                            />
                          )}
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              </Grid>
            )}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
