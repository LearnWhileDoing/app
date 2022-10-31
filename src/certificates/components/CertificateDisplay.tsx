import React from "react";

import { AspectRatio, Box, Flex, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import tinycolor from "tinycolor2";

import theme from "~/core/util/theme";

import APIService from "~/ctrl/services/api";
import DatabaseStore from "~/ctrl/store/database";

interface CertificateDisplayProps {
  courseId: string;
  certificateId: string;
}

export const CertificateDisplay: React.FC<{ children?: React.ReactNode } & CertificateDisplayProps> = ({
  courseId,
  certificateId,
}) => {
  const certificate = DatabaseStore.database$.value.allCourses[courseId].certificates[certificateId];

  return (
    <VStack spacing={4} align={"start"}>
      <AspectRatio ratio={1.4142} w={"full"}>
        <Box
          w={"full"}
          h={"full"}
          position={"relative"}
          shadow={"sm"}
          _hover={{ shadow: "md" }}
          transition={"box-shadow .1s"}
        >
          <Flex
            w={"full"}
            h={"full"}
            align={"center"}
            justify={"center"}
            bg={tinycolor(theme.colors.indigo["500"]).setAlpha(0.8).toString()}
            position={"absolute"}
            opacity={0}
            _hover={{ opacity: 1 }}
            transition={"opacity .1s"}
            sx={{ backdropFilter: "blur(2px)" }}
          >
            <Link
              href={`${APIService.GITHUB_CONTENT_URL}${courseId}/_certificates/${certificateId}.pdf`}
              isExternal
              fontSize={"lg"}
              color={"white"}
              fontWeight={"medium"}
            >
              <HStack spacing={0}>
                <Text as={"span"}>{`Download\u00A0`}</Text>
                <Box w={4}>
                  <ExternalLinkIcon />
                </Box>
              </HStack>
            </Link>
          </Flex>
          <Image
            w={"full"}
            h={"full"}
            src={`${APIService.GITHUB_CONTENT_URL}${courseId}/_certificates/${certificateId}.png`}
          />
        </Box>
      </AspectRatio>
      <VStack spacing={2} align={"start"} fontWeight={"medium"} lineHeight={"shorter"} px={4}>
        <Text>{certificate.name}</Text>
        <Text color={"gray.500"}>{certificate.description}</Text>
      </VStack>
    </VStack>
  );
};
