import React from "react";

import { Box, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useObservable } from "react-use";

import { MainNavbar } from "~/core/components/MainNavbar";

import UserStore from "~/ctrl/store/user";

import { CompletedCourseDisplay } from "~/completed-courses/components/CompletedCourseDisplay";
import { Hero } from "~/completed-courses/components/Hero";

export default function Dashboard() {
  const userData = useObservable(UserStore.data$, UserStore.data$.value);

  return (
    <>
      <Head>
        <title>Completed Courses | LearnWhileDoing</title>
      </Head>
      <Box>
        <MainNavbar elevatedAt={0} />
        <Hero />
        <Flex direction={"column"} align={"center"} pb={16}>
          <VStack maxW={"xl"} w={"100%"} px={8} spacing={4}>
            {Object.entries(userData?.completed.courses || {}).map(([courseId, completedTime]) => (
              <CompletedCourseDisplay courseId={courseId} completedTime={completedTime} />
            ))}
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
