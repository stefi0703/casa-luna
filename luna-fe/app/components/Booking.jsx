"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, CheckCircle } from "lucide-react";
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
  Stack
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

    // 🔹 Construim textul dinamic AICI, nu în EmailJS
    let rezervareBlock = "";
    if (isRezervare) {
      rezervareBlock = `
Vă scriu pentru o rezervare la Casa Luna (${rawData.group_type || "Nespecificat"}).
Perioada: ${rawData.date_from} — ${rawData.date_to}
Număr persoane: ${rawData.guests_count}
`;

      if (hasChildren && rawData.children_details) {
        rezervareBlock += `
Detalii copii:
${rawData.children_details}
`;
      }
    }

    const templateParams = {
      subject: isRezervare ? "Rezervare nouă" : "Întrebare nouă",
      user_name: rawData.user_name || "Client",
      user_email: rawData.user_email || "",
      user_phone: rawData.user_phone || "",
      mesaj_rezervare: rezervareBlock,
      mesaj_intrebare: !isRezervare
        ? "Vă contactez pentru o întrebare legată de Casa Luna."
        : "",
      message: rawData.message || ""
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
          title: "Mesaj trimis cu succes!",
          type: "success"
        });
        setLoading(false);
        e.target.reset();
        setHasChildren(false);
        setMsgType("rezervare");
      })
      .catch((err) => {
        console.error("EROARE EmailJS:", err);
        toaster.create({
          title: "Eroare la trimiterea mesajului.",
          type: "error"
        });
        setLoading(false);
      });
  };

  const selectStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    backgroundColor: "white",
    fontSize: "14px",
    outline: "none",
    appearance: "auto"
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
                        <Icon as={CheckCircle} color="orange.500" mr={3} />
                        {f}
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* FORMULAR */}
          <Box
            bg="gray.50"
            p={{ base: 6, md: 10 }}
            borderRadius="3xl"
            borderWidth="1px"
            borderColor="gray.200"
            position="sticky"
            top="32"
            height="fit-content"
          >
            <form onSubmit={sendEmail}>
              <VStack spacing={5} align="stretch">
                <Box>
                  <Heading
                    size="lg"
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="gray.800"
                    mb={2}
                  >
                    <Mail color="#DD6B20" />
                    {t.contact.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Completează datele de mai jos și revenim noi.
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={2}>
                    Ce dorești să faci?
                  </Text>
                  <select
                    name="subject_type"
                    style={selectStyle}
                    value={msgType}
                    onChange={(e) => setMsgType(e.target.value)}
                  >
                    <option value="rezervare">Vreau o rezervare</option>
                    <option value="intrebare">Am o întrebare</option>
                  </select>
                </Box>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Input
                    required
                    name="user_name"
                    placeholder="Nume complet"
                    bg="white"
                  />
                  <Input
                    required
                    name="user_email"
                    type="email"
                    placeholder="E-mail"
                    bg="white"
                  />
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Box>
                    <Text fontSize="sm" mb={1}>
                      Tipul grupului
                    </Text>
                    <select name="group_type" style={selectStyle}>
                      <option value="familie">Familie</option>
                      <option value="grup de prieteni">
                        Grup de prieteni
                      </option>
                      <option value="cuplu">Cuplu</option>
                      <option value="eveniment">Eveniment</option>
                    </select>
                  </Box>

                  <Box>
                    <Text fontSize="sm" mb={1}>
                      Telefon
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
                        <Input
                          required
                          name="date_from"
                          type="date"
                          bg="white"
                          size="sm"
                        />
                        <Input
                          required
                          name="date_to"
                          type="date"
                          bg="white"
                          size="sm"
                        />
                      </Grid>

                      <Input
                        required
                        name="guests_count"
                        placeholder="Nr. total persoane"
                        bg="white"
                        size="sm"
                      />

                      <Flex align="center" gap={3}>
                        <input
                          type="checkbox"
                          checked={hasChildren}
                          onChange={(e) =>
                            setHasChildren(e.target.checked)
                          }
                          style={{
                            width: 18,
                            height: 18,
                            cursor: "pointer"
                          }}
                        />
                        <Text fontSize="sm">
                          Venim cu copii?
                        </Text>
                      </Flex>

                      {hasChildren && (
                        <Textarea
                          name="children_details"
                          placeholder="Detalii copii (vârste)"
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
                      ? "Alte detalii"
                      : "Întrebarea ta..."
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
                  Trimite solicitarea
                </Button>
              </VStack>
            </form>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
