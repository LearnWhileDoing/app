import React from "react";

import { Box, Divider, Flex, Stack } from "@chakra-ui/react";

import { MainNavbar } from "~/core/components/MainNavbar";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";

import { AccountStats } from "~/dashboard/components/AccountStats";
import { CoursesList } from "~/dashboard/components/CoursesList/CoursesList";
import { CurrentCourses } from "~/dashboard/components/CurrentCourses/CurrentCourses";
import { Hero } from "~/dashboard/components/Hero";

export default function Dashboard() {
  const currentCourses = <CurrentCourses />;
  const courseList = <CoursesList />;

  const { md: isLargerThanMD, lg: isLargerThanLG } = useBreakpointSpy();

  return (
    <Box>
      <MainNavbar elevatedAt={1} />
      <Hero />
      <Flex direction={"column"} align={"center"}>
        <Stack maxW={"7xl"} w={"100%"} px={8} pt={12} pb={{ base: 0, md: 8, xl: 16 }} spacing={8}>
          <Stack direction={isLargerThanMD ? "row" : "column"} spacing={8} align={"start"}>
            <Stack
              direction={"column"}
              spacing={8}
              w={{ base: "full", md: "calc(100% - var(--chakra-sizes-sm))" }}
              flex={1}
            >
              <AccountStats />
              {isLargerThanLG && courseList}
              {!isLargerThanMD && currentCourses}
            </Stack>
            <Box w={isLargerThanMD ? "sm" : "100%"}>{isLargerThanMD && currentCourses}</Box>
          </Stack>
        </Stack>
        {!isLargerThanLG && (
          <>
            <Box w={"full"} px={8} mb={16}>
              <Divider color={"gray.200"} mb={8} />
              {courseList}
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
}
