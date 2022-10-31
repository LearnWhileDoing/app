import React from "react";

import { Box, HStack, Link, Stack, Tag, Text, VStack } from "@chakra-ui/react";
import { BadgeCheckIcon, CurrencyDollarIcon, ExternalLinkIcon, FolderIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

import DatabaseStore from "~/ctrl/store/database";

import { _InfoSidebarStat } from "./_InfoSidebarStat";

interface InfoSidebarProps {
  sections: number;
}

export const InfoSidebar: React.FC<{ children?: React.ReactNode } & InfoSidebarProps> = ({ sections }) => {
  const { courseId } = useRouter().query as any;
  const course = DatabaseStore.database$.value.allCourses[courseId];

  return (
    <Stack
      direction={{ base: "column", md: "row", lg: "column" }}
      divider={<Box borderColor={"gray.200"} />}
      spacing={5}
      pt={5}
      pb={{ base: 6, lg: 0 }}
      pl={{ base: 8, lg: 6 }}
      pr={{ base: 8, lg: 0 }}
      borderLeftWidth={{ base: 0, lg: "1px" }}
      borderLeftStyle={"solid"}
      borderLeftColor={"gray.200"}
      my={{ base: 4, lg: 0 }}
      maxW={{ base: "5xl", lg: "unset" }}
      width={"100%"}
      flexGrow={{ lg: 1 }}
    >
      <Box w={"full"}>
        <_InfoSidebarStat color={"green"} icon={<CurrencyDollarIcon />}>
          Free forever
        </_InfoSidebarStat>
        <_InfoSidebarStat color={"gray"} icon={<FolderIcon />}>
          {sections} chapters
        </_InfoSidebarStat>
        <_InfoSidebarStat color={"gray"} icon={<BadgeCheckIcon />}>
          {Object.keys(course.certificates).length} certificates
        </_InfoSidebarStat>
      </Box>
      <VStack spacing={2} w={"full"} align={"start"}>
        <Text as={"span"} color={"gray.500"} fontSize={"lg"} mb={2}>
          Authors
        </Text>
        <VStack spacing={1} w={"full"} align={"start"}>
          {Object.entries(course.authors).map(([name, link]) => (
            <Link key={link} href={link} isExternal>
              <HStack spacing={0}>
                <Text as={"span"}>{`${name}\u00A0`}</Text>
                <Box w={4}>
                  <ExternalLinkIcon />
                </Box>
              </HStack>
            </Link>
          ))}
        </VStack>
      </VStack>
      <VStack spacing={2} w={"full"} align={"start"}>
        <Text as={"span"} color={"gray.500"} fontSize={"lg"} mb={2}>
          Tags
        </Text>
        <Box w={{ base: "full", sm: "unset" }}>
          {course.tags.map(tag => (
            <Tag key={tag} colorScheme={DatabaseStore.database$.value.tags[tag]} mr={2} mb={2}>
              {tag}
            </Tag>
          ))}
        </Box>
      </VStack>
    </Stack>
  );
};
