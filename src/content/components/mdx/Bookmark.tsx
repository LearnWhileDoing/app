import React from "react";

import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { GlobeAltIcon } from "@heroicons/react/outline";
import { ExternalLinkIcon } from "@heroicons/react/solid";

interface BookmarkProps {
  url: string;
}

/**
 * @see https://www.notion.so/learnwhiledoing/Edit-create-a-page-cd2bdc0554eb4f47a0c74fe672e097a0#da852f0a55a440d89f216bad09f6d2f4
 *
 * @example
 * <Bookmark url="https://www.google.com">
 *   Google
 * </Bookmark>
 *
 * @param {string} url
 * @param children
 */
export const Bookmark: React.FC<{ children?: React.ReactNode } & BookmarkProps> = ({ url, children }) => (
  <Box
    as={"a"}
    href={url}
    target={"_blank"}
    w={"full"}
    borderRadius={"md"}
    shadow={"sm"}
    borderWidth={1}
    borderColor={"gray.100"}
    overflow={"hidden"}
    bg={"white"}
    _hover={{ bg: "gray.50" }}
  >
    <HStack spacing={5} align={"stretch"}>
      <Flex align={"center"} justify={"center"} w={20} minH={20} bg={"blue.500"} flexShrink={0}>
        <Box w={10} color={"white"}>
          <GlobeAltIcon />
        </Box>
      </Flex>
      <VStack py={2} spacing={0} align={"start"} justify={"center"} flex={1} overflow={"hidden"}>
        <Text fontSize={"xl"} w={"full"} isTruncated>
          {children}
        </Text>
        <Text fontSize={"sm"} color={"gray.400"} w={"full"} isTruncated>
          {url}
        </Text>
      </VStack>
      <Flex align={"center"} justify={"center"} flexShrink={0}>
        <Box w={5} color={"gray.700"} mr={5}>
          <ExternalLinkIcon />
        </Box>
      </Flex>
    </HStack>
  </Box>
);
