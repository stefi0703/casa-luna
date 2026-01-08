"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, CheckCircle, Phone } from "lucide-react";
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
  Flex,
  Badge,
  Icon,
  Stack,
  Tabs,
  NativeSelect,
} from "@chakra-ui/react";
import { toaster } from "../../components/ui/toaster";

export default function Booking({ t }) {
  const [msgType, setMsgType] = useState("rezervare");
  const [hasChildren, setHasChildren] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());
    const isRezervare = msgType === "rezervare";

    let rezervareBlock = "";
    if (isRezervare) {
      rezervareBlock = `
Vă scriu pentru o rezervare la Casa Luna (${
        rawData.group_type || "Nespecificat"
      }).
Perioada: ${rawData.date_from} — ${rawData.date_to}
Număr persoane: ${rawData.guests_count}
`;
      if (hasChildren && rawData.children_details) {
        rezervareBlock += `Detalii copii: ${rawData.children_details}`;
      }
    }

    const templateParams = {
      subject: isRezervare ? "Rezervare nouă" : "Întrebare nouă",
      user_name: rawData.user_name || "Client",
      user_email: rawData.user_email || "",
      user_phone: rawData.user_phone || "",
      mesaj_rezervare: rezervareBlock,
      mesaj_intrebare: !isRezervare ? "Vă contactez pentru o întrebare." : "",
      message: rawData.message || "",
    };

    emailjs
      .send(
        "service_nz73b9k",
        "template_q36tj1l",
        templateParams,
        "YSXKo1bxXIThTmkua"
      )
      .then(() => {
        toaster.create({
          title: t.contact.success_msg || "Success!",
          type: "success",
        });
        setLoading(false);
        e.target.reset();
        setHasChildren(false);
        setMsgType("rezervare");
      })
      .catch((err) => {
        console.error("EROARE EmailJS:", err);
        toaster.create({
          title: t.contact.error_msg || "Error",
          type: "error",
        });
        setLoading(false);
      });
  };

  return (
    <Box as="section" id="pricing" py={24} bg="white">
      <Container maxW="6xl">
        <Grid templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }} gap={16}>
          {/* PRICING */}
          <Box>
            <Heading as="h2" size="2xl" mb={6} color="gray.900">
              {t.pricing.title}
            </Heading>
            <Text color="gray.600" mb={8} fontSize="lg">
              {t.pricing.subtitle}
            </Text>
            <VStack spacing={6} align="stretch">
              {t.pricing.tiers.map((tier, i) => (
                <Box
                  key={i}
                  p={6}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={i === 1 ? "orange.400" : "gray.200"}
                  bg={i === 1 ? "orange.50" : "transparent"}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Heading as="h3" size="md" color="gray.800">
                      {tier.title}
                    </Heading>
                    {i === 1 && (
                      <Badge
                        bg="orange.500"
                        color="white"
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
                  <Stack spacing={3}>
                    {tier.features.map((f, idx) => (
                      <Flex
                        align="center"
                        fontSize="sm"
                        color="gray.700"
                        key={`${i}-${idx}`}
                      >
                        <Icon as={CheckCircle} color="orange.500" mr={3} /> {f}
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* CONTACT TABS */}
          <Box
            bg="gray.50"
            p={{ base: 6, md: 8 }}
            borderRadius="3xl"
            borderWidth="1px"
            borderColor="gray.200"
            position="sticky"
            top="32"
            height="fit-content"
          >
            <Heading size="md" mb={6} textAlign="center" color="gray.800">
              {t.contact.title}
            </Heading>
            <Tabs.Root
              variant="subtle"
              colorPalette="orange"
              fitted
              defaultValue="phone"
            >
              <Tabs.List mb={6} bg="gray.200" p={1} borderRadius="full">
                <Tabs.Trigger
                  value="phone"
                  py={2}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  <Icon as={Phone} mr={2} boxSize={4} /> {t.contact.tabs.phone}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="online"
                  py={2}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  <Icon as={Mail} mr={2} boxSize={4} /> {t.contact.tabs.email}
                </Tabs.Trigger>
              </Tabs.List>

              {/* PANEL 1: PHONE */}
              <Tabs.Content value="phone" p={0}>
                <VStack
                  spacing={6}
                  py={8}
                  bg="white"
                  borderRadius="2xl"
                  border="1px dashed"
                  borderColor="gray.300"
                  textAlign="center"
                >
                  <Box
                    p={4}
                    bg="orange.100"
                    color="orange.600"
                    borderRadius="full"
                  >
                    <Icon as={Phone} boxSize={8} />
                  </Box>
                  <Box>
                    <Text color="gray.500" fontSize="sm" mb={1}>
                      {t.contact.phone_info.avail}
                    </Text>
                    <Heading size="lg" color="gray.800">
                      +40 (750) 849 137
                    </Heading>
                  </Box>
                  <Button
                    as="a"
                    href="tel:0750849137"
                    size="lg"
                    w="80%"
                    colorScheme="orange"
                  >
                    <Icon as={Phone} mr={2} size={18} />{" "}
                    {t.contact.phone_info.button}
                  </Button>
                </VStack>
              </Tabs.Content>

              {/* PANEL 2: FORM */}
              <Tabs.Content value="online" p={0}>
                <form onSubmit={sendEmail}>
                  <VStack spacing={5} align="stretch">
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" mb={2}>
                        {t.contact.email_form.subject_label}
                      </Text>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          name="subject_type"
                          bg="white"
                          value={msgType}
                          onChange={(e) => setMsgType(e.target.value)}
                        >
                          <option value="rezervare">
                            {t.contact.email_form.opt_res}
                          </option>
                          <option value="intrebare">
                            {t.contact.email_form.opt_q}
                          </option>
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Box>
                    <Grid
                      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                      gap={4}
                    >
                      <Input
                        required
                        name="user_name"
                        placeholder={t.contact.email_form.name_placeholder}
                        bg="white"
                      />
                      <Input
                        required
                        name="user_email"
                        type="email"
                        placeholder={t.contact.email_form.email}
                        bg="white"
                      />
                    </Grid>
                    <Grid
                      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                      gap={4}
                    >
                      <Box>
                        <Text fontSize="sm" mb={1}>
                          {t.contact.email_form.group_label}
                        </Text>
                        <NativeSelect.Root>
                          <NativeSelect.Field name="group_type" bg="white">
                            <option value="familie">
                              {t.contact.email_form.group_types.family}
                            </option>
                            <option value="grup de prieteni">
                              {t.contact.email_form.group_types.friends}
                            </option>
                            <option value="cuplu">
                              {t.contact.email_form.group_types.couple}
                            </option>
                            <option value="eveniment">
                              {t.contact.email_form.group_types.event}
                            </option>
                          </NativeSelect.Field>
                        </NativeSelect.Root>
                      </Box>
                      <Box>
                        <Text fontSize="sm" mb={1}>
                          {t.contact.email_form.phone_label}
                        </Text>
                        <Input
                          required
                          name="user_phone"
                          type="tel"
                          placeholder="07xx xxx xxx"
                          bg="white"
                        />
                      </Box>
                    </Grid>

                    {msgType === "rezervare" && (
                      <Box
                        p={4}
                        bg="orange.50"
                        borderRadius="xl"
                        border="1px dashed"
                        borderColor="orange.200"
                      >
                        <VStack spacing={4} align="stretch">
                          <Grid templateColumns="1fr 1fr" gap={4}>
                            <Box>
                              <Text fontSize="xs" mb={1} color="gray.500">
                                {t.contact.email_form.checkin}
                              </Text>
                              <Input
                                required
                                name="date_from"
                                type="date"
                                bg="white"
                                size="sm"
                              />
                            </Box>
                            <Box>
                              <Text fontSize="xs" mb={1} color="gray.500">
                                {t.contact.email_form.checkout}
                              </Text>
                              <Input
                                required
                                name="date_to"
                                type="date"
                                bg="white"
                                size="sm"
                              />
                            </Box>
                          </Grid>
                          <Input
                            required
                            name="guests_count"
                            placeholder={t.contact.email_form.guests}
                            bg="white"
                            size="sm"
                          />
                          <Flex align="center" gap={3}>
                            <input
                              type="checkbox"
                              checked={hasChildren}
                              onChange={(e) => setHasChildren(e.target.checked)}
                              style={{
                                width: 18,
                                height: 18,
                                accentColor: "#DD6B20",
                              }}
                            />
                            <Text fontSize="sm">
                              {t.contact.email_form.kids_q}
                            </Text>
                          </Flex>
                          {hasChildren && (
                            <Textarea
                              name="children_details"
                              placeholder={t.contact.email_form.kids_details}
                              bg="white"
                              fontSize="xs"
                              rows={2}
                            />
                          )}
                        </VStack>
                      </Box>
                    )}
                    <Textarea
                      required
                      name="message"
                      placeholder={
                        msgType === "rezervare"
                          ? t.contact.email_form.other_details
                          : t.contact.email_form.msg
                      }
                      bg="white"
                      rows={4}
                    />
                    <Button
                      type="submit"
                      isLoading={loading}
                      size="lg"
                      w="full"
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
