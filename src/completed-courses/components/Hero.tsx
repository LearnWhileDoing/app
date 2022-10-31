import React from "react";

import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { ClipboardCheckIcon } from "@heroicons/react/solid";

export const Hero = () => (
  <>
    <Flex w={"100%"} pt={36} pb={16} justify={"center"} align={"center"} color={"indigo.500"}>
      <Stack direction={{ base: "column", md: "row" }} px={8} spacing={{ base: 4, md: 8 }} align={{ md: "center" }}>
        <HStack>
          <Flex
            borderRadius={"full"}
            h={{ md: 32 }}
            w={{ md: 32 }}
            bg={{ md: "white" }}
            color={"green.600"}
            shadow={{ md: "xl" }}
            align={"center"}
            justify={"center"}
          >
            <Box w={20}>
              <ClipboardCheckIcon />
            </Box>
          </Flex>
        </HStack>
        <Box>
          <Text as={"h1"} fontSize={{ base: "3xl", md: "4xl" }} fontWeight={"bold"} lineHeight={"shorter"} mb={2}>
            Completed Courses
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }}>View all of the courses you have completed.</Text>
        </Box>
      </Stack>
    </Flex>
  </>
);
