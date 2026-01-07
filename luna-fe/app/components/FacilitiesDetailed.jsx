"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box, Heading, Text, Button, Container, Stack, Circle, 
  Flex, HStack, List, SimpleGrid, Badge
} from "@chakra-ui/react";
import {
  Bed, Utensils, Flame, TreePine, ChevronLeft, ShieldCheck, CigaretteOff
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function FacilitiesDetailed({ onClose, t }) {
  const router = useRouter();
  const data = t.facilitiesDetailed;
  const accentColor = "orange.600";
  const mainTextColor = "gray.700";

  const handleBackToSite = () => {
    onClose ? onClose() : router.push("/");
  };

  const getIcon = (key) => {
    const icons = {
      bedrooms: <Bed size={30} />,
      living: <TreePine size={30} />,
      kitchen: <Utensils size={30} />,
      gazebo: <Flame size={30} />,
      outdoor: <TreePine size={30} />
    };
    return icons[key] || <TreePine size={30} />;
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
            variant="ghost" mb={8} onClick={handleBackToSite}
            color={accentColor} _hover={{ bg: "orange.100" }}
          >
            <ChevronLeft size={20} /> {data.back_btn}
          </Button>

          <Box textAlign="center" mb={16}>
            <Badge colorScheme="orange" mb={4} px={3} py={1} borderRadius="full">
              {data.badge}
            </Badge>
            <Heading as="h1" size="3xl" mb={6} color="gray.900" fontWeight="bold">
              {data.title_start}
              <Text as="span" color={accentColor}>{data.title_accent}</Text>
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              {data.description}
            </Text>
          </Box>

          <Stack gap={10}>
            {/* Secțiunile principale (Dormitoare, Living, Bucătărie, Foișor, Curte) */}
            {['bedrooms', 'living', 'kitchen', 'gazebo', 'outdoor'].map((sectionKey) => {
              const section = data.sections[sectionKey];
              return (
                <Box key={sectionKey} bg="white" p={10} borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
                  <HStack mb={6} gap={4}>
                    <Circle size="60px" bg="orange.50" color={accentColor}>
                      {getIcon(sectionKey)}
                    </Circle>
                    <Heading size="xl" color="gray.800">{section.title}</Heading>
                  </HStack>
                  <Text mb={6} color="gray.600">{section.desc}</Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <List.Root variant="plain" spacing={2} color={mainTextColor}>
                      {section.items.slice(0, Math.ceil(section.items.length / 2)).map((item, idx) => (
                        <List.Item key={idx}>{item}</List.Item>
                      ))}
                    </List.Root>
                    <List.Root variant="plain" spacing={2} color={mainTextColor}>
                      {section.items.slice(Math.ceil(section.items.length / 2)).map((item, idx) => (
                        <List.Item key={idx}>{item}</List.Item>
                      ))}
                    </List.Root>
                  </SimpleGrid>
                </Box>
              );
            })}

            {/* Secțiunea Politici și Siguranță */}
            <Box bg="white" p={10} borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                <Box>
                  <Heading size="md" mb={6} display="flex" alignItems="center" gap={3} color="gray.800">
                    <ShieldCheck size={24} color={accentColor} /> {data.sections.security.title}
                  </Heading>
                  <List.Root variant="plain" spacing={3} fontSize="md" color="gray.700">
                    {data.sections.security.items.map((item, idx) => (
                      <List.Item key={idx}>{item}</List.Item>
                    ))}
                  </List.Root>
                </Box>
                <Box>
                  <Heading size="md" mb={6} display="flex" alignItems="center" gap={3} color="gray.800">
                    <CigaretteOff size={24} color={accentColor} /> {data.sections.smoking.title}
                  </Heading>
                  <List.Root variant="plain" spacing={3} fontSize="md" color="gray.700">
                    {data.sections.smoking.items.map((item, idx) => (
                      <List.Item key={idx}>{item}</List.Item>
                    ))}
                  </List.Root>
                </Box>
              </SimpleGrid>
            </Box>
          </Stack>

          {/* Footer Secțiune */}
          <Box mt={16} textAlign="center" bg="gray.900" p={12} borderRadius="3xl" color="white">
            <Heading size="xl" mb={4}>{data.footer.title}</Heading>
            <Text mb={8}>{data.footer.info}</Text>
            <Button size="xl" colorScheme="orange" onClick={handleBackToSite} fontWeight="bold">
              {data.back_btn}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer t={t} />
    </Box>
  );
}