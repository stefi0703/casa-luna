"use client";
import React, { useState } from "react";
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
  MapPin,
  X,
  Play, // Added for video thumbnails
} from "lucide-react";
import { prefix } from "../utils/prefix"; // Import prefix
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
} from "@chakra-ui/react";

const icons = [Wifi, Flame, Wind, Coffee, Zap, Baby, Mountain, Key];

// --- Helper: Check if file is video ---
const isVideo = (src) => {
  if (!src) return false;
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
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
              { val: "5", lbl: t.intro.baths },
              { val: "6ac", lbl: t.intro.forest },
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
        <Box flex={1} position="relative" w="full">
          <Image
            src={prefix("/details/wide.jpg")}
            borderRadius="2xl"
            boxShadow="xl"
            w="full"
            h="400px"
            objectFit="cover"
            alt="Intro"
          />
        </Box>
      </Flex>
    </Container>
  </Box>
);

// --- Component: Rooms (Updated with Video & Grid Layout) ---
export const Rooms = ({ t }) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenRoom = (room) => {
    setSelectedRoom(room);
    setActiveIndex(0); // Reset to first slide
    onOpen();
  };

  const galleryMedia = selectedRoom
    ? selectedRoom.gallery && selectedRoom.gallery.length > 0
      ? selectedRoom.gallery
      : [selectedRoom.img]
    : [];

  const activeMedia = galleryMedia[activeIndex];

  return (
    <>
      <Box id="rooms" py={24} bg="gray.50">
        <Container maxW="container.xl">
          <Box textAlign="center" mb={16}>
            <Heading as="h2" size="2xl" mb={4} color="gray.900">
              {t.rooms.title}
            </Heading>
            <Text color="gray.600">{t.rooms.subtitle}</Text>
          </Box>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
            gap={8}
          >
            {t.rooms.items.map((room, i) => (
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
              >
                <Box
                  position="relative"
                  h="64"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => handleOpenRoom(room)}
                  role="group"
                >
                  <Image
                    src={prefix(room.img)}
                    alt={room.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    transition="transform 0.7s"
                    _groupHover={{ transform: "scale(1.1)" }}
                  />
                  <Flex
                    position="absolute"
                    inset={0}
                    bg="blackAlpha.600"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                    align="center"
                    justify="center"
                  >
                    <Badge
                      variant="solid"
                      colorPalette="white"
                      bg="whiteAlpha.900"
                      color="gray.900"
                      px={4}
                      py={2}
                      borderRadius="full"
                      textTransform="none"
                      fontSize="md"
                    >
                      Vezi Galeria
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
                    <Text fontSize="sm" color="gray.500" mb={4}>
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
            ))}
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
              >
                <X size={32} />
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
                >
                  {/* MAIN VIEWPORT (Top) */}
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
                        src={prefix(activeMedia)}
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
                        src={prefix(activeMedia)}
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
                        {activeIndex + 1} / {galleryMedia.length}
                      </Text>
                    </Box>
                  </Flex>

                  {/* THUMBNAIL GRID (Bottom) */}
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
                        const isActive = index === activeIndex;

                        return (
                          <Box
                            key={index}
                            onClick={() => setActiveIndex(index)}
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
                                  src={prefix(media)}
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
                                  <Play size={20} color="white" fill="white" />
                                </Box>
                              </Box>
                            ) : (
                              <Image
                                src={prefix(media)}
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
export const Amenities = ({ t }) => (
  <Box id="amenities" py={24} bg="gray.900" color="gray.300">
    <Container maxW="container.xl">
      <Flex
        justify="space-between"
        align="flex-end"
        mb={12}
        borderBottomWidth="1px"
        borderColor="gray.800"
        pb={8}
      >
        <Box>
          <Heading as="h2" size="2xl" color="white" mb={2}>
            {t.amenities.title}
          </Heading>
          <Text>{t.amenities.subtitle}</Text>
        </Box>
        {/* Arrow removed from here */}
        <Button
          variant="ghost"
          colorPalette="orange"
          display={{ base: "none", md: "flex" }}
        >
          {t.amenities.view_guide}
        </Button>
      </Flex>

      {/* Changed SimpleGrid to Flex for centered alignment of the last row */}
      <Flex wrap="wrap" justify="center" gap={12}>
        {t.amenities.items.map((item, i) => {
          const Icon = icons[i] || Star;
          return (
            <VStack
              key={i}
              spacing={3}
              textAlign="center"
              alignItems="center"
              role="group"
              // Width set to behave like a grid: ~50% on mobile, ~22% on desktop
              w={{ base: "40%", md: "20%" }}
              minW="150px"
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
                  transform: "translateY(-4px)",
                }}
              >
                <Icon size={32} />
              </Flex>
              <Box>
                <Text fontWeight="bold" color="white">
                  {item.title}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  _groupHover={{ color: "gray.400" }}
                >
                  {item.desc}
                </Text>
              </Box>
            </VStack>
          );
        })}
      </Flex>
    </Container>
  </Box>
);

