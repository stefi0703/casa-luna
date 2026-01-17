"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, CheckCircle, Phone, ChevronDown } from "lucide-react";
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
  Menu,
} from "@chakra-ui/react";
import { toaster } from "../../components/ui/toaster";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ro } from "date-fns/locale";
import { format } from "date-fns";

export default function Booking({ t }) {
  const [msgType, setMsgType] = useState("rezervare");
  const [groupType, setGroupType] = useState("familie");
  const [hasChildren, setHasChildren] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());
    const isRezervare = msgType === "rezervare";

    let rezervareBlock = "";
    if (isRezervare) {
      rezervareBlock = `
Vă scriu pentru o rezervare la Casa Luna (${groupType}).
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
          {/* PRICING SECTION */}
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

          {/* CONTACT SECTION */}
          <Box
            bg="white"
            p={{ base: 6, md: 10 }}
            borderRadius="3xl"
            borderWidth="1px"
            borderColor="gray.100"
            boxShadow="sm"
            position="sticky"
            top="32"
            height="fit-content"
          >
            <Heading
              size="md"
              mb={8}
              textAlign="center"
              color="gray.800"
              fontWeight="bold"
            >
              {t.contact.title}
            </Heading>

            <Tabs.Root variant="subtle" defaultValue="phone" fitted>
              <Tabs.List
                mb={8}
                bg="gray.100"
                p="1"
                borderRadius="full"
                border="none"
              >
                <Tabs.Trigger
                  value="phone"
                  py={3}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                  color="gray.500"
                  _selected={{ bg: "#3D1A0F", color: "#E69B67" }}
                >
                  <Icon as={Phone} mr={2} boxSize={4} /> {t.contact.tabs.phone}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="online"
                  py={3}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                  color="gray.500"
                  _selected={{ bg: "#3D1A0F", color: "#E69B67" }}
                >
                  <Icon as={Mail} mr={2} boxSize={4} /> {t.contact.tabs.email}
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="phone" p={0}>
                <VStack
                  spacing={6}
                  py={12}
                  bg="white"
                  borderRadius="3xl"
                  border="1px dashed"
                  borderColor="gray.300"
                  textAlign="center"
                >
                  <Box
                    p={5}
                    bg="#FFF0E6"
                    color="#D46B13"
                    borderRadius="full"
                    display="inline-flex"
                  >
                    <Icon as={Phone} boxSize={10} />
                  </Box>
                  <Box>
                    <Text
                      color="gray.500"
                      fontSize="sm"
                      mb={1}
                      fontWeight="medium"
                    >
                      {t.contact.phone_info.avail}
                    </Text>
                    <Heading size="xl" color="gray.800" letterSpacing="tight">
                      +40 (750) 849 137
                    </Heading>
                  </Box>
                  <Button
                    as="a"
                    href="tel:0750849137"
                    size="xl"
                    w="85%"
                    bg="#FF7A00"
                    color="white"
                    borderRadius="xl"
                    _hover={{ bg: "#E66E00" }}
                    fontSize="md"
                    fontWeight="bold"
                  >
                    <Icon as={Phone} mr={2} size={20} />{" "}
                    {t.contact.phone_info.button}
                  </Button>
                </VStack>
              </Tabs.Content>

              <Tabs.Content value="online" p={0}>
                <form onSubmit={sendEmail}>
                  <VStack spacing={5} align="stretch">
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        mb={2}
                        color="black"
                      >
                        {t.contact.email_form.subject_label}
                      </Text>
                      <Menu.Root>
                        <Menu.Trigger asChild>
                          <Button
                            variant="outline"
                            w="full"
                            justifyContent="space-between"
                            bg="white"
                            fontWeight="normal"
                            color="black"
                            borderColor="gray.300"
                          >
                            {msgType === "rezervare"
                              ? t.contact.email_form.opt_res
                              : t.contact.email_form.opt_q}
                            <Icon as={ChevronDown} color="gray.400" />
                          </Button>
                        </Menu.Trigger>
                        <Menu.Content
                          bg="white"
                          color="black"
                          borderRadius="lg"
                          boxShadow="lg"
                          border="1px solid"
                          borderColor="gray.200"
                        >
                          <Menu.Item
                            value="rezervare"
                            onClick={() => setMsgType("rezervare")}
                            color="black"
                            _hover={{ bg: "gray.100" }}
                          >
                            {t.contact.email_form.opt_res}
                          </Menu.Item>
                          <Menu.Item
                            value="intrebare"
                            onClick={() => setMsgType("intrebare")}
                            color="black"
                            _hover={{ bg: "gray.100" }}
                          >
                            {t.contact.email_form.opt_q}
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Root>
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
                        color="black"
                      />
                      <Input
                        required
                        name="user_email"
                        type="email"
                        placeholder={t.contact.email_form.email}
                        bg="white"
                        color="black"
                      />
                    </Grid>

                    <Grid
                      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                      gap={4}
                    >
                      <Box>
                        <Text fontSize="sm" mb={1} color="black">
                          {t.contact.email_form.group_label}
                        </Text>
                        <Menu.Root>
                          <Menu.Trigger asChild>
                            <Button
                              variant="outline"
                              w="full"
                              justifyContent="space-between"
                              bg="white"
                              fontWeight="normal"
                              size="md"
                              color="black"
                              borderColor="gray.300"
                            >
                              {groupType}
                              <Icon as={ChevronDown} color="gray.400" />
                            </Button>
                          </Menu.Trigger>
                          <Menu.Content
                            bg="white"
                            color="black"
                            borderRadius="lg"
                            boxShadow="lg"
                          >
                            <Menu.Item
                              value="familie"
                              onClick={() => setGroupType("familie")}
                              color="black"
                              _hover={{ bg: "gray.100" }}
                            >
                              {t.contact.email_form.group_types.family}
                            </Menu.Item>
                            <Menu.Item
                              value="prieteni"
                              onClick={() => setGroupType("grup de prieteni")}
                              color="black"
                              _hover={{ bg: "gray.100" }}
                            >
                              {t.contact.email_form.group_types.friends}
                            </Menu.Item>
                            <Menu.Item
                              value="cuplu"
                              onClick={() => setGroupType("cuplu")}
                              color="black"
                              _hover={{ bg: "gray.100" }}
                            >
                              {t.contact.email_form.group_types.couple}
                            </Menu.Item>
                            <Menu.Item
                              value="eveniment"
                              onClick={() => setGroupType("eveniment")}
                              color="black"
                              _hover={{ bg: "gray.100" }}
                            >
                              {t.contact.email_form.group_types.event}
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Root>
                      </Box>
                      <Box>
                        <Text fontSize="sm" mb={1} color="black">
                          {t.contact.email_form.phone_label}
                        </Text>
                        <Input
                          required
                          name="user_phone"
                          type="tel"
                          placeholder="07xx xxx xxx"
                          bg="white"
                          color="black"
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
                              <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date)}
                                dateFormat="dd/MM/yyyy"
                                locale={ro}
                                placeholderText="zi/luna/an"
                                customInput={
                                  <Input
                                    name="date_from"
                                    required
                                    bg="white"
                                    size="sm"
                                    color="black"
                                  />
                                }
                              />
                              <input
                                type="hidden"
                                name="date_from"
                                value={
                                  checkIn ? format(checkIn, "dd/MM/yyyy") : ""
                                }
                              />
                            </Box>
                            <Box>
                              <Text fontSize="xs" mb={1} color="gray.500">
                                {t.contact.email_form.checkout}
                              </Text>
                              <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                dateFormat="dd/MM/yyyy"
                                locale={ro}
                                placeholderText="zi/luna/an"
                                minDate={checkIn}
                                customInput={
                                  <Input
                                    name="date_to"
                                    required
                                    bg="white"
                                    size="sm"
                                    color="black"
                                  />
                                }
                              />
                              <input
                                type="hidden"
                                name="date_to"
                                value={
                                  checkOut ? format(checkOut, "dd/MM/yyyy") : ""
                                }
                              />
                            </Box>
                          </Grid>
                          <Input
                            required
                            name="guests_count"
                            placeholder={t.contact.email_form.guests}
                            bg="white"
                            size="sm"
                            color="black"
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
                            <Text fontSize="sm" color="black">
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
                              color="black"
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
                      color="black"
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
