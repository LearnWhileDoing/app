import React from "react";

import { Box, CircularProgress, Divider, Text, VStack } from "@chakra-ui/react";
import { useAsync } from "react-use";

import { CourseIcon } from "~/core/components/CourseIcon";

import APIService from "~/ctrl/services/api";
import DatabaseStore from "~/ctrl/store/database";
import { useUserData } from "~/ctrl/store/user";

import { _CurrentCoursesItem } from "./_CurrentCoursesItem";
import generateSlugsFromCourseIndex from "~/content/helpers/generateSlugsFromCourseIndex";
import { Card, CardHeader } from "~/dashboard/components/Card";

export const CurrentCourses = () => {
  const userData = useUserData();

  const currentCourses = useAsync(async () => {
    if (!userData) return {};

    let current = {} as Record<string, number>;
    await Promise.all(
      Object.keys(userData.current).map(async courseId => {
        const index = await APIService.fetchCourseIndex(courseId);
        const slugs = generateSlugsFromCourseIndex(index);
        current[courseId] =
          Object.values(userData.current[courseId])
            .map(chapter => Object.values(chapter))
            .flat()
            .filter(v => v >= 3).length / slugs.length;
      })
    );
    return current;
  }, [userData]);

  return (
    <Card>
      <CardHeader>Enrollment</CardHeader>
      <VStack spacing={0} divider={<Divider color={"gray.200"} />}>
        {currentCourses.loading ? (
          // courses are loading
          <Box p={6}>
            <CircularProgress isIndeterminate color={"gray.500"} trackColor={"gray.100"} size={"16"} />
          </Box>
        ) : Object.entries(currentCourses.value || {}).length > 0 ? (
          // courses are loaded
          Object.entries(currentCourses.value || {}).map(
            ([courseId, completion]) =>
              DatabaseStore.database$.value.allCourses[courseId] && (
                <_CurrentCoursesItem
                  key={courseId}
                  href={"/course/" + courseId}
                  icon={<CourseIcon courseId={courseId} size={10} />}
                  name={DatabaseStore.database$.value.allCourses[courseId].name}
                  color={DatabaseStore.database$.value.allCourses[courseId].color + ".500"}
                  completion={completion}
                />
              )
          )
        ) : (
          // no current courses
          <Box visibility={"visible"} py={12}>
            <VStack w={"full"} h={"full"} justify={"center"} px={16}>
              <Text fontSize={"2xl"} fontWeight={"semibold"} color={"gray.400"} textAlign={"center"}>
                You aren't enrolled in any courses.
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Card>
  );
};
