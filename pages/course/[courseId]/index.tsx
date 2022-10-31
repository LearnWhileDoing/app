import React from "react";

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BookmarkAltIcon, PlayIcon } from "@heroicons/react/solid";
import { GetServerSideProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAsyncFn } from "react-use";

import { CourseIcon } from "~/core/components/CourseIcon";
import { MainNavbar } from "~/core/components/MainNavbar";
import theme from "~/core/util/theme";
import toast from "~/core/util/toast";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import APIService from "~/ctrl/services/api";
import ErrorHandlingService from "~/ctrl/services/errorHandling";
import UserService from "~/ctrl/services/user";
import DatabaseStore from "~/ctrl/store/database";
import { useUserData, useUserId } from "~/ctrl/store/user";

import mdxComponents, { inlineCodeStyle } from "~/content/components/mdx";
import { CourseIndexModal } from "~/course/components/CourseIndexModal";
import { InfoSidebar } from "~/course/components/InfoSidebar/InfoSidebar";
import CourseInfoModel from "~/course/models/CourseInfo.model";

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await APIService.fetchCourses();

  return {
    paths: Object.entries(courses)
      .filter(([, { isLocked }]) => !isLocked)
      .map(([courseId]) => `/course/${courseId}`),
    fallback: false,
  };
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetServerSideProps = async context => {
  const { courseId } = context.params as any;

  const rawPage = await serialize(await APIService.fetchFromGitHub(`${courseId}/README.mdx`));
  const index = await APIService.fetchCourseIndex(courseId);

  return {
    props: {
      rawPage,
      index,
    } as CourseInfoModel,
  };
};

export default function CourseInfo({ rawPage, index }: CourseInfoModel) {
  const { courseId } = useRouter().query as any;
  const course = DatabaseStore.database$.value.allCourses[courseId];

  const userData = useUserData();
  const isSignedIn = !!useUserId();
  const hasStarted = Object.keys(userData?.current || {}).includes(courseId);

  const [startCourseState, startCourse] = useAsyncFn(async () => {
    try {
      await UserService.startCourse(courseId);
      toast({
        title: `Successfully started course`,
        status: "success",
        isClosable: true,
      });
      onCourseIndexModalOpen();
    } catch (e) {
      ErrorHandlingService.notifyUserOfError(e, "Error starting course");
    }
  });

  const { sm: isLargerThanSM, lg: isLargerThanLG } = useBreakpointSpy();

  const sidebar = <InfoSidebar sections={Object.keys(index).length} />;

  const {
    isOpen: isCourseIndexModalOpen,
    onOpen: onCourseIndexModalOpen,
    onClose: onCourseIndexModalClose,
  } = useDisclosure();

  return (
    <>
      <Head>
        <title>{course.name} by LearnWhileDoing</title>
      </Head>
      <MainNavbar elevatedAt={0} />
      <Box mt={20} w={"100%"} minH={"100%"}>
        <VStack
          bg={"white"}
          align={"center"}
          justify={"center"}
          borderBottom={"1px solid " + theme.colors.gray["200"]}
          pt={16}
          pb={{ base: 8, lg: 16 }}
          spacing={0}
        >
          <VStack px={8} pb={{ base: 4, lg: 0 }} maxW={"5xl"} align={"center"} spacing={{ base: 8, sm: 6 }}>
            <Stack direction={{ base: "column", sm: "row" }} align={{ base: "unset", sm: "center" }} mb={{ base: 0 }}>
              <HStack>
                <Box mr={4} flexShrink={0}>
                  <CourseIcon courseId={courseId} size={16} />
                </Box>
                {!isLargerThanSM && (
                  <Badge colorScheme={course.isProject ? "amber" : "teal"} fontSize="0.8em">
                    {course.isProject ? "PROJECT COURSE" : "BASIC MODULE"}
                  </Badge>
                )}
              </HStack>
              <VStack align={"start"}>
                {isLargerThanSM && (
                  <Badge colorScheme={course.isProject ? "amber" : "teal"} fontSize="0.8em">
                    {course.isProject ? "PROJECT COURSE" : "BASIC MODULE"}
                  </Badge>
                )}
                <Heading as={"h1"} fontSize={"4xl"}>
                  {course.name}
                </Heading>
              </VStack>
            </Stack>
            <Text fontSize={"xl"} textAlign={{ base: "left", sm: "center" }} maxW={"3xl"} px={{ md: 8 }}>
              {course.subtitle}
            </Text>
            <Tooltip
              label={!isSignedIn && "Sign-in to start course!"}
              isDisabled={isSignedIn}
              defaultIsOpen={!isLargerThanSM}
            >
              <Box w={"full"}>
                <Button
                  colorScheme={DatabaseStore.database$.value.allCourses[courseId].color}
                  flexShrink={0}
                  leftIcon={
                    <Box w={6} h={6} color={"white"}>
                      {hasStarted ? <BookmarkAltIcon /> : <PlayIcon />}
                    </Box>
                  }
                  w={"full"}
                  onClick={hasStarted ? onCourseIndexModalOpen : startCourse}
                  isDisabled={!isSignedIn}
                  isLoading={startCourseState.loading}
                >
                  {hasStarted ? "Open Course Index" : "Start Course"}
                </Button>
              </Box>
            </Tooltip>
            <CourseIndexModal index={index} isOpen={isCourseIndexModalOpen} onClose={onCourseIndexModalClose} />
          </VStack>
          {!isLargerThanLG && sidebar}
        </VStack>
        <HStack justify={"center"}>
          <Flex justify={"center"} px={8} maxW={"5xl"}>
            <Stack direction={isLargerThanLG ? "row" : "column-reverse"} w={"100%"}>
              <Box pt={6} pr={isLargerThanLG ? 6 : 0} pb={12} pl={0} flex={1}>
                <VStack align={"start"} spacing={5} sx={inlineCodeStyle}>
                  <MDXRemote {...rawPage} components={mdxComponents as unknown as Record<string, React.ReactNode>} />
                </VStack>
              </Box>
              {isLargerThanLG && <Flex w={"56"}>{sidebar}</Flex>}
            </Stack>
          </Flex>
        </HStack>
      </Box>
    </>
  );
}
