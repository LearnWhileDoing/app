import React from "react";

import { Box, Divider, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import {
  BanIcon,
  BookOpenIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  PencilAltIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useAsync, useObservable } from "react-use";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import ErrorHandlingService from "~/ctrl/services/errorHandling";
import UserService from "~/ctrl/services/user";
import UserStore from "~/ctrl/store/user";
import PageProgress from "~/ctrl/util/PageProgress";

const PageProgressItems = {
  [PageProgress.NOT_STARTED]: {
    color: "gray.800",
    icon: <BanIcon />,
    text: "Not Started",
  },
  [PageProgress.READING]: {
    color: "blue.500",
    icon: <BookOpenIcon />,
    text: "Reading",
  },
  [PageProgress.PRACTICING]: {
    color: "amber.600",
    icon: <PencilAltIcon />,
    text: "Practicing",
  },
  [PageProgress.COMPLETE]: {
    color: "green.500",
    icon: <ClipboardCheckIcon />,
    text: "Complete",
  },
  [PageProgress.SKIPPED]: {
    color: "teal.500",
    icon: <ChevronDoubleRightIcon />,
    text: "Skipped",
  },
  [PageProgress.IGNORED]: {
    color: "purple.500",
    icon: <XIcon />,
    text: "Ignored",
  },
};

export const PageProgressDisplay: React.FC<{ children?: React.ReactNode }> = () => {
  const { sm: isSM } = useBreakpointSpy();

  return (
    <>
      <Box w={"full"}>
        <Divider my={6} />
      </Box>
      <Flex py={4} justify={"center"} mb={6}>
        <HStack spacing={4}>
          {isSM && (
            <Text fontSize={"xl"} fontWeight={500}>
              Page Progress:
            </Text>
          )}
          <PageProgressDropdown />
        </HStack>
      </Flex>
    </>
  );
};

export const PageProgressDropdown = () => {
  const { courseId, chapter, pageId } = useRouter().query as any;
  const userData = useObservable(UserStore.data$);

  let pageProgress = userData?.current[courseId]?.[chapter]?.[pageId];
  pageProgress = pageProgress == undefined ? 1 : pageProgress;

  useAsync(async () => {
    if (!userData?.current[courseId]) return;
    if (!userData.current[courseId][chapter]?.[pageId]) {
      try {
        await UserService.updatePage(courseId, `${chapter}.${pageId}`, chapter !== "intro" ? 1 : 3);
      } catch (e) {
        ErrorHandlingService.notifyUserOfError(e, "Error updating page progress");
      }
    }
  }, [courseId, chapter, pageId]);

  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        shadow={"sm"}
        _active={{ shadow: "md" }}
      >
        <HStack>
          <Box w={5} color={PageProgressItems[pageProgress].color}>
            {PageProgressItems[pageProgress].icon}
          </Box>
          <Text fontWeight={"medium"}>{PageProgressItems[pageProgress].text}</Text>
          <Box w={5}>
            <ChevronDownIcon />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList minW={0}>
        {Object.entries(PageProgressItems).map(([key, value]) => (
          <MenuItem
            key={key}
            onClick={async () => UserService.updatePage(courseId, `${chapter}.${pageId}`, parseInt(key))}
          >
            <HStack>
              <Box w={5} color={value.color}>
                {value.icon}
              </Box>
              <Text flexShrink={0}>{value.text}</Text>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
