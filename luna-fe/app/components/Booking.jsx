"use client";
import React from "react";
import { Mail, Phone, CheckCircle } from "lucide-react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  Textarea,
  Badge,
  Flex,
  List,
  Tabs,
  Icon,
} from "@chakra-ui/react";

export default function Booking({ t }) {
  return (
    <Box as="section" id="pricing" py={24} bg="white">
      <Container maxW="6xl">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={16}>
          {/* Pricing Column */}
          <Box>
            <Heading as="h2" size="2xl" mb={6} color="gray.900">
              {t.pricing.title}
            </Heading>
            <Text color="gray.600" mb={8} fontSize="lg">
              {t.pricing.subtitle}
            </Text>

            <VStack spacing={6} align="stretch">
              {t.pricing.tiers.map((tier, i) => {
                const isPopular = i === 1;
                return (
                  <Box
                    key={i}
                    p={6}
                    borderRadius="xl"
                    borderWidth="1px"
                    // Use standard orange/gray palette
                    borderColor={isPopular ? "orange.400" : "gray.200"}
                    bg={isPopular ? "orange.50" : "transparent"}
                    position="relative"
                    shadow={isPopular ? "sm" : "none"}
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Heading as="h3" size="md" color="gray.800">
                        {tier.title}
                      </Heading>
                      {isPopular && (
                        <Badge
                          colorPalette="orange"
                          variant="solid"
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          Popular
                        </Badge>
                      )}
                    </Flex>
                    <Text
                      fontSize="3xl"
                      fontWeight="bold"
                      color="orange.600"
                      mb={4}
                    >
                      {tier.price}{" "}
                      <Text
                        as="span"
                        fontSize="sm"
                        color="gray.500"
                        fontWeight="normal"
                      >
                        {i === 2 ? t.pricing.week : t.pricing.night}
                      </Text>
                    </Text>
                    <List.Root spacing={3} variant="plain">
                      {tier.features.map((f, idx) => (
                        <List.Item
                          key={idx}
                          display="flex"
                          alignItems="center"
                          fontSize="sm"
                          color="gray.700"
                        >
                          <List.Indicator asChild>
                            <Icon as={CheckCircle} color="orange.500" mr={3} />
                          </List.Indicator>
                          {f}
                        </List.Item>
                      ))}
                    </List.Root>
                  </Box>
                );
              })}
            </VStack>
          </Box>

          {/* Contact/Form Column */}
          <Box
            bg="gray.50"
            p={8}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="gray.200"
            height="fit-content"
            position="sticky"
            top="24"
          >
            <Heading
              as="h3"
              size="lg"
              mb={6}
              display="flex"
              alignItems="center"
              gap={2}
              color="gray.800"
            >
              <Mail color="#DD6B20" /> {t.contact.title}
            </Heading>

            <Tabs.Root
              defaultValue="phone"
              variant="enclosed"
              colorPalette="orange"
            >
              <Tabs.List mb={6} w="full">
                <Tabs.Trigger value="phone" flex="1" fontWeight="semibold">
                  {t.contact.tabs.phone}
                </Tabs.Trigger>
                <Tabs.Trigger value="email" flex="1" fontWeight="semibold">
                  {t.contact.tabs.email}
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="phone" p={0}>
                <VStack py={8} spacing={4} textAlign="center">
                  <Flex
                    w={16}
                    h={16}
                    bg="orange.100"
                    color="orange.600"
                    borderRadius="full"
                    align="center"
                    justify="center"
                  >
                    <Phone size={32} />
                  </Flex>
                  <Heading as="h4" size="md" color="gray.900">
                    {t.contact.phone_info.title}
                  </Heading>
                  <Button
                    as="a"
                    href="tel:+40700123456"
                    w="full"
                    size="lg"
                    colorPalette="orange"
                    mt={2}
                  >
                    {t.contact.phone_info.button}
                  </Button>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    {t.contact.phone_info.avail}
                  </Text>
                </VStack>
              </Tabs.Content>

              <Tabs.Content value="email" p={0}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <VStack spacing={4}>
                    <Grid templateColumns="1fr 1fr" gap={4} w="full">
                      <Input
                        type="date"
                        bg="white"
                        borderColor="gray.300"
                        placeholder="Check-in"
                        _placeholder={{ color: "gray.400" }}
                      />
                      <Input
                        type="date"
                        bg="white"
                        borderColor="gray.300"
                        placeholder="Check-out"
                        _placeholder={{ color: "gray.400" }}
                      />
                    </Grid>
                    <Input
                      type="email"
                      placeholder={t.contact.email_form.email}
                      bg="white"
                      borderColor="gray.300"
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Textarea
                      placeholder={t.contact.email_form.msg}
                      rows={3}
                      bg="white"
                      borderColor="gray.300"
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Button
                      type="submit"
                      w="full"
                      size="lg"
                      bg="gray.900"
                      color="white"
                      _hover={{ bg: "gray.700" }}
                    >
                      {t.contact.email_form.send}
                    </Button>
                  </VStack>
                </form>
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
