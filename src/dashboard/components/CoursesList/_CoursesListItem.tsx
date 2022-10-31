import React from "react";

import { Badge, Box, Image, LinkBox, LinkOverlay, Text, Tooltip, VStack } from "@chakra-ui/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import NextLink from "next/link";

import APIService from "~/ctrl/services/api";
import DatabaseStore from "~/ctrl/store/database";

import { Card } from "~/dashboard/components/Card";

interface _CoursesListItemProps {
  courseId: string;
}

export const _CoursesListItem: React.FC<{ children?: React.ReactNode } & _CoursesListItemProps> = ({ courseId }) => {
  const course = DatabaseStore.database$.value.allCourses[courseId];

  const title = (
    <Text fontSize={"lg"} fontWeight={"semibold"} lineHeight={"shorter"} textAlign={"center"}>
      {course.name}
    </Text>
  );

  const card = (
    <Card interactive>
      {course.isLocked && (
        <Box w={4} h={4} color={"gray.400"} position={"absolute"} right={3} top={3}>
          <LockClosedIcon />
        </Box>
      )}
      <Box p={2}>
        <VStack justify={"center"} spacing={4}>
          <Image src={APIService.GITHUB_CONTENT_URL + `/${courseId}/THUMBNAIL.png`} w={16} h={16} />
          <VStack justify={"center"} spacing={1}>
            {course.isLocked ? (
              title
            ) : (
              <NextLink href={"/course/" + courseId}>
                <LinkOverlay href={"/course/" + courseId}>{title}</LinkOverlay>
              </NextLink>
            )}
            <Badge colorScheme={course.isProject ? "amber" : "teal"} fontSize="0.8em">
              {course.isProject ? "PROJECT COURSE" : "BASIC MODULE"}
            </Badge>
          </VStack>
        </VStack>
      </Box>
    </Card>
  );

  return course.isLocked ? (
    <Tooltip
      label={
        <p style={{ color: "red !important", textAlign: "center" }}>
          You must be enrolled with a partner school to take this course.
        </p>
      }
      hasArrow
      placement={"top"}
    >
      <Box>{card}</Box>
    </Tooltip>
  ) : (
    <LinkBox as={"div"} key={courseId}>
      {card}
    </LinkBox>
  );
};
