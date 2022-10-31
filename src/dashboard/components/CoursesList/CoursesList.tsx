import React from "react";

import { Grid } from "@chakra-ui/react";

import DatabaseStore from "~/ctrl/store/database";

import { Card, CardHeader } from "~/dashboard/components/Card";
import { _CoursesListItem } from "~/dashboard/components/CoursesList/_CoursesListItem";

export const CoursesList = () => (
  <Card>
    <CardHeader>Courses</CardHeader>
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
      gap={4}
      p={4}
    >
      {Object.keys(DatabaseStore.database$.value.allCourses).map(courseId => (
        <_CoursesListItem key={courseId} courseId={courseId} />
      ))}
    </Grid>
  </Card>
);
