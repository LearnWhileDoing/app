import React from "react";

import { Box, HStack, Text } from "@chakra-ui/react";

export const _InfoSidebarStat: React.FC<
  { children?: React.ReactNode } & {
    icon: JSX.Element;
    color: string;
  }
> = ({ icon, color, children }) => (
  <HStack my={1}>
    <Box w={6} h={6} color={`${color}.600`}>
      {icon}
    </Box>
    <Text as={"span"} color={`${color}.600`} fontSize={"lg"} ml={2}>
      {children}
    </Text>
  </HStack>
);
