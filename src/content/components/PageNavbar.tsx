import React from "react";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ArrowSmLeftIcon, CodeIcon, DotsVerticalIcon, HomeIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { CourseIcon } from "~/core/components/CourseIcon";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import DatabaseStore from "~/ctrl/store/database";

export const PageNavbar: React.FC<{ children?: React.ReactNode }> = () => {
  const { courseId } = useRouter().query as any;

  const { sm: isLargerThanSM } = useBreakpointSpy();

  return (
    <Flex
      as={"nav"}
      w={"full"}
      justify={"space-between"}
      align={"center"}
      h={20}
      px={8}
      bg={DatabaseStore.database$.value.allCourses[courseId].color + ".500"}
      shadow={"lg"}
      pos={"fixed"}
      top={0}
      left={0}
      zIndex={99}
    >
      <HStack spacing={4} overflow={"hidden"}>
        {isLargerThanSM && (
          <NextLink href={"/"} passHref>
            <IconButton
              as={"a"}
              aria-label={"Return"}
              colorScheme={DatabaseStore.database$.value.allCourses[courseId].color}
              icon={
                <Box w={"full"} p={1}>
                  <HomeIcon />
                </Box>
              }
              mr={4}
            />
          </NextLink>
        )}
        <Box p={2} bg={"gray.50"} borderRadius={"md"} shadow={"xs"} flexShrink={0}>
          <CourseIcon courseId={courseId} size={10} />
        </Box>
        <Box color={"gray.50"} w={"full"} overflow={"hidden"}>
          <Text fontSize={"xl"} fontWeight={"semibold"} mb={-1} isTruncated>
            {DatabaseStore.database$.value.allCourses[courseId].name}
          </Text>
          <Text>by LearnWhileDoing</Text>
        </Box>
      </HStack>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label={"Menu"}
          colorScheme={DatabaseStore.database$.value.allCourses[courseId].color}
          icon={
            <Box w={"full"} h={"full"} p={1}>
              <DotsVerticalIcon />
            </Box>
          }
        />
        <MenuList>
          <a href={DatabaseStore.database$.value.allCourses[courseId].getHelpURL}>
            <MenuItem
              icon={
                <Box w={6}>
                  <QuestionMarkCircleIcon />
                </Box>
              }
              isDisabled={!DatabaseStore.database$.value.allCourses[courseId].getHelpURL}
            >
              Get help
            </MenuItem>
          </a>
          <a href={DatabaseStore.database$.value.allCourses[courseId].projectFilesURL}>
            <MenuItem
              icon={
                <Box w={6}>
                  <CodeIcon />
                </Box>
              }
              isDisabled={!DatabaseStore.database$.value.allCourses[courseId].projectFilesURL}
            >
              View project files
            </MenuItem>
          </a>
          <MenuDivider />
          <NextLink href={"/course/" + courseId}>
            <MenuItem
              icon={
                <Box w={6}>
                  <ArrowSmLeftIcon />
                </Box>
              }
            >
              Return to course page
            </MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    </Flex>
  );
};
