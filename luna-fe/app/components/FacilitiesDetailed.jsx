"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  Stack,
  Circle,
  Flex,
  HStack,
  List,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import {
  Bed,
  Tv,
  Utensils,
  Flame,
  TreePine,
  Car,
  ChevronLeft,
  Coffee,
  Wifi,
  ShieldCheck,
  Gamepad2,
  Baby,
  Dumbbell,
  CigaretteOff,
  Music,
  Sofa,
  Clock,
  MapPin,
} from "lucide-react";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function FacilitiesDetailed({ onClose, t }) {
  const router = useRouter();
  const accentColor = "orange.600";
  const mainTextColor = "gray.700";

  const handleBackToSite = () => {
    onClose ? onClose() : router.push("/");
  };

  return (
    <Box bg="#F9F8F6" minH="100vh">
      <Navbar
        t={t}
        language="ro"
        isSolid={true}
        toggleLanguage={() => {}}
        scrollToSection={() => router.push("/")}
        onOpenGallery={() => router.push("/#gallery")}
      />

      <Box as="main" pt={{ base: "100px", md: "140px" }} pb={20}>
        <Container maxW="container.lg">
          <Button
            variant="ghost"
            mb={8}
            onClick={handleBackToSite}
            color={accentColor}
            _hover={{ bg: "orange.100" }}
          >
            <ChevronLeft size={20} /> Înapoi la site
          </Button>

          <Box textAlign="center" mb={16}>
            <Badge
              colorScheme="orange"
              mb={4}
              px={3}
              py={1}
              borderRadius="full"
            >
              Locație recent deschisă
            </Badge>
            <Heading
              as="h1"
              size="3xl"
              mb={6}
              color="gray.900"
              fontWeight="bold"
            >
              Facilități{" "}
              <Text as="span" color={accentColor}>
                Casa Luna
              </Text>
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              Casa Luna îmbină confortul modern cu o atmosferă magică, oferind o
              oază de liniște pentru grupuri restrânse de prieteni
              sau familii.
            </Text>
          </Box>

          <Stack gap={10}>
            {/* --- DORMITOARE --- */}
            <Box
              bg="white"
              p={10}
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <HStack mb={6} gap={4}>
                <Circle size="60px" bg="orange.50" color={accentColor}>
                  <Bed size={30} />
                </Circle>
                <Heading size="xl" color="gray.800">
                  Dormitoare Matrimoniale
                </Heading>
              </HStack>
              <Text mb={6} color="gray.600">
                Paturile și noptierele cu design artistic din fier forjat oferă
                un plus de rafinament fiecărei camere ✨(capacitate: 2 adulți și 1
                copil sub 10 ani).
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>
                    🛏️ Pat matrimonial & noptiere cu design artistic din fier
                    forjat
                  </List.Item>
                  <List.Item>📺 TV Smart & Priză lângă pat</List.Item>
                  <List.Item>
                    👗 Dulap / Garderobă & umerașe pentru haine
                  </List.Item>
                  <List.Item>🪞 Oglindă, masă și scaun</List.Item>
                  <List.Item>
                    🌡️ Confort termic prin pardoseală încălzită și calorifere
                  </List.Item>
                </List.Root>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>🚿 Cabină / paravan de duș</List.Item>
                  <List.Item>🧖‍♀️ Uscător de păr & Prosoape</List.Item>
                  <List.Item>🧼 Săpun / gel de duș</List.Item>
                  <List.Item>🦟 Plasă țânțari la geamuri</List.Item>
                </List.Root>
              </SimpleGrid>
            </Box>

            {/* --- LIVING --- */}
            <Box
              bg="white"
              p={10}
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <HStack mb={6} gap={4}>
                <Circle size="60px" bg="orange.50" color={accentColor}>
                  <TreePine size={30} />
                </Circle>
                <Heading size="xl" color="gray.800">
                  În Living
                </Heading>
              </HStack>
              <Text mb={6} color="gray.600">
                Descoperă un ambient magic cu copac decorativ 🌳, picturi 3D și
                detalii de basm, totul într-un decor inspirat din natură 🌿🌙.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>🔥 Șemineu & Pardoseală încălzită</List.Item>
                  <List.Item>🛋️ 2 canapele confortabile</List.Item>
                  <List.Item>📺 TV Smart & Sistem audio</List.Item>
                  <List.Item>🎲 Jocuri: remi, table, cărți de joc</List.Item>
                </List.Root>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>🎯 Țintă cu scai pentru copii</List.Item>
                  <List.Item>
                    🌡️ Sistem încălzire prin pardoseală și calorifere
                  </List.Item>
                  <List.Item>📶 WiFi gratuit în întreaga unitate</List.Item>
                </List.Root>
              </SimpleGrid>
            </Box>

            {/* --- BUCATARIA TURISTULUI --- */}
            <Box
              bg="white"
              p={10}
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <HStack mb={6} gap={4}>
                <Circle size="60px" bg="orange.50" color={accentColor}>
                  <Utensils size={30} />
                </Circle>
                <Heading size="xl" color="gray.800">
                  Bucătăria Turistului
                </Heading>
              </HStack>
              <Text mb={6} color="gray.600">
                O bucătărie complet utilată și mobilată pentru a satisface toate
                nevoile tale culinare în timpul sejurului.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>🍳 Aragaz & Cuptor electric</List.Item>
                  <List.Item>☕ Expresor cafea & Fierbător electric</List.Item>
                  <List.Item>🍞 Sandwitch maker & Prăjitor de pâine</List.Item>
                </List.Root>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>♨ Cuptor cu microunde</List.Item>
                  <List.Item>🧊 Frigidere & Congelator</List.Item>
                  <List.Item>🍽️ Veselă și tacâmuri complete</List.Item>
                </List.Root>
              </SimpleGrid>
            </Box>

            {/* --- FOIȘOR INTERIOR --- */}
            <Box
              bg="white"
              p={10}
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <HStack mb={6} gap={4}>
                <Circle size="60px" bg="orange.50" color={accentColor}>
                  <Flame size={30} />
                </Circle>
                <Heading size="xl" color="gray.800">
                  Foișorul Interior (Încălzit)
                </Heading>
              </HStack>
              <Text mb={6} color="gray.600">
                Un spațiu închis și primitor, ideal pentru seri relaxante
                indiferent de anotimp, dotat cu zonă de dining rustică și spațiu
                de relaxare.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>
                    🏠 Foișor încălzit (integrat in casă) cu zonă de dining
                    rustică
                  </List.Item>
                  <List.Item>
                    🍖 Grătar profesional și plită integrate
                  </List.Item>
                </List.Root>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>
                    🛋️ Canapea confortabilă și spațiu de socializare
                  </List.Item>
                  <List.Item>📺 TV Smart dedicat pentru divertisment</List.Item>
                </List.Root>
              </SimpleGrid>
            </Box>

            {/* --- CURTE, TERASĂ ȘI ACTIVITĂȚI --- */}
            <Box
              bg="white"
              p={10}
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <HStack mb={6} gap={4}>
                <Circle size="60px" bg="orange.50" color={accentColor}>
                  <TreePine size={30} />
                </Circle>
                <Heading size="xl" color="gray.800">
                  Curte, Terasă & Activități
                </Heading>
              </HStack>
              <Text mb={6} color="gray.600">
                Bucură-te de aerul curat de munte în curtea generoasă sau pe
                terasa special amenajată pentru relaxare.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>🌳 Grădină / curte cu loc de recreere</List.Item>
                  <List.Item>
                    ⛱️ Foișor exterior, cu spatiu de relaxare
                  </List.Item>
                  <List.Item>🧘 Terasă spatioasă & Mobilier grădină</List.Item>
                  <List.Item>🥘 Sobă cu plită / ceaun în aer liber</List.Item>
                </List.Root>
                <List.Root variant="plain" spacing={2} color={mainTextColor}>
                  <List.Item>
                    🎠 Loc de joacă & Balansoar pentru copii
                  </List.Item>
                  <List.Item>🏓 Tenis de masă (exterior) & Darts</List.Item>
                  <List.Item>🏸 Badminton & Coș de baschet</List.Item>
                  <List.Item>⛰️ Posibilități de drumeții în zonă</List.Item>
                </List.Root>
              </SimpleGrid>
            </Box>

            {/* --- POLITICI SI SIGURANTA --- */}
            <Box
              bg="white"
              p={10}
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <Box>
                  <Heading
                    size="md"
                    mb={6}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.800" // Titlu închis la culoare pentru contrast
                  >
                    <ShieldCheck size={24} color={accentColor} /> Securitate &
                    Confort
                  </Heading>
                  <List.Root
                    variant="plain"
                    spacing={3}
                    fontSize="md"
                    color="gray.700" // Text gri închis, mult mai lizibil
                  >
                    <List.Item display="flex" alignItems="center" gap={3}>
                      📹{" "}
                      <Text as="span">
                        Camere de supraveghere exterior & interior zone comune
                      </Text>
                    </List.Item>
                    <List.Item display="flex" alignItems="center" gap={3}>
                      🚨{" "}
                      <Text as="span">
                        Detector de monoxid de carbon & extinctoare
                      </Text>
                    </List.Item>
                    <List.Item display="flex" alignItems="center" gap={3}>
                      ⏰{" "}
                      <Text as="span">Check In: 14:30 | Check Out: 11:30</Text>
                    </List.Item>
                    <List.Item display="flex" alignItems="center" gap={3}>
                      👶{" "}
                      <Text as="span">
                        Copii sub 10 ani: Gratuit (în pat cu părinții)
                      </Text>
                    </List.Item>
                  </List.Root>
                </Box>

                <Box>
                  <Heading
                    size="md"
                    mb={6}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.800"
                  >
                    <CigaretteOff size={24} color={accentColor} /> Politica
                    Fumatului
                  </Heading>
                  <List.Root
                    variant="plain"
                    spacing={3}
                    fontSize="md"
                    color="gray.700"
                  >
                    <List.Item display="flex" alignItems="center" gap={3}>
                      🚭{" "}
                      <Text as="span">
                        Fumatul interzis în toate spațiile interioare
                      </Text>
                    </List.Item>
                    <List.Item display="flex" alignItems="center" gap={3}>
                      🚭{" "}
                      <Text as="span">
                        Vape-ul și țigările electronice sunt interzise la
                        interior
                      </Text>
                    </List.Item>
                    <List.Item display="flex" alignItems="center" gap={3}>
                      🚬{" "}
                      <Text as="span">
                        Fumatul este permis în zone speciale la exterior
                      </Text>
                    </List.Item>
                  </List.Root>
                </Box>
              </SimpleGrid>
            </Box>

          </Stack>

          <Box
            mt={16}
            textAlign="center"
            bg="gray.900"
            p={12}
            borderRadius="3xl"
            color="white"
          >
            <Heading size="xl" mb={4}>
              Casa Luna – locul în care povestea începe!
            </Heading>
            <Text mb={8}>Pentru rezervări și informații: 0750 849 137</Text>
            <Button
              size="xl"
              colorScheme="orange"
              onClick={handleBackToSite}
              fontWeight="bold"
            >
              Înapoi la site
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer t={t} />
    </Box>
  );
}
