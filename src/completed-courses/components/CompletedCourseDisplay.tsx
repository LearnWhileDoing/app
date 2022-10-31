import React from "react";

import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";

import APIService from "~/ctrl/services/api";
import DatabaseStore from "~/ctrl/store/database";

interface CompletedCourseDisplayProps {
  courseId: string;
  completedTime: import("firebase").default.firestore.Timestamp;
}

export const CompletedCourseDisplay: React.FC<{ children?: React.ReactNode } & CompletedCourseDisplayProps> = ({
  courseId,
  completedTime,
}) => {
  const course = DatabaseStore.database$.value.allCourses[courseId];
  return (
    <HStack
      w={"full"}
      bg={course.color + ".500"}
      p={4}
      borderRadius={"md"}
      shadow={"xs"}
      spacing={4}
      overflow={"hidden"}
    >
      <Box p={2} bg={"gray.50"} borderRadius={"md"}>
        <Image w={10} h={10} src={`${APIService.GITHUB_CONTENT_URL}${courseId}/THUMBNAIL.png`} />
      </Box>
      <VStack spacing={0} align={"start"} overflow={"hidden"}>
        <Text fontSize={"lg"} fontWeight={"semibold"} isTruncated w={"full"} color={"white"}>
          {course.name}
        </Text>
        <Text color={"white"} isTruncated w={"full"}>
          Completed{" "}
          <Text as={"span"} fontWeight={"semibold"}>
            {dayjs().to(completedTime.toDate())}
          </Text>
        </Text>
      </VStack>
    </HStack>
  );
};