// --- Component: Location ---
export const Location = ({ t }) => (
  <Box
    id="location"
    position="relative"
    h="500px"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.200"
  >
    <Box position="absolute" inset={0} filter="grayscale(100%) opacity(0.5)">
      <Image
        src={prefix(
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
        )}
        w="full"
        h="full"
        objectFit="cover"
        alt="Map"
      />
    </Box>
    <Box
      position="relative"
      zIndex={10}
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="2xl"
      maxW="lg"
      mx={4}
    >
      <Flex
        align="center"
        gap={2}
        color="orange.600"
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="sm"
        letterSpacing="wider"
        mb={4}
      >
        <MapPin size={16} /> {t.location.label}
      </Flex>
      <Heading as="h3" size="lg" mb={4} color="gray.900">
        {t.location.title}
      </Heading>
      <Text color="gray.600" mb={6}>
        {t.location.desc}
      </Text>
      <VStack spacing={2} align="stretch" mb={6}>
        {t.location.points.map((p, i) => (
          <Flex
            key={i}
            justify="space-between"
            borderBottomWidth="1px"
            pb={1}
            fontSize="sm"
          >
            <Text color="gray.700">{p.name}</Text>
            <Text fontWeight="bold" color="gray.900">
              {p.time}
            </Text>
          </Flex>
        ))}
      </VStack>
      <Button
        w="full"
        size="lg"
        bg="gray.900"
        color="white"
        _hover={{ bg: "gray.800" }}
      >
        {t.location.directions}
      </Button>
    </Box>
  </Box>
);

// --- Data & Translations ---

export const galleryImages = [
  {
    url: "gallery/outside.jpg",
    titleKey: "outside",
  },
  {
    url: "gallery/living.jpg",
    titleKey: "img_living",
  },
  {
    url: "gallery/gratar.jpg",
    titleKey: "img_gratar",
  },
];

