"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  Wifi,
  Flame,
  Wind,
  Coffee,
  Zap,
  Baby,
  Mountain,
  Key,
  ArrowRight,
  ArrowLeft,
  MapPin,
  X,
  Play,
  Sparkles,
  ThermometerSun,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";
import { prefix } from "../utils/prefix";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Button,
  Badge,
  IconButton,
  HStack,
  Dialog,
  useDisclosure,
  VStack,
  Circle,
} from "@chakra-ui/react";

const icons = [
  Wifi,
  Sparkles,
  Flame,
  ThermometerSun,
  UtensilsCrossed,
  Mountain,
  Baby,
  CheckCircle2,
];

// --- Helper: Check if file is video ---
const isVideo = (src) => {
  if (!src) return false;
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
};

// --- Helper: URL generator pentru Cloudinary (Simplu și stabil) ---
const getImageUrl = (
  path,
  transform = "c_fill,g_auto,w_600,h_400,f_auto,q_auto",
) => {
  if (!path) return "";

  if (
    path.includes("/") &&
    (path.endsWith(".jpg") ||
      path.endsWith(".png") ||
      path.endsWith(".jpeg") ||
      path.endsWith(".mp4"))
  ) {
    return prefix(path);
  }

  const safeTransform = transform.includes("w_1920")
    ? "c_limit,w_1920,f_auto,q_auto"
    : transform;

  return `https://res.cloudinary.com/dnnpsia65/image/upload/${safeTransform}/${path}`;
};

