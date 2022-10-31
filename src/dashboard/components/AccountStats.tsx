import React from "react";

import { Box, CircularProgress, Flex, Stack, Text } from "@chakra-ui/react";

import Inline from "~/core/util/expressions/inline";
import theme from "~/core/util/theme";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import UserStore, { useUserData } from "~/ctrl/store/user";

import calculatePoints from "../helpers/calculatePoints";
import { Card, CardHeader } from "./Card";

export const AccountStats = () => {
  const userData = useUserData();
  const { points, courses, certificates } = Inline(() => {
    if (!UserStore.id$.value) return { points: 0, courses: 0, certificates: 0 };
    if (!userData) return { points: null, courses: null, certificates: null };
    return {
      points: calculatePoints(userData),
      courses: Object.keys(userData.completed.courses).length,
      certificates: userData.completed.certificates.length,
    };
  })();

  const { lg: isLargerThanLG, md: isLargerThanMD, sm: isLargerThanSM } = useBreakpointSpy();

  return (
    <Card>
      <CardHeader>Account stats</CardHeader>
      <Flex align={"center"} justify={"center"} p={6} borderBottom={"1px solid " + theme.colors.gray["200"]}>
        <>
          {points !== null ? (
            <Text fontSize={"4xl"} fontWeight={"bold"} color={"orange.500"}>
              {points}
              <Text as={"span"} fontWeight={"normal"}>
                {" "}
                points
              </Text>
            </Text>
          ) : (
            <CircularProgress isIndeterminate color={"orange.500"} trackColor={"gray.100"} size={"16"} />
          )}
        </>
      </Flex>
      {points !== null && (
        <Stack direction={isLargerThanLG || (!isLargerThanMD && isLargerThanSM) ? "row" : "column"} divider={<Box />}>
          <Box py={3} px={6} w={"100%"}>
            <Text># completed courses</Text>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {courses}
            </Text>
          </Box>
          <Box py={3} px={6} w={"100%"}>
            <Text># certificates earned</Text>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {certificates}
            </Text>
          </Box>
        </Stack>
      )}
    </Card>
  );
};
