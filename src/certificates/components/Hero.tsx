import React from "react";

import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { BadgeCheckIcon } from "@heroicons/react/solid";

export const Hero = () => (
  <>
    <Flex w={"100%"} pt={36} pb={16} justify={"center"} align={"center"} color={"indigo.500"}>
      <Stack direction={{ base: "column", sm: "row" }} px={8} spacing={{ base: 4, sm: 8 }} align={{ sm: "center" }}>
        <HStack>
          <Flex
            borderRadius={"full"}
            h={{ sm: 32 }}
            w={{ sm: 32 }}
            bg={{ sm: "white" }}
            color={"teal.600"}
            shadow={{ sm: "xl" }}
            align={"center"}
            justify={"center"}
          >
            <Box w={20}>
              <BadgeCheckIcon />
            </Box>
          </Flex>
        </HStack>
        <Box>
          <Text as={"h1"} fontSize={{ base: "3xl", md: "4xl" }} fontWeight={"bold"} lineHeight={"shorter"} mb={2}>
            Certificates
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }}>View all of the certificates you have earned.</Text>
        </Box>
      </Stack>
    </Flex>
  </>
);