export const translations = {
  en: {
    nav: {
      cabin: "The Cabin",
      rooms: "Rooms",
      amenities: "Amenities",
      location: "Location",
      pricing: "Pricing",
      contact: "Contact",
      book: "Book Now",
    },
    hero: {
      title_start: "Escape to the",
      title_end: "Carpathians",
      subtitle:
        "A modern rustic retreat in the heart of the Rucăr-Bran corridor.",
      check_avail: "Check Availability",
      explore: "Explore",
      img_dusk: "Exterior at Dusk",
      img_living: "Cozy Living Room",
      img_winter: "Winter View",
    },
    intro: {
      welcome: "Bine ați venit (Welcome)",
      title: "Authentic Romanian Wilderness.",
      text: "Built from locally sourced stone and timber, this cabin blends seamlessly into the stunning landscapes between the Piatra Craiului and Bucegi mountains.",
      bedrooms: "Bedrooms",
      baths: "Baths",
      forest: "Mountain View",
      testimonial: "The fresh mountain air of Rucăr is unforgettable.",
      guest_name: "Sarah Jenkins, Oct 2023",
    },
    rooms: {
      title: "Space to Breathe",
      subtitle: "Relaxation and comfort in the midst of nature.",
      items: [
        {
          title: "Main Living Room",
          desc: "2 Comfortable sofas, fireplace for cool evenings.",
          feats: ["Generous Space", "Social Area"],
          img: "living/living-main.jpg",
          gallery: [
            "living/living-main.jpg",
            "living/living2.jpg",
            "living/living3.jpg",
            "living/living4.jpg",
            "living/living5.jpg",
            "living/living6.jpg",
          ],
        },
        {
          title: "Chef's Kitchen",
          desc: "Fully equipped for cooking.",
          feats: ["Espresso Machine", "Gas Range, Oven"],
          img: "kitchen/kitchen-main.jpg",
          gallery: [
            "kitchen/kitchen-main.jpg",
            "kitchen/kitchen2.jpg",
            "kitchen/kitchen3.jpg",
          ],
        },
        {
          title: "Grill Area",
          desc: "Wood grill, large table, perfect for families.",
          feats: ["Traditional Grill", "Smart TV"],
          img: "grill/grill-main.jpg",
          gallery: [
            "grill/grill-main.jpg",
            "grill/grill2.jpg",
            "grill/grill3.jpg",
            "grill/grill4.jpg",
            "grill/grill5.jpg",
          ],
        },
        {
          title: "Guest Suite",
          desc: "Comfortable Queen bed with mountain views.",
          feats: ["Queen Bed", "Private Bath"],
          img: "rooms/rooms-main.jpg",
          gallery: [
            "rooms/rooms-main.jpg",
            "rooms/room2.jpg",
            "rooms/room3.jpg",
          ],
        },
        {
          title: "The Yard",
          desc: "Fresh mountain air and green space.",
          feats: ["Green Space", "Relaxation Zone"],
          img: "outside/outside-main.jpg",
          gallery: [
            "outside/outside-main.jpg",
            "outside/outside1.jpg",
            "outside/outside2.jpg",
            "outside/outside3.jpg",
            "outside/outside4.jpg",
            "outside/outside5.jpg",
            "outside/outside6.jpg",
            "outside/outside7.jpg",
          ],
        },
        {
          title: "Outdoor Terrace",
          desc: "Terrace with swing for quiet mornings.",
          feats: ["Swing", "Panoramic View"],
          img: "terrace/terrace-main.jpg",
          gallery: [
            "terrace/terrace-main.jpg",
            "terrace/terrace1.jpg",
            "terrace/terrace2.jpg",
          ],
        },
      ],
    },
    amenities: {
      title: "Amenities",
      subtitle: "Everything you need in the mountains.",
      items: [
        { title: "Wifi", desc: "Fast internet" },
        { title: "Artificial Fireplace", desc: "Welcoming atmosphere" },
        { title: "Air Conditioning", desc: "Climate control" },
        { title: "Grill Zone", desc: "Equipped gazebo" },
        { title: "View", desc: "Bucegi Mountains" },
        { title: "Family Friendly", desc: "Safe yard" },
        { title: "Smart TV", desc: "Smart TV" },
      ],
    },
    location: {
      label: "Location",
      title: "Heart of Rucăr-Bran Corridor",
      desc: "Located in Rucăr, an oasis of peace at the foot of the mountains.",
      points: [
        { name: "Bran Castle", time: "45 min" },
        { name: "Dâmbovicioara Cave", time: "15 min" },
        { name: "Brașov City", time: "55 min" },
        { name: "Mountain Trails", time: "0 min" },
      ],
      directions: "Get Directions",
    },
    pricing: {
      title: "Simple Pricing",
      subtitle: "No hidden fees.",
      night: "/ night",
      week: "/ week",
      tiers: [
        {
          title: "Weeknight",
          price: "1200 RON",
          features: ["Sun-Thu Check-in", "Min 2 Nights"],
        },
        {
          title: "Weekend",
          price: "1500 RON",
          features: ["Fri-Sat Check-in", "Late Checkout"],
        },
        {
          title: "Weekly",
          price: "7000 RON",
          features: ["7 Nights", "15% off"],
        },
      ],
    },
    contact: {
      title: "Request Booking",
      tabs: { phone: "Call Us", email: "Email Form" },
      phone_info: {
        title: "Speak to a Host",
        button: "Call +40 700 123 456",
        avail: "Daily 9AM - 8PM",
      },
      email_form: {
        checkin: "Check-in",
        checkout: "Check-out",
        guests: "Guests",
        email: "Email",
        msg: "Message",
        send: "Send Request",
      },
    },
    footer: {
      slogan: "Disconnect and reconnect.",
      rights: "All rights reserved.",
    },
  },
  ro: {
    nav: {
      cabin: "Cabana",
      rooms: "Camere",
      amenities: "Facilități",
      location: "Locație",
      pricing: "Prețuri",
      contact: "Contact",
      book: "Rezervă",
    },
    hero: {
      title_start: "Evadează în",
      title_end: "Natură",
      subtitle: "Un refugiu rustic modern în inima culoarului Rucăr-Bran.",
      check_avail: "Verifică",
      explore: "Explorează",
      img_dusk: "Exterior la Apus",
      img_living: "Living Primitor",
      img_winter: "Peisaj de Iarnă",
    },
    intro: {
      welcome: "Bine ați Venit",
      title: "O experiență montană autentică.",
      text: "Construită din lemn și piatră locală, cabana se integrează perfect în peisajul spectaculos dintre Munții Bucegi și Piatra Craiului.",
      bedrooms: "Dormitoare",
      baths: "Băi",
      forest: "Pădure Privată",
    },
    rooms: {
      title: "Camere Spațioase",
      subtitle: "Relaxare și confort în mijlocul naturii.",
      items: [
        {
          title: "Living Room Principal",
          desc: "2 Canapele confortabile, șemineu pentru seri răcoroase.",
          feats: ["Spațiu Generos", "Zonă Socială"],
          img: "living/living-main.jpg",
          gallery: [
            "living/living-main.jpg",
            "living/living2.jpg",
            "living/living3.jpg",
            "living/living4.jpg",
            "living/living5.jpg",
            "living/living6.jpg",
          ],
        },
        {
          title: "Bucătărie Chef",
          desc: "Complet echipată pentru gătit.",
          feats: ["Espressor", "Aragaz Gaz, Cuptor"],
          img: "kitchen/kitchen-main.jpg",
          gallery: [
            "kitchen/kitchen-main.jpg",
            "kitchen/kitchen2.jpg",
            "kitchen/kitchen3.jpg",
          ],
        },
        {
          title: "Zona Grill",
          desc: "Grătar pe lemne, Masă mare, perfect pentru familie.",
          feats: ["Grătar Tradițional", "Smart TV"],
          img: "grill/grill-main.jpg",
          gallery: [
            "grill/grill-main.jpg",
            "grill/grill2.jpg",
            "grill/grill3.jpg",
            "grill/grill4.jpg",
            "grill/grill5.jpg",
          ],
        },
        {
          title: "Suită Oaspeți",
          desc: "Pat Queen confortabil cu vedere spre munte.",
          feats: ["Pat Queen", "Baie Privată"],
          img: "rooms/rooms-main.jpg",
          gallery: [
            "rooms/rooms-main.jpg",
            "rooms/room2.jpg",
            "rooms/room3.jpg",
            "rooms/room4.jpg",
            "rooms/room5.jpg",
            "rooms/room6.jpg",
            "rooms/room7.jpg",
            "rooms/room8.jpg",
            "rooms/roomvid.mp4",
          ],
        },
        {
          title: "Curte",
          desc: "Aer curat de munte și spațiu verde.",
          feats: ["Spațiu Verde", "Zonă Relaxare"],
          img: "outside/outside-main.jpg",
          gallery: [
            "outside/outside-main.jpg",
            "outside/outside1.jpg",
            "outside/outside2.jpg",
            "outside/outside3.jpg",
            "outside/outside4.jpg",
            "outside/outside5.jpg",
            "outside/outside6.jpg",
            "outside/outside7.jpg",
          ],
        },
        {
          title: "Terasă Exterioară",
          desc: "Terasă cu balansoar pentru dimineți liniștite.",
          feats: ["Balansoar", "Vedere Panoramică"],
          img: "terrace/terrace-main.jpg",
          gallery: [
            "terrace/terrace-main.jpg",
            "terrace/terrace1.jpg",
            "terrace/terrace2.jpg",
          ],
        },
      ],
    },
    amenities: {
      title: "Facilități",
      subtitle: "Tot ce ai nevoie la munte.",
      items: [
        { title: "Wifi", desc: "Internet rapid" },
        { title: "Șemineu Artificial", desc: "Atmosferă primitoare" },
        { title: "Aer Condiționat", desc: "Climatizare" },
        { title: "Zonă Grill", desc: "Foișor echipat" },
        { title: "Priveliște", desc: "Munții Bucegi" },
        { title: "Family Friendly", desc: "Curte sigură" },
        { title: "Smart TV", desc: "Smart TV" },
      ],
    },
    location: {
      label: "Locație",
      title: "Inima Culoarului Rucăr-Bran",
      desc: "Situată în Rucăr, o oază de liniște la poalele munților.",
      points: [
        { name: "Castelul Bran", time: "45 min" },
        { name: "Peștera Dâmbovicioara", time: "15 min" },
        { name: "Brașov", time: "55 min" },
        { name: "Trasee Montane", time: "0 min" },
      ],
      directions: "Indicații",
    },
    pricing: {
      title: "Prețuri Simple",
      subtitle: "Fără taxe ascunse.",
      night: "/ noapte",
      week: "/ săpt",
      tiers: [
        {
          title: "În timpul săptămânii",
          price: "1200 RON",
          features: ["Dum-Joi Check-in", "Min 2 Nopți"],
        },
        {
          title: "Weekend",
          price: "1500 RON",
          features: ["Vin-Sâm Check-in", "Checkout Târziu"],
        },
        {
          title: "Săptămânal",
          price: "7000 RON",
          features: ["7 Nopți", "15% reducere"],
        },
      ],
    },
    contact: {
      title: "Rezervare",
      tabs: { phone: "Sună-ne", email: "Email" },
      phone_info: {
        title: "Vorbește cu o Gazdă",
        button: "Sună +40 700 123 456",
        avail: "Zilnic 09:00 - 20:00",
      },
      email_form: {
        checkin: "Check-in",
        checkout: "Check-out",
        guests: "Oaspeți",
        email: "Email",
        msg: "Mesaj",
        send: "Trimite",
      },
    },
    footer: {
      slogan: "Deconectează-te de lume.",
      rights: "Toate drepturile rezervate.",
    },
  },
};