// ============================================================================
// COMPONENTA AJUTĂTOARE: PRELOADER UNIVERSAL (Încarcă în secret pozele mari în cache)
// ============================================================================
const GalleryPreloader = ({ mediaList }) => {
  useEffect(() => {
    if (!mediaList || mediaList.length === 0 || typeof window === "undefined")
      return;

    // Lăsăm o mică fereastră de 300ms ca browserul să încarce elementele vizuale prioritare
    const timeoutId = setTimeout(() => {
      mediaList.forEach((media) => {
        if (!isVideo(media)) {
          const imgCache = new window.Image();
          imgCache.src = `https://res.cloudinary.com/dnnpsia65/image/upload/c_limit,w_1920,f_auto,q_auto/${media}`;
        }
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [mediaList]);

  return null;
};

// --- Component: Intro ---
export const Intro = ({ t }) => (
  <Box py={24} bg="white">
    <Container maxW="5xl">
      <Flex direction={{ base: "column", md: "row" }} gap={12} align="center">
        <Box flex={1}>
          <Text
            color="orange.600"
            fontWeight="bold"
            letterSpacing="widest"
            textTransform="uppercase"
            fontSize="sm"
            mb={2}
          >
            {t.intro.welcome}
          </Text>
          <Heading as="h2" size="2xl" mb={4} color="gray.900">
            {t.intro.title}
          </Heading>
          <Text color="gray.600" fontSize="lg" mb={6}>
            {t.intro.text}
          </Text>
          <HStack spacing={8} pt={4}>
            {[
              { val: "6", lbl: t.intro.bedrooms },
              { val: "7", lbl: t.intro.baths },
            ].map((stat, i) => (
              <Box key={i}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  lineHeight="1"
                  color="gray.900"
                >
                  {stat.val}
                </Text>
                <Text color="gray.500">{stat.lbl}</Text>
              </Box>
            ))}
          </HStack>
        </Box>
        <Box flex={1} position="relative" w="full" display="flex" justify="center">
          <Image
            src={getImageUrl("intro", "c_limit,w_1000,f_auto,q_auto")}
            borderRadius="2xl"
            boxShadow="xl"
            w="auto"
            maxW="full"
            h="auto"
            objectFit="contain"
            alt="Intro"
          />
        </Box>
      </Flex>
    </Container>
  </Box>
);

// --- Component: Rooms ---
export const Rooms = ({ t }) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);

  const [roomGalleries, setRoomGalleries] = useState({});
  const [currentMediaIndices, setCurrentMediaIndices] = useState(
    t.rooms.items.map(() => 0),
  );

  useEffect(() => {
    t.rooms.items.forEach((room, index) => {
      if (room.cloudinaryTag) {
        fetch(
          `https://res.cloudinary.com/dnnpsia65/image/list/${room.cloudinaryTag}.json`,
        )
          .then((res) => {
            if (!res.ok) throw new Error("Eroare rețea");
            return res.json();
          })
          .then((data) => {
            const images = data.resources.map((resource) => resource.public_id);
            setRoomGalleries((prev) => ({
              ...prev,
              [index]: images,
            }));
          })
          .catch((err) => {
            console.warn(
              `Fallback local pentru ${room.title}: Nu s-au găsit imagini cu tag-ul '${room.cloudinaryTag}'`,
            );
          });
      }
    });
  }, [t.rooms.items]);

  const handleOpenRoom = (room, cardIndex) => {
    setSelectedRoom(room);
    setModalActiveIndex(currentMediaIndices[cardIndex]);
    onOpen();
  };

  const handlePrevMedia = (e, cardIndex, gallery) => {
    e.stopPropagation();
    setCurrentMediaIndices((prev) => {
      const nextIndices = [...prev];
      nextIndices[cardIndex] =
        nextIndices[cardIndex] === 0
          ? gallery.length - 1
          : nextIndices[cardIndex] - 1;
      return nextIndices;
    });
  };

  const handleNextMedia = (e, cardIndex, gallery) => {
    e.stopPropagation();
    setCurrentMediaIndices((prev) => {
      const nextIndices = [...prev];
      nextIndices[cardIndex] =
        nextIndices[cardIndex] === gallery.length - 1
          ? 0
          : nextIndices[cardIndex] + 1;
      return nextIndices;
    });
  };

  const currentRoomIndex = t.rooms.items.findIndex(
    (r) => r.title === selectedRoom?.title,
  );
  const galleryMedia =
    roomGalleries[currentRoomIndex] ||
    (selectedRoom ? selectedRoom.gallery || [selectedRoom.img] : []);
  const activeMedia = galleryMedia[modalActiveIndex];

  return (
    <>
      {/* Activăm preîncărcarea inteligentă doar când modalul este deschis deschis */}
      {open && <GalleryPreloader mediaList={galleryMedia} />}

      <Box id="rooms" py={24} bg="gray.50">
        <Container maxW="container.xl">
          <Box textAlign="center" mb={16}>
            <Heading as="h2" size="2xl" mb={4} color="gray.900">
              {t.rooms.title}
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {t.rooms.subtitle}
            </Text>
          </Box>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
            gap={8}
          >
            {t.rooms.items.map((room, i) => {
              const currentGallery =
                roomGalleries[i] ||
                (room.gallery && room.gallery.length > 0
                  ? room.gallery
                  : [room.img]);
              const activeCardMedia = currentGallery[currentMediaIndices[i]];
              const hasMultipleImages = currentGallery.length > 1;

              return (
                <Box
                  key={i}
                  bg="white"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="sm"
                  _hover={{ boxShadow: "xl" }}
                  transition="all 0.3s"
                  display="flex"
                  flexDirection="column"
                  role="group"
                  position="relative"
                >
                  <Box position="relative" h="64" overflow="hidden">
                    {hasMultipleImages && (
                      <IconButton
                        aria-label="Previous image"
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={25}
                        size="sm"
                        bg="white"
                        color="gray.900"
                        borderRadius="full"
                        boxShadow="0 2px 10px rgba(0,0,0,0.3)"
                        _hover={{
                          bg: "gray.100",
                          transform: "translateY(-50%) scale(1.1)",
                        }}
                        onClick={(e) => handlePrevMedia(e, i, currentGallery)}
                        opacity={1}
                        transition="all 0.2s"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ArrowLeft size={18} style={{ display: "block" }} />
                      </IconButton>
                    )}

                    <Box
                      w="full"
                      h="full"
                      cursor="pointer"
                      onClick={() => handleOpenRoom(room, i)}
                    >
                      {isVideo(activeCardMedia) ? (
                        <Box
                          as="video"
                          src={getImageUrl(activeCardMedia, "vc_auto,q_auto")}
                          w="full"
                          h="full"
                          objectFit="cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <Image
                          src={getImageUrl(
                            activeCardMedia,
                            "c_fill,g_auto,w_600,h_400,f_auto,q_auto",
                          )}
                          alt={room.title}
                          w="full"
                          h="full"
                          objectFit="cover"
                          transition="transform 0.7s"
                          _groupHover={{ transform: "scale(1.02)" }}
                        />
                      )}
                    </Box>

                    {hasMultipleImages && (
                      <IconButton
                        aria-label="Next image"
                        position="absolute"
                        right="3"
                        top="50%"
                        transform="translateY(-50%)"
                        zIndex={25}
                        size="sm"
                        bg="white"
                        color="gray.900"
                        borderRadius="full"
                        boxShadow="0 2px 10px rgba(0,0,0,0.3)"
                        _hover={{
                          bg: "gray.100",
                          transform: "translateY(-50%) scale(1.1)",
                        }}
                        onClick={(e) => handleNextMedia(e, i, currentGallery)}
                        opacity={1}
                        transition="all 0.2s"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ArrowRight size={18} style={{ display: "block" }} />
                      </IconButton>
                    )}

                    {hasMultipleImages && (
                      <Box
                        position="absolute"
                        top="3"
                        right="3"
                        bg="blackAlpha.700"
                        px={2}
                        py={0.5}
                        borderRadius="md"
                        zIndex={20}
                        pointerEvents="none"
                      >
                        <Text color="white" fontSize="xs" fontWeight="bold">
                          {currentMediaIndices[i] + 1} / {currentGallery.length}
                        </Text>
                      </Box>
                    )}

                    <Flex
                      position="absolute"
                      inset={0}
                      bg="blackAlpha.300"
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s"
                      align="center"
                      justify="center"
                      cursor="pointer"
                      onClick={() => handleOpenRoom(room, i)}
                      pointerEvents="none"
                    >
                      <Badge
                        variant="solid"
                        bg="whiteAlpha.950"
                        color="gray.900"
                        px={4}
                        py={2}
                        borderRadius="full"
                        textTransform="none"
                        fontSize="sm"
                        boxShadow="md"
                        pointerEvents="auto"
                      >
                        Mărește Galeria
                      </Badge>
                    </Flex>
                  </Box>

                  <Box
                    p={6}
                    flex="1"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Heading as="h3" size="md" mb={2} color="gray.800">
                        {room.title}
                      </Heading>
                      <Text
                        fontSize="md"
                        color="gray.600"
                        mb={4}
                        lineHeight="tall"
                      >
                        {room.desc}
                      </Text>
                    </Box>
                    <Flex wrap="wrap" gap={2} mt="auto">
                      {room.feats.map((f, idx) => (
                        <Badge
                          key={idx}
                          variant="surface"
                          colorPalette="gray"
                          px={2}
                          py={1}
                        >
                          {f}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* --- GALLERY MODAL --- */}
      <Dialog.Root
        open={open}
        onOpenChange={(e) => (e.open ? onOpen() : onClose())}
        size="full"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Backdrop bg="blackAlpha.950" backdropFilter="blur(5px)" />
        <Dialog.Positioner>
          <Dialog.Content bg="transparent" boxShadow="none" h="100vh" w="100vw">
            <Dialog.CloseTrigger
              asChild
              position="absolute"
              top="4"
              right="4"
              zIndex={50}
            >
              <IconButton
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                aria-label="Close gallery"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
              >
                <X size={32} style={{ display: "block" }} />
              </IconButton>
            </Dialog.CloseTrigger>

            <Dialog.Body p={0} h="full" display="flex" flexDirection="column">
              {selectedRoom && (
                <Grid
                  templateRows={{ base: "1fr auto", md: "1fr 160px" }}
                  h="full"
                  w="full"
                  maxW="8xl"
                  mx="auto"
                  gap={4}
                  p={{ base: 4, md: 8 }}
                  position="relative"
                >
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
                    {activeMedia && isVideo(activeMedia) ? (
                      <Box
                        as="video"
                        src={getImageUrl(activeMedia, "vc_auto,q_auto")}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        objectFit="contain"
                        w="full"
                        h="full"
                        maxH="80vh"
                        sx={{ outline: "none" }}
                      />
                    ) : (
                      <Image
                        src={getImageUrl(
                          activeMedia,
                          "c_contain,w_1920,h_1080,f_auto,q_auto",
                        )}
                        alt="Main view"
                        w="full"
                        h="full"
                        objectFit="contain"
                        maxH="80vh"
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
                      pointerEvents="none"
                    >
                      <Text color="white" fontSize="sm" fontWeight="bold">
                        {modalActiveIndex + 1} / {galleryMedia.length}
                      </Text>
                    </Box>
                  </Flex>

                  {/* Săgeată Stânga */}
                  <IconButton
                    aria-label="Previous image"
                    position="absolute"
                    left="4"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={60}
                    size="lg"
                    bg="blackAlpha.600"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: "whiteAlpha.300" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalActiveIndex((prev) =>
                        prev === 0 ? galleryMedia.length - 1 : prev - 1,
                      );
                    }}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ArrowLeft size={28} style={{ display: "block" }} />
                  </IconButton>

                  {/* Săgeată Dreapta */}
                  <IconButton
                    aria-label="Next image"
                    position="absolute"
                    right="4"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={60}
                    size="lg"
                    bg="blackAlpha.600"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: "whiteAlpha.300" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalActiveIndex((prev) =>
                        prev === galleryMedia.length - 1 ? 0 : prev + 1,
                      );
                    }}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ArrowRight size={28} style={{ display: "block" }} />
                  </IconButton>

                  <Box
                    overflowY="auto"
                    pr={2}
                    className="custom-scrollbar"
                    maxH={{ base: "120px", md: "160px" }}
                  >
                    <SimpleGrid
                      columns={{ base: 4, sm: 5, md: 8, lg: 10 }}
                      spacing={3}
                    >
                      {galleryMedia.map((media, index) => {
                        const isVid = isVideo(media);
                        const isActive = index === modalActiveIndex;

                        return (
                          <Box
                            key={index}
                            onClick={() => setModalActiveIndex(index)}
                            cursor="pointer"
                            borderRadius="md"
                            overflow="hidden"
                            borderWidth="2px"
                            borderColor={
                              isActive ? "orange.500" : "transparent"
                            }
                            opacity={isActive ? 1 : 0.6}
                            _hover={{ opacity: 1 }}
                            transition="all 0.2s"
                            position="relative"
                            aspectRatio={1}
                            bg="gray.900"
                          >
                            {isVid ? (
                              <Box
                                w="full"
                                h="full"
                                display="flex"
                                align="center"
                                justify="center"
                                position="relative"
                              >
                                <video
                                  src={getImageUrl(
                                    media,
                                    "vc_auto,w_150,h_150,c_fill",
                                  )}
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
                                  <Play size={16} color="white" fill="white" />
                                </Box>
                              </Box>
                            ) : (
                              <Image
                                src={getImageUrl(
                                  media,
                                  "c_thumb,w_150,h_150,f_auto,q_auto",
                                )}
                                alt={`Thumbnail ${index}`}
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
    </>
  );
};

// --- Component: Amenities ---
export const Amenities = ({ t }) => {
  const router = useRouter();

  return (
    <Box id="amenities" py={16} bg="gray.900" color="gray.300">
      <Container maxW="container.lg">
        <Flex
          justify="space-between"
          align="flex-end"
          mb={10}
          borderBottomWidth="1px"
          borderColor="gray.800"
          pb={6}
        >
          <Box>
            <Heading as="h2" size="xl" color="white" mb={1}>
              {t.amenities.title}
            </Heading>
            <Text fontSize="md">{t.amenities.subtitle}</Text>
          </Box>
        </Flex>

        <Flex wrap="wrap" justify="center" gap={8}>
          {t.amenities.items.map((item, i) => {
            const Icon = icons[i] || Star;
            return (
              <VStack
                key={i}
                spacing={3}
                textAlign="center"
                alignItems="center"
                role="group"
                w={{ base: "45%", md: "20%" }}
                minW="140px"
              >
                <Flex
                  p={4}
                  bg="gray.800"
                  color="orange.500"
                  borderRadius="full"
                  justifyContent="center"
                  alignItems="center"
                  transition="all 0.3s"
                  _groupHover={{
                    bg: "orange.600",
                    color: "white",
                    transform: "translateY(-3px)",
                  }}
                >
                  <Icon size={28} />
                </Flex>
                <Box>
                  <Text fontWeight="bold" color="white" fontSize="lg" mb={0.5}>
                    {item.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    _groupHover={{ color: "gray.400" }}
                    lineHeight="shorter"
                  >
                    {item.desc}
                  </Text>
                </Box>
              </VStack>
            );
          })}
        </Flex>

        <Flex justify="center" mt={{ base: 6, md: 10 }}>
          <Button
            size={{ base: "md", md: "xl" }}
            bg="orange.500"
            color="white"
            _hover={{ bg: "orange.600", transform: "scale(1.03)" }}
            transition="all 0.2s"
            rounded="full"
            px={{ base: 6, md: 12 }}
            fontWeight="bold"
            fontSize={{ base: "xs", md: "md" }}
            boxShadow="0 4px 15px 0 rgba(237, 137, 54, 0.3)"
            onClick={() => router.push(prefix("/facilities"))}
          >
            {t.amenities.view_guide}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

// --- Component: Location ---
export const Location = ({ t }) => (
  <Box
    id="location"
    position="relative"
    h={{ base: "auto", md: "750px" }}
    py={{ base: 16, md: 0 }}
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.200"
    overflow="hidden"
  >
    <Box position="absolute" inset={0}>
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
        w="full"
        h="full"
        objectFit="cover"
        alt="Map"
        filter="grayscale(100%) opacity(0.5)"
      />
    </Box>
    <Box
      position="relative"
      zIndex={10}
      bg="white"
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      boxShadow="2xl"
      w="full"
      maxW="lg"
      mx={4}
    >
      <Flex
        align="center"
        gap={2}
        color="orange.600"
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="xs"
        letterSpacing="wider"
        mb={3}
      >
        <MapPin size={16} /> {t.location.label}
      </Flex>
      <Heading as="h3" size="lg" mb={3} color="gray.900">
        {t.location.title}
      </Heading>
      <Text color="gray.600" mb={6} fontSize="sm">
        {t.location.desc}
      </Text>
      <VStack spacing={2} align="stretch" mb={6}>
        {t.location.points.map((p, i) => (
          <Flex
            key={i}
            justify="space-between"
            borderBottomWidth="1px"
            borderColor="gray.50"
            pb={1.5}
            fontSize="sm"
          >
            <Text color="gray.700" fontWeight="medium">
              {p.name}
            </Text>
            <Text fontWeight="bold" color="gray.900">
              {p.time}
            </Text>
          </Flex>
        ))}
      </VStack>
      <Button
        w="full"
        size="md"
        bg="gray.900"
        color="white"
        _hover={{ bg: "gray.800", transform: "translateY(-1px)" }}
        transition="all 0.2s"
        fontWeight="bold"
        fontSize="sm"
      >
        {t.location.directions}
      </Button>
    </Box>
  </Box>
);

// --- Component: BookingTerms ---
export const BookingTerms = ({ t }) => (
  <Box py={6} bg="white">
    <Container maxW="6xl">
      <Box
        p={{ base: 6, md: 8 }}
        bg="orange.50"
        borderRadius="3xl"
        border="1px solid"
        borderColor="orange.100"
        position="relative"
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading as="h3" size="xl" mb={2} color="gray.900">
              {t.bookingTerms.title}
            </Heading>
            <Box
              w="60px"
              h="4px"
              bg="orange.400"
              mx="auto"
              borderRadius="full"
            />
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6}>
            {t.bookingTerms.items.map((item, idx) => (
              <VStack key={idx} align="center" textAlign="center" spacing={2}>
                <Circle
                  size="50px"
                  bg="white"
                  color="orange.600"
                  boxShadow="sm"
                  fontSize="xl"
                >
                  {item.icon}
                </Circle>
                <Box>
                  <Text fontWeight="bold" color="gray.800" fontSize="lg">
                    {item.title}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {item.desc}
                  </Text>
                </Box>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Container>
  </Box>
);

// ============================================================================
// COMPONENTA SUPLIMENTARĂ: GALERIE GENERALĂ GRID (PENTRU UTILIZARE GLOBALĂ)
// ============================================================================
export const GalleryGrid = ({ t }) => {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    fetch(
      "https://res.cloudinary.com/dnnpsia65/image/list/galerie-generala.json",
    )
      .then((res) => (res.ok ? res.json() : { resources: [] }))
      .then((data) => {
        const cloudImages = data.resources.map(
          (resource) => resource.public_id,
        );
        if (cloudImages.length > 0) {
          setImages(cloudImages);
        } else {
          setImages([
            "gallery/outside.jpg",
            "gallery/living.jpg",
            "gallery/gratar.jpg",
          ]);
        }
      })
      .catch(() => {
        setImages([
          "gallery/outside.jpg",
          "gallery/living.jpg",
          "gallery/gratar.jpg",
        ]);
      });
  }, []);

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const hasMore = images.length > visibleCount;

  return (
    <Box id="gallery" py={20} bg="white">
      {/* Activăm preîncărcarea automată pentru galeria generală când lightbox-ul e deschis */}
      {lightboxOpen && <GalleryPreloader mediaList={images} />}

      <Container maxW="container.xl">
        <Box textAlign="center" mb={12}>
          <Heading as="h2" size="2xl" mb={2} color="gray.900">
            {t.gallery?.title || "Galeria Noastră"}
          </Heading>
          <Box w="50px" h="3px" bg="orange.400" mx="auto" borderRadius="full" />
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          {images.slice(0, visibleCount).map((img, index) => (
            <Box
              key={index}
              position="relative"
              h="300px"
              borderRadius="xl"
              overflow="hidden"
              cursor="pointer"
              onClick={() => handleImageClick(index)}
              role="group"
              boxShadow="sm"
            >
              <Image
                src={getImageUrl(
                  img,
                  "c_fill,g_center,w_800,h_600,f_auto,q_auto",
                )}
                alt={`Galerie ${index}`}
                w="full"
                h="full"
                objectFit="cover"
                transition="transform 0.5s ease"
                _groupHover={{ transform: "scale(1.05)" }}
              />
              <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.400"
                opacity={0}
                _groupHover={{ opacity: 1 }}
                transition="opacity 0.3s"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontWeight="bold" fontSize="sm">
                  Mărește Poza
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {hasMore && (
          <Flex justify="center" mt={10}>
            <Button
              bg="orange.500"
              color="white"
              _hover={{ bg: "orange.600" }}
              rounded="full"
              px={8}
              fontWeight="bold"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              {t.gallery?.load_more || "Încarcă mai multe poze"}
            </Button>
          </Flex>
        )}
      </Container>

      {lightboxOpen && images.length > 0 && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.950"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setLightboxOpen(false)}
        >
          <IconButton
            position="absolute"
            top={4}
            right={4}
            color="white"
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            <X size={32} style={{ display: "block" }} />
          </IconButton>

          <IconButton
            position="absolute"
            left={4}
            color="white"
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={(e) => {
              e.stopPropagation();
              setPhotoIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1,
              );
            }}
            aria-label="Previous"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            <ArrowLeft size={32} style={{ display: "block" }} />
          </IconButton>

          <Box maxW="90vw" maxH="85vh" onClick={(e) => e.stopPropagation()}>
            <Image
              src={getImageUrl(
                images[photoIndex],
                "c_contain,w_1600,h_1200,f_auto,q_auto",
              )}
              alt="Fullscreen view"
              borderRadius="lg"
            />
          </Box>

          <IconButton
            position="absolute"
            right={4}
            color="white"
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={(e) => {
              e.stopPropagation();
              setPhotoIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1,
              );
            }}
            aria-label="Next"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            <ArrowRight size={32} style={{ display: "block" }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
