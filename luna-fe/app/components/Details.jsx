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
} from "lucide-react";
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
            src="/details/wide.jpg"
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

export const Rooms = ({ t }) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleOpenRoom = (room) => {
    setSelectedRoom(room);
    onOpen();
  };

  const galleryImages = selectedRoom
    ? selectedRoom.gallery && selectedRoom.gallery.length > 0
      ? selectedRoom.gallery
      : [selectedRoom.img]
    : [];

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
                    src={room.img}
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

      {/* FIXED DIALOG STRUCTURE */}
      <Dialog.Root
        open={open}
        onOpenChange={(e) => (e.open ? onOpen() : onClose())}
        size="full"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Backdrop bg="blackAlpha.900" backdropFilter="blur(10px)" />
        <Dialog.Positioner>
          <Dialog.Content bg="transparent" boxShadow="none" h="100vh" w="100vw">
            <Dialog.CloseTrigger
              asChild
              position="absolute"
              top="8"
              right="8"
              zIndex={20}
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

            <Dialog.Body
              p={0}
              h="full"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              {selectedRoom && (
                <Box
                  w="full"
                  maxW="8xl"
                  mx="auto"
                  display="flex"
                  flexDirection="column"
                  py={8}
                  h="full"
                  justifyContent="center"
                >
                  <Box
                    color="white"
                    px={8}
                    mb={8}
                    textAlign={{ base: "center", md: "left" }}
                  >
                    <Heading size="2xl" mb={2}>
                      {selectedRoom.title}
                    </Heading>
                    <Text color="gray.400" fontSize="lg">
                      {galleryImages.length} imagini
                    </Text>
                  </Box>

                  <Box
                    w="full"
                    overflowX="auto"
                    overflowY="hidden"
                    whiteSpace="nowrap"
                    px={8}
                    py={4}
                    css={{
                      "&::-webkit-scrollbar": { display: "none" },
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                  >
                    <HStack
                      spacing={6}
                      h={{ base: "50vh", md: "60vh" }}
                      align="center"
                    >
                      {galleryImages.map((imgSrc, index) => (
                        <Box
                          key={index}
                          h="full"
                          flexShrink={0}
                          borderRadius="xl"
                          overflow="hidden"
                          boxShadow="dark-lg"
                        >
                          <Image
                            src={imgSrc}
                            alt={`Gallery ${index}`}
                            h="full"
                            w="auto"
                            objectFit="contain"
                            bg="black"
                          />
                        </Box>
                      ))}
                    </HStack>
                  </Box>

                  <Text
                    textAlign="center"
                    color="gray.500"
                    mt={8}
                    display={{ md: "none" }}
                    animation="pulse 2s infinite"
                  >
                    Glisează orizontal
                  </Text>
                </Box>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

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
        <Button
          variant="ghost"
          colorPalette="orange"
          display={{ base: "none", md: "flex" }}
        >
          {t.amenities.view_guide}{" "}
          <ArrowRight size={18} style={{ marginLeft: "8px" }} />
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={12}>
        {t.amenities.items.map((item, i) => {
          const Icon = icons[i] || Star;
          return (
            <VStack
              key={i}
              spacing={3}
              textAlign="center"
              alignItems="center" // Explicitly center the stack items
              role="group"
            >
              <Flex
                p={4}
                bg="gray.800"
                color="orange.500"
                borderRadius="full"
                justifyContent="center" // Center icon horizontally
                alignItems="center" // Center icon vertically
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
      </SimpleGrid>
    </Container>
  </Box>
);

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
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
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
